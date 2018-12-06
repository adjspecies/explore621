from json import loads

from reports import models


class BaseRunner(object):

    def __init__(self, report):
        self.report = report
        self.model = models.Run(report=self.report)
        self.model.save()
        if len(self.report.attributes):
            attributes = loads(self.report.attributes)
            for key, value in attributes.items():
                self.__dict__[key] = value

    def add_datum(self, variable, key, value):
        if self.report.requires_datum_models:
            datum = models.Datum(
                run=self.model,
                variable=variable,
                key=key,
                value=value)
            datum.save()

    def set_result(self, result):
        self.model.result = result

    def run_report(self):
        try:
            self.run()
            self.generate_result()
            self.model.save()  # Update finished time.
        except:
            self.model.delete()
            raise
        self.report.clear_runs()
        return self.model

    def generate_result(self):
        pass
