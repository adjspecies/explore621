import datetime
import json

from django.db.models import Count

from posts.models import Post
from reports.runners.utils import (
    FIRST,
    NOW,
    dict_to_key_value_list,
)
from reports.runners.base import BaseRunner


class TotalPostsOverDay(BaseRunner):

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


class Top10TagsPastWeek(BaseRunner):

    def run(self):
        self.result = []
        for i in range(7, 0, -1):
            day = NOW - datetime.timedelta(days=i)
            this_result = []
            result_set = Post.objects\
                .filter(created_at__gt=day)\
                .filter(created_at__lt=day + datetime.timedelta(days=1))\
                .values('tags__tag')\
                .annotate(count=Count('tags__tag'))\
                .order_by('-count')[:10]
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
