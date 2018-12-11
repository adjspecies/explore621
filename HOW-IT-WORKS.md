# How it works

Here's how the whole thing works.

## Refreshing data

Once a day, explore621 fetches data from e621. e621 offers this data freely via an API ([which looks like this](https://e621.net/post/index.json)), so everything is done above board. This data is offered in pages containing the specified number of posts, and you can retrieve up to 750 total pages. explore621 fetches as much data as it can. As API requests are limited to two per second (and to be nice, we make sure to do no more than one per second), this process can take quite a while.

As we don't want to have to remember to do this every day, we use `cron` to schedule this job to run daily. The time it is run is different per computer, of course, but in our case, it happens around 6AM UTC.

During refresh, every blob of post data is investigated. If we already have that post saved, all fields are updated. If not, we create a new post with that data and save it. This includes related sources, artists, and tags.

Tags are a special case, however. The API returns tags as a space-separated list of strings (e.g: `"fox wolf starfox nintendo ..."`). However, we want to store tags as a relation to multiple posts. In order to do this, we split the string on spaces and update or create a new tag object in the database for the given tag, and associate that object with the post.

Tags have a type, however. They can be general, characters, copyrighted properties, species, or artists. As this information is not returned in the space-separated list, we have to go through a second step of modifying tags. We search for every tag that doesn't already have a type and make a request to update it. This is another API endpoint, which returns the tag type as a number.

Additionally, as tags are occasionally typoed or ought to be replaced with another, better-suited tag, tags can occasionally disappear. If, after the updated posts are processed, a tag has zero posts associated with it, it's deleted.

Here is what the entire process looks like:

```
Tue Dec 11 06:25:01 UTC 2018
Refreshing data from e621 starting at 2018-12-11T06:25:03.036373
Fetching 750 pages worth of posts
--- Fetching page 1
    processed page 1; 75 new, 0 updated
--- Fetching page 2
    processed page 2; 75 new, 0 updated
--- Fetching page 3
    processed page 3; 75 new, 0 updated
# ...
--- Fetching page 749
    processed page 749; 0 new, 75 updated
--- Fetching page 750
    processed page 750; 0 new, 75 updated
56250 posts ingested (1058 new - 55192 updated)
Fixing typeless tags
--- Fixing tag ursine
    fixed ursine (species)
--- Fixing tag sbneko
    fixed sbneko (artist)
# ...
--- Fixing tag birdwing_butterfly
    fixed birdwing_butterfly (species)
--- Fixing tag renatoforfun
    fixed renatoforfun (artist)
199 tags fixed
Deleting empty tags
--- deleting manika_nika
--- deleting general_woo_long
# ...
--- deleting mom_and_daughter
--- deleting ball_busting
21 empty tags deleted
Finished refreshing in 0:48:25.763460
```

## Running reports

As the data is refreshed only once a day, there's no real reason to perform potentially expensive queries against that data on demand. To avoid long requests and stressing out the database, requested stats are gathered as scheduled jobs, called reports.

Each report has an associated report runner. Runners are meant to be general and reports specific; that is, there is a runner for calculating the popularity of a given tag, but that tag is specified in the runner. This is because the runner has to be coded, but the report lives in the database. After all, we can store as many reports requesting tag popularity as we want, no need to re-program a runner for each! This works by each report having associated attributes, which are just an arbitrary set of objects or strings that the runner can use.

So, daily, weekly, and monthly, a scheduled job on the server runs all the reports with the given frequency. The runners make all the required queries against the database, the numbers are crunched, and all of the data boiled down to an object or a list, which is converted to a JSON string and saved to the database on a `run` object. These also contain information such as time started and finished, and so on, which let us check how long it takes for them to run. It looks like this:

```
Running daily reports starting at 2018-12-11T07:13:30.987572
--- Running Dashboard: Total posts over day
    Report run in 0:00:01.665553
--- Running Dashboard: Uploads over day
    Report run in 0:00:01.341102
--- Running Dashboard: data-set stats
    Report run in 0:00:53.070477
--- Running Dashboard: Top 5 character tags over the last week
    Report run in 0:00:03.288203
--- Running Dashboard: Top 5 copyright tags over the last week
    Report run in 0:00:02.702773
--- Running Dashboard: Top 5 artist tags over the last week
    Report run in 0:00:02.688965
--- Running Dashboard: Top 5 general tags over the last week
    Report run in 0:00:02.857472
--- Running Dashboard: Top 10 tags over the past week
    Report run in 0:00:02.902593
--- Running Dashboard: Uploads over hour past week
    Report run in 0:00:00.332723
--- Running Dashboard: Total popularity over day
    Report run in 0:00:01.368437
--- Running Dashboard: Top 5 species tags over the last week
    Report run in 0:00:37.546129
All daily reports run in 0:01:50.033617
```

As you can see, the "data-set stats" report takes almost a minute to run! A lot of work is done in that one.

A report can specify two additional things: how many runs to keep in the database (usually, we only need the most recent one), and whether or not to store a third type of object, a datum. `Datum` objects represent a single data point (e.g: `post count = 123`). This usually isn't necessary unless you want to run statistics on a *series* of runs. This isn't common at all -- in fact, the "data-set stats" report is the only one that uses it. This is done so that we can track information such as the performance of the database (as we collect the average run time per report) over time.

The whole thing looks like this:

[![Models graph](https://explore621.net/static/images/graph_models.png)](https://explore621.net/static/images/graph_models.png)

