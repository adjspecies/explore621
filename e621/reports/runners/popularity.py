import json

from django.db.models import Avg

from posts.models import Post
from reports.runners.base import (
    BaseRunner,
    InvalidAttribute,
)


class TotalPopularityOverYear(BaseRunner):
    
    help_text = """Average total popularity per year.

    This runner gets the average score and favorite count for all posts
    broken down by year.
    """

    @classmethod
    def query(cls):
        built_result = []
        result_set = Post.objects\
            .values('created_at__year')\
            .annotate(score=Avg('score'))\
            .annotate(fav_count=Avg('fav_count'))
        for result in result_set:
            built_result.append({
                'key': result['created_at__year'],
                'value': [
                    {
                        'key': 'score',
                        'value': result['score'],
                    },
                    {
                        'key': 'fav_count',
                        'value': result['fav_count'],
                    },
                ],
            })
        return built_result

    def run(self):
        self.result = self.query()

    def generate_result(self):
        self.set_result(json.dumps(self.result))


class TotalPopularityOverMonth(BaseRunner):

    help_text = """Average total popularity per month.

    This runner gets the average score and favorite count for all posts
    broken down by month.
    """

    @classmethod
    def query(cls):
        built_result = []
        result_set = Post.objects\
            .values('created_at__year', 'created_at__month')\
            .annotate(score=Avg('score'))\
            .annotate(fav_count=Avg('fav_count'))
        for result in result_set:
            built_result.append({
                'key': '{}-{}'.format(
                    result['created_at__year'],
                    result['created_at__month']),
                'value': [
                    {
                        'key': 'score',
                        'value': result['score'],
                    },
                    {
                        'key': 'fav_count',
                        'value': result['fav_count'],
                    },
                ],
            })
        return built_result

    def run(self):
        self.result = self.query()

    def generate_result(self):
        self.set_result(json.dumps(self.result))


class TotalPopularityOverDay(BaseRunner):

    help_text = """Average total popularity per day.

    This runner gets the average score and favorite count for all posts
    broken down by day.
    """
    
    @classmethod
    def query(cls):
        built_result = []
        result_set = Post.objects\
            .values('created_at__year', 'created_at__month',
                    'created_at__day')\
            .annotate(score=Avg('score'))\
            .annotate(fav_count=Avg('fav_count'))
        for result in result_set:
            built_result.append({
                'key': '{}-{}-{}'.format(
                    result['created_at__year'],
                    result['created_at__month'],
                    result['created_at__day']),
                'value': [
                    {
                        'key': 'score',
                        'value': result['score'],
                    },
                    {
                        'key': 'fav_count',
                        'value': result['fav_count'],
                    },
                ],
            })
        return built_result

    def run(self):
        self.result = self.query()

    def generate_result(self):
        self.set_result(json.dumps(self.result))


class TagPopularityOverYear(BaseRunner):

    help_text = """Tag popularity over year.

    This runner gets the popularity of a given tag broken down by year.

    Attributes:

    * `tag` - the tag to search for.
    """

    @classmethod
    def query(cls, tag):
        intermediary = {}
        result_set = Post.objects\
            .filter(tags__tag=tag)\
            .values('created_at__year')\
            .annotate(score=Avg('score'))\
            .annotate(fav_count=Avg('fav_count'))
        for result in result_set:
            intermediary[result['created_at__year']] = {
                'score': result['score'],
                'fav_count': result['fav_count'],
            }
        return intermediary

    def run(self):
        self.result = []
        for year, data in self.query(self.tag).items():
            self.result.append({
                'key': year,
                'value': [
                    {
                        'key': 'score',
                        'value': data['score'],
                    },
                    {
                        'key': 'fav_count',
                        'value': data['fav_count'],
                    },
                ]
            })


    def generate_result(self):
        self.set_result(json.dumps(self.result))


class TagPopularityOverMonth(BaseRunner):

    help_text = """Tag popularity over month.

    This runner gets the popularity of a given tag broken down by month.

    Attributes:

    * `tag` - the tag to search for.
    """

    @classmethod
    def query(cls, tag):
        intermediary = {}
        result_set = Post.objects\
            .filter(tags__tag=tag)\
            .values('created_at__year', 'created_at__month')\
            .annotate(score=Avg('score'))\
            .annotate(fav_count=Avg('fav_count'))
        for result in result_set:
            intermediary['{}-{}'.format(
                result['created_at__year'],
                result['created_at__month'])] = {
                'score': result['score'],
                'fav_count': result['fav_count'],
            }
        return intermediary

    def run(self):
        self.result = []
        for date, data in self.query(self.tag).items():
            self.result.append({
                'key': year,
                'value': [
                    {
                        'key': 'score',
                        'value': data['score'],
                    },
                    {
                        'key': 'fav_count',
                        'value': data['fav_count'],
                    },
                ]
            })

    def generate_result(self):
        self.set_result(json.dumps(self.result))


