import datetime
import json

from django.db.models import Count

from posts.models import Post
from reports.runners.utils import (
    FIRST,
    NOW,
    dict_to_key_value_list,
)
from reports.runners.base import (
    BaseRunner,
    InvalidAttribute,
)


class TotalPostsOverDay(BaseRunner):

    help_text = """Dashboard Runner: Total number of posts over time by day.

    This runner collects the total number of posts uploaded to e621 broken
    down by day to show the growth of the site over time.

    Note: This is a dashboard runner and is not of much use in building reports
    other than for the dashboard.
    """

    def run(self):
        self.result = {}
        total = 0
        curr = FIRST.date()
        while curr <= NOW.date():
            date = curr.strftime('%Y-%m-%d')
            self.result[date] = 0
            curr += datetime.timedelta(days=1)
        result_set = Post.objects\
            .values('created_at__date')\
            .annotate(count=Count('created_at__date'))
        for result in result_set:
            total += result['count']
            self.result[result['created_at__date'].strftime('%Y-%m-%d')] =\
                total
        for date, count in self.result.items():
            self.add_datum('day', date, count)

    def generate_result(self):
        self.set_result(json.dumps(
            dict_to_key_value_list(self.result)))


class UploadsOverDay(BaseRunner):

    help_text = """Dashboard Runner: Number of posts per day over time.

    This runner collects the number of posts uploaded to e621 per day to show
    the growth in use of the site over time.

    Note: This is a dashboard runner and is not of much use in building reports
    other than for the dashboard.
    """

    def run(self):
        self.result = {}
        curr = FIRST.date()
        while curr <= NOW.date():
            date = curr.strftime('%Y-%m-%d')
            self.result[date] = 0
            curr += datetime.timedelta(days=1)
        result_set = Post.objects\
            .values('created_at__date')\
            .annotate(count=Count('created_at__date'))
        for result in result_set:
            self.result[result['created_at__date'].strftime('%Y-%m-%d')] =\
                result['count']
        for date, count in self.result.items():
            self.add_datum('day', date, count)

    def generate_result(self):
        self.set_result(json.dumps(
            dict_to_key_value_list(self.result)))


class UploadsOverHourPastWeek(BaseRunner):

    help_text = """Dashboard Runner: Number of posts per hour over last week.

    This runner collects the number of posts uploaded to e621 per hour over the
    last week to show the growth in use of the site over time.

    Note: This is a dashboard runner and is not of much use in building reports
    other than for the dashboard.
    """

    def run(self):
        self.result = {}
        curr = NOW - datetime.timedelta(weeks=1)
        while curr < NOW:
            date = curr.strftime('%Y-%m-%d %H')
            self.result[date] = 0
            curr += datetime.timedelta(hours=1)
        result_set = Post.objects\
            .filter(
                created_at__gt=NOW - datetime.timedelta(weeks=1))\
            .values(
                'created_at__year',
                'created_at__month',
                'created_at__day',
                'created_at__hour')\
            .annotate(count=Count(
                'created_at__day',
                'created_at__hour'))
        for result in result_set:
            date = '{}-{:0>2}-{:0>2} {:0>2}'.format(
                result['created_at__year'],
                result['created_at__month'],
                result['created_at__day'],
                result['created_at__hour'])
            self.result[date] = result['count']
        for hour, count in self.result.items():
            self.add_datum('hour', hour, count)

    def generate_result(self):
        self.set_result(json.dumps(
            dict_to_key_value_list(self.result)))


class TopXTagsPastYDays(BaseRunner):

    help_text = """Dashboard Runner: Top X tags over last Y days.

    This runner collects the top however many tags requested used per day in
    the last requested number of days and calculates the percent they were
    used.

    Attributes:
    
    * `count` - the number of tags per day to request.
    * `count_offset` - the number of tags to skip before starting to collect
        (default: 0)
    * `days` - the number of days worth of data to request.
    * `days_offset` - the number of days to skip before starting to collect
        (default: 0)
    """

    def __init__(self, report):
        super().__init__(report)
        self.ensure_attribute('count')
        self.ensure_attribute('days')
        if self.count > 100:
            raise InvalidAttribute(
                'Cannot request more than 100 tags', self.count)
        if self.days > 100:
            raise InvalidAttribute(
                'Cannot request day for more than 100 days', self.days)
        self.default_attribute('count_offset', 0)
        self.default_attribute('days_offset', 0)

    def run(self):
        self.result = []
        for i in range(self.days + self.days_offset, self.days_offset, -1):
            day = NOW - datetime.timedelta(days=i)
            this_result = []
            result_set = Post.objects\
                .filter(created_at__gt=day)\
                .filter(created_at__lt=day + datetime.timedelta(days=1))\
                .values('tags__tag')\
                .annotate(count=Count('tags__tag'))\
                .order_by('-count')[
                    self.count_offset:self.count + self.count_offset]
            for result in result_set:
                this_result.append({
                    'key': result['tags__tag'],
                    'value': result['count'],
                })
            self.result.append({
                'key': day.strftime('%Y-%m-%d'),
                'value': this_result,
            })

    def generate_result(self):
        result = {}
        for curr in self.result:
            date = curr['key']
            total = float(sum([x['value'] for x in curr['value']], 0))
            for entry in curr['value']:
                if entry['key'] not in result:
                    result[entry['key']] = []
                result[entry['key']].append({
                    'key': date,
                    'value': float(entry['value']) / total,
                })
        self.set_result(json.dumps(
            dict_to_key_value_list(result)))
