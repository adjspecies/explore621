# Frequently asked questions

## How come I don't see any of the art?

explore621 does not store any of the images or videos posted to e621. After all, they do their job admirably. All explore621 stores is information *about* the posts.

## How can I look up information about my favorite tag?

You can't -- yet! All of the information that's on display here is generated through reports. Getting information about a particular tag involves creating a report for it. This is not yet available to the public, only to site admins. If you'd like to see a report for a particular tag, you can [create an issue](https://github.com/adjspecies/explore621/issues) and we'll get to it ASAP.

## Why reports?

Two reasons! One, some of the queries can get expensive (e.g: calculating the relative popularity of a tag over millions of posts). But also, the data set changes only once per day (see below). That means that refreshing the page on a query run on-demand would cause the same potentially-expensive query to run against the same data. To make development as fast as possible, only the reports system was implemented; on-demand queries may be implemented in the future!

## Why are queries expensive?

Cross-table aggregations. Here's an example expensive query (finding the top used tags for posts tagged 'otter'):

```sql
SELECT "posts_tag"."tag", "posts_tag"."tag_type", COUNT("posts_tag"."tag") AS "c"
    FROM "posts_post"
    LEFT OUTER JOIN "posts_post_tags" ON ("posts_post"."id" = "posts_post_tags"."post_id")
    LEFT OUTER JOIN "posts_tag" ON ("posts_post_tags"."tag_id" = "posts_tag"."id") 
    INNER JOIN "posts_post_tags" T4 ON ("posts_post"."id" = T4."post_id") 
    INNER JOIN "posts_tag" T5 ON (T4."tag_id" = T5."id") 
    WHERE T5."tag" = 'otter'
    GROUP BY "posts_tag"."tag", "posts_tag"."tag_type" 
    ORDER BY "posts_tag"."tag_type" DESC, "c" DESC
```

Remember, this is a very large dataset. It should also be noted that, in many cases, queries are constructed using Django's ORM, which isn't always the smartest when it comes to relational queries (though to be fair, it's usually pretty good). Sure is fast and easy to write, though! That query was generated with:

```python
Post.objects\
    .values('tags__tag', 'tags__tag_type')\
    .annotate(c=Count('tags__tag'))\
    .filter(tags__tag='otter')\
    .order_by('-tags__tag_type', '-c')
```

## I uploaded something new to e621, how come I'm not seeing the total posts on explore621 go up?

explore621 fetches new data from e621 once a day to keep from overwhelming their servers. Your post, its tags, favorites, score, and so on will show up in our system tomorrow!

## I changed a tag on a post in e621, will that show up here?

Maybe. Once a day, we fetch information about the most recent number of posts (for a while, this was 56,250, it should now be 240,000) posts. Obviously, there aren't that many new posts a day! However, when we see a post in those that we already have in our system, we update its information. This includes any new or removed tags. If the post you changed is in the most recent batch of posts, it will be updated the next time the refresh runs.

## What types of tags are there?

e621 has five types of tags: general, artist, character, species, and copyright. explore621 has added several more types which are set on what e621 calls general tags. These are very subjective and changed by hand. They're largely to be taken with a grain of salt. The are: sex (that is, sexual characteristics/configuration; what e621 calls gender), anatomy, act (what the subjects are doing), interest (kinks, concepts, etc) object (things around - or in - the subjects), media (tags relating to how the picture was made), location, theme, subject attributes (things about the subjects, such as clothing status, etc), and image attributes (things about the scene, such as season).

## Who are you?

\[adjective\]\[species\] has been exploring the furry fandom through data since 2011. This project is our first major foray into gleaning information from a non-survey. You can find more of our stuff on [the main site](https://adjectivespecies.com).

## I want to help!

There's a guide for that! See *CONTRIBUTING.md / <https://explore621.net/about/contributing>*.
