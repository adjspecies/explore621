import datetime
import json

from django.db.models import Count

from posts.models import Post
from reports.runners.utils import (
    FIRST,
    NOW,
    dict_to_key_value_list,
    too_early
)
from reports.runners.base import (
    BaseRunner,
    InvalidAttribute,
)


class TagsOverTimeRunner(BaseRunner):

    def __init__(self, report):
        super().__init__(report)
        self.ensure_attribute('tags')
        if len(self.tags) > 25:
            raise InvalidAttribute('Cannot use more than 25 tags', self.tags)
        self.default_attribute('omit_empty', False)


class TagsOverYear(TagsOverTimeRunner):

    help_text = """Count of given tags per year.

    This runner gets the count of each of the specified tags per year.

    Attributes:

    * `tags` - an array of tags to search for.
    """

    def run(self):
        self.result = {}
        for tag in (self.tags):
            for year in range(FIRST.year, NOW.year + 1):
                if tag not in self.result:
                    self.result[tag] = {}
                result = Post.objects\
                    .filter(created_at__year=year)\
                    .filter(tags__tag=tag)\
                    .count()
                if self.omit_empty and result == 0:
                    continue
                self.result[tag][year] = result
        for tag, years in self.result.items():
            for year, value in years.items():
                self.add_datum(tag, year, value)

    def generate_result(self):
        result = self.result
        for tag, years in result.items():
            result[tag] = dict_to_key_value_list(years)
        result = dict_to_key_value_list(result)
        self.set_result(json.dumps(result))


class TagsOverMonth(TagsOverTimeRunner):

    help_text = """Count of given tags per month.

    This runner gets the count of each of the specified tags per month.

    Attributes:

    * `tags` - an array of tags to search for.
    """

    def run(self):
        self.result = {}
        for tag in (self.tags):
            for year in range(FIRST.year, NOW.year + 1):
                for month in range(1, 13):
                    if too_early(year=year, month=month):
                        continue
                    if tag not in self.result:
                        self.result[tag] = {}
                    result = Post.objects\
                        .filter(created_at__year=year)\
                        .filter(created_at__month=month)\
                        .filter(tags__tag=tag)\
                        .count()
                    if self.omit_empty and result == 0:
                        continue
                    self.result[tag][
                            '{}-{:0>2}'.format(year, month)] = result
        for tag, dates in self.result.items():
            for date, value in dates.items():
                self.add_datum(tag, date, value)

    def generate_result(self):
        result = self.result
        for tag, dates in result.items():
            result[tag] = dict_to_key_value_list(dates)
        result = dict_to_key_value_list(result)
        self.set_result(json.dumps(result))


class TagsOverDay(TagsOverTimeRunner):

    help_text = """Count of given tags per day.

    This runner gets the count of each of the specified tags per day.

    Attributes:

    * `tags` - an array of tags to search for.
    """

    def run(self):
        self.result = {}
        for tag in (self.tags):
            if tag not in self.result:
                self.result[tag] = {}
            result_set = Post.objects\
                .filter(tags__tag=tag)\
                .values('created_at__date')\
                .annotate(count=Count('created_at__date'))
            if not self.omit_empty:
                curr = FIRST.date()
                while curr <= NOW.date():
                    date = curr.strftime('%Y-%m-%d')
                    self.result[tag][date] = 0
                    curr += datetime.timedelta(days=1)
            for result in result_set:
                date = result['created_at__date'].strftime('%Y-%m-%d')
                self.result[tag][date] = result['count']
        for tag, dates in self.result.items():
            for date, value in dates.items():
                self.add_datum(tag, date, value)

    def generate_result(self):
        result = self.result
        for tag, dates in result.items():
            result[tag] = dict_to_key_value_list(dates)
        result = dict_to_key_value_list(result)
        self.set_result(json.dumps(result))



