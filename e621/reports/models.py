from django.db import models

from reports.runners import RUNNERS


class Report(models.Model):
    FREQUENCY_CHOICES = (
        ('on_demand', 'On-demand'),
        ('yearly', 'Yearly'),
        ('monthly', 'Monthly'),
        ('weekly', 'Weekly'),
        ('daily', 'Daily'),
    )

    title = models.TextField()
    description = models.TextField()
    frequency = models.TextField(choices=FREQUENCY_CHOICES)
    runner = models.TextField()
    attributes = models.TextField(blank=True, null=True)
    max_stored_runs = models.IntegerField(default=1)
    requires_datum_models = models.BooleanField(default=False)

    def run(self):
        runner = RUNNERS[self.runner](self)
        return runner.run_report()

    def clear_runs(self):
        if self.max_stored_runs == 0:
            return
        for run in self.run_set.order_by('-id')[self.max_stored_runs:]:
            run.delete()

    def last_run(self):
        return self.run_set.order_by('-finished')[0]

    def get_absolute_url(self):
        return '/report/{}/'.format(self.id)

    def __str__(self):
        return self.title


class Run(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    started = models.DateTimeField(auto_now_add=True)
    finished = models.DateTimeField(auto_now=True)
    result = models.TextField(blank=True)

    def duration(self):
        return self.finished - self.started

    def get_absolute_url(self):
        return '/report/{}/run/{}/'.format(self.report.id, self.id)

class Datum(models.Model):
    run = models.ForeignKey(Run, on_delete=models.CASCADE)
    variable = models.TextField()
    key = models.TextField()
    value = models.TextField()
