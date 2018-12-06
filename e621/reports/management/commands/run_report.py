from django.core.management.base import BaseCommand

from reports.models import Report


class Command(BaseCommand):
    help = 'Runs reports for a given frequency.'

    def add_arguments(self, parser):
        parser.add_argument(
            'report_id',
            type=int)

    def handle(self, *args, **options):
        report = Report.objects.get(pk=options['report_id'])
        report.run()
