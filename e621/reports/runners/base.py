from json import loads

from reports import models


class MissingAttributeError(Exception):
    pass


class InvalidAttribute(Exception):
    pass


class RunError(Exception):
    pass


class BaseRunner(object):

    def __init__(self, report):
        self.report = report
        self.model = models.Run(report=self.report)
        self.model.save()
        if len(self.report.attributes):
            attributes = loads(self.report.attributes)
            for key, value in attributes.items():
                self.default_attribute(key, value)

    def ensure_attribute(self, attribute):
        if attribute not in self.__dict__:
            raise MissingAttributeError(attribute)

    def default_attribute(self, attribute, value):
        self.__dict__.setdefault(attribute, value)

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
        except Exception as e:
            self.model.delete()
            raise RunError(e)
        self.report.clear_runs()
        return self.model

    def generate_result(self):
        pass
