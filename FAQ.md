# Frequently asked questions

## How come I don't see any of the art?

explore621 does not store any of the images or videos posted to e621. After all, they do their job admirably. All explore621 stores is information *about* the posts.

## How can I look up information about my favorite tag?

You can't -- yet! All of the information that's on display here is generated through reports. Getting information about a particular tag involves creating a report for it. This is not yet available to the public, only to site admins. If you'd like to see a report for a particular tag, you can [create an issue](https://github.com/adjspecies/explore621/issues) and we'll get to it ASAP.

## Why reports?

Two reasons! One, some of the queries can get expensive (e.g: calculating the relative popularity of a tag over millions of posts). But also, the data set changes only once per day (see below). That means that refreshing the page on a query run on-demand would cause the same potentially-expensive query to run against the same data. To make development as fast as possible, only the reports system was implemented; on-demand queries may be implemented in the future!

## I uploaded something new to e621, how come I'm not seeing the total posts on explore621 go up?

explore621 fetches new data from e621 once a day to keep from overwhelming their servers. Your post, its tags, favorites, score, and so on will show up in our system tomorrow!

## I changed a tag on a post in e621, will that show up here?

Maybe. Once a day, we fetch information about the most recent number of posts (for a while, this was 56,250, it should now be 240,000) posts. Obviously, there aren't that many new posts a day! However, when we see a post in those that we already have in our system, we update its information. This includes any new or removed tags. If the post you changed is in the most recent batch of posts, it will be updated the next time the refresh runs.

## Who are you?

\[adjective\]\[species\] has been exploring the furry fandom through data since 2011. This project is our first major foray into gleaning information from a non-survey. You can find more of our stuff on [the main site](https://adjectivespecies.com).

## I want to help!

There's a guide for that! See *CONTRIBUTING.md / <https://explore621.net/about/contributing>*.
