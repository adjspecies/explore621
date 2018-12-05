from django.core.management.base import BaseCommand

from reports.models import Report


class Command(BaseCommand):
    help = 'Runs reports for a given frequency.'

    def add_arguments(self, parser):
        parser.add_argument(
            'frequency',
            choices=[f[0] for f in Report.FREQUENCY_CHOICES])

    def handle(self, *args, **options):
        for report in Report.objects.filter(frequency=options['frequency']):
            report.run()
