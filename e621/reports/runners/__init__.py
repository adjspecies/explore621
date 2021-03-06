from . import (
    dashboard,
    popularity,
    tags_over_time,
)


RUNNERS = {
    'TagsOverYear': tags_over_time.TagsOverYear,
    'TagsOverMonth': tags_over_time.TagsOverMonth,
    'TagsOverDay': tags_over_time.TagsOverDay,

    'TotalPopularityOverYear': popularity.TotalPopularityOverYear,
    'TotalPopularityOverMonth': popularity.TotalPopularityOverMonth,
    'TotalPopularityOverDay': popularity.TotalPopularityOverDay,
    'TagPopularityOverYear': popularity.TagPopularityOverYear,
    'TagPopularityOverMonth': popularity.TagPopularityOverMonth,
    'TagPopularityOverDay': popularity.TagPopularityOverDay,
    'RelativeTagPopularityOverYear': popularity.RelativeTagPopularityOverYear,
    'RelativeTagPopularityOverMonth': popularity.RelativeTagPopularityOverMonth,
    'RelativeTagPopularityOverDay': popularity.RelativeTagPopularityOverDay,

    'SetStats': dashboard.SetStats,
    'TotalPostsOverDay': dashboard.TotalPostsOverDay,
    'UploadsOverDay': dashboard.UploadsOverDay,
    'UploadsOverHourPastWeek': dashboard.UploadsOverHourPastWeek,
    'TopXTagsPastYDays': dashboard.TopXTagsPastYDays,
    'TopXTagsPastYDaysByType': dashboard.TopXTagsPastYDaysByType,
}

