from . import (
    dashboard,
    tags_over_time,
)


RUNNERS = {
    'TagsOverYear': tags_over_time.TagsOverYear,
    'TagsOverMonth': tags_over_time.TagsOverMonth,
    'TagsOverDay': tags_over_time.TagsOverDay,

    'TotalPostsOverDay': dashboard.TotalPostsOverDay,
    'UploadsOverDay': dashboard.UploadsOverDay,
    'UploadsOverHourPastWeek': dashboard.UploadsOverHourPastWeek,
    'TopXTagsPastYDays': dashboard.TopXTagsPastYDays,
}

