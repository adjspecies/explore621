from datetime.date import today
from json import loads

from reports.models import (
    Datum,
    Run,
)

import tags_over_time


FIRST_YEAR = 2007
TODAY = today()
RUNNERS = {
    'TagsOverTime': tags_over_time.Runner,
}


class BaseRunner(object):

    def __init__(self, report):
        self.report = report
        self.model = Run(report=self.report)
        self.model.save()
        if len(self.report.attributes):
            attributes = loads(self.report.attributes)
            for key, value in attributes:
                self.__dict__[key] = value

    def add_datum(self, variable, key, value):
        datum = Datum(
            run=self.model,
            variable=variable,
            key=key,
            value=value)
        datum.save()

    def set_result(self, result):
        self.model.result = result

    def run_report(self):
        self.run()
        self.generate_result()
        self.model.save()  # Update finished time.

    def generate_result(self):
        pass
