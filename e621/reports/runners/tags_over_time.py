import json

from posts.models import Post
from reports.runners import (
    FIRST_YEAR,
    TODAY,
    BaseRunner,
)


class Runner(BaseRunner):

    def run(self):
        self.result = {}
        for tag in (self.tags):
            for year in range(FIRST_YEAR, TODAY.year + 1):
                if tag not in self.result:
                    self.result[tag] = {}
                self.result[tag][year] = Post.objects\
                    .filter(created_at__year=year)\
                    .filter(tags__tag=tag)\
                    .count()
        for tag, years in self.result.items():
            for year, value in years:
                self.add_datum(tag, year, value)

    def generate_result(self):
        self.set_result(json.dumps(self.result))