class TagPopularityOverDay(BaseRunner):

    help_text = """Tag popularity over day.

    This runner gets the popularity of a given tag in broken down by day.

    Attributes:

    * `tag` - the tag to search for.
    """

    @classmethod
    def query(cls, tag):
        intermediary = {}
        result_set = Post.objects\
            .filter(tags__tag=tag)\
            .values('created_at__year', 'created_at__month',
                    'created_at__day')\
            .annotate(score=Avg('score'))\
            .annotate(fav_count=Avg('fav_count'))
        for result in result_set:
            intermediary['{}-{}-{}'.format(
                result['created_at__year'],
                result['created_at__month'],
                result['created_at__day'])] = {
                'score': result['score'],
                'fav_count': result['fav_count'],
            }
        return intermediary

    def run(self):
        self.result = []
        for date, data in self.query(self.tag).items():
            self.result.append({
                'key': year,
                'value': [
                    {
                        'key': 'score',
                        'value': data['score'],
                    },
                    {
                        'key': 'fav_count',
                        'value': data['fav_count'],
                    },
                ]
            })

    def generate_result(self):
        self.set_result(json.dumps(self.result))


class RelativeTagPopularityOverYear(BaseRunner):

    help_text = """Relative tag popularity over year.

    This runner gets the popularity of a given tag in relation to the
    popularity of all posts broken down by year.

    Attributes:

    * `tag` - the tag to search for.
    """

    def run(self):
        self.result = []
        intermediary = TagPopularityOverYear.query(self.tag)
        total = TotalPopularityOverYear.query()
        for year in total:
            score = year['value'][0]['value']
            fav_count = year['value'][1]['value']
            self.result.append({
                'key': year['key'],
                'value': [
                    {
                        'key': 'score',
                        'value': 
                            intermediary.get(
                                year['key'],
                                {'score': score})['score']\
                            - score,
                    },
                    {
                        'key': 'fav_count',
                        'value':
                            intermediary.get(
                                year['key'],
                                {'fav_count': fav_count})['fav_count']\
                            - fav_count,
                    },
                ]
            })


    def generate_result(self):
        self.set_result(json.dumps(self.result))


class RelativeTagPopularityOverMonth(BaseRunner):

    help_text = """Relative tag popularity over month.

    This runner gets the popularity of a given tag in relation to the
    popularity of all posts broken down by month.

    Attributes:

    * `tag` - the tag to search for.
    """

    def run(self):
        self.result = []
        intermediary = TagPopularityOverMonth.query(self.tag)
        total = TotalPopularityOverMonth.query()
        for date in total:
            score = date['value'][0]['value']
            fav_count = date['value'][1]['value']
            self.result.append({
                'key': date['key'],
                'value': [
                    {
                        'key': 'score',
                        'value': 
                            intermediary.get(
                                date['key'],
                                {'score': score})['score']\
                            - score,
                    },
                    {
                        'key': 'fav_count',
                        'value':
                            intermediary.get(
                                date['key'],
                                {'fav_count': fav_count})['fav_count']\
                            - fav_count,
                    },
                ]
            })

    def generate_result(self):
        self.set_result(json.dumps(self.result))


class RelativeTagPopularityOverDay(BaseRunner):

    help_text = """Relative tag popularity over day.

    This runner gets the popularity of a given tag in relation to the
    popularity of all posts broken down by day.

    Attributes:

    * `tag` - the tag to search for.
    """

    def run(self):
        self.result = []
        intermediary = TagPopularityOverDay.query(self.tag)
        total = TotalPopularityOverDay.query()
        for date in total:
            score = date['value'][0]['value']
            fav_count = date['value'][1]['value']
            self.result.append({
                'key': date['key'],
                'value': [
                    {
                        'key': 'score',
                        'value': 
                            intermediary.get(
                                date['key'],
                                {'score': score})['score']\
                            - score,
                    },
                    {
                        'key': 'fav_count',
                        'value':
                            intermediary.get(
                                date['key'],
                                {'fav_count': fav_count})['fav_count']\
                            - fav_count,
                    },
                ]
            })

    def generate_result(self):
        self.set_result(json.dumps(self.result))
