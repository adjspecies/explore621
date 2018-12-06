from datetime import datetime

from django.core.management.base import BaseCommand

from reports.models import Report


class Command(BaseCommand):
    help = 'Runs reports for a given frequency.'

    def add_arguments(self, parser):
        parser.add_argument(
            'frequency',
            choices=[f[0] for f in Report.FREQUENCY_CHOICES])

    def handle(self, *args, **options):
        start = datetime.now()
        self.stdout.write('Running {} reports starting at {}'.format(
            options['frequency'],
            start.isoformat()))
        for report in Report.objects.filter(frequency=options['frequency']):
            self.stdout.write('--- Running {}'.format(report.title))
            run = report.run()
            self.stdout.write(
                self.style.SUCCESS('    Report run in {}'.format(
                    str(run.finished - run.started))))
        self.stdout.write(
            self.style.SUCCESS('All {} reports run in {}'.format(
                options['frequency'],
                str(datetime.now() - start))))
