from . import (
    dashboard,
    tags_over_time,
)


RUNNERS = {
    'TagsOverYear': tags_over_time.TagsOverYear,
    'TagsOverMonth': tags_over_time.TagsOverMonth,
    'TagsOverDay': tags_over_time.TagsOverDay,

    'PostsOverDay': dashboard.PostsOverDay,
    'PostsOverHourPastWeek': dashboard.PostsOverHourPastWeek,
    'Top100TagsPastWeek': dashboard.Top100TagsPastWeek,
}

