from django.core.management.base import BaseCommand

from reports.models import Report


class Command(BaseCommand):
    help = 'Runs reports for a given frequency.'

    def add_arguments(self, parser):
        parser.add_argument(
            'runner',
            type=str)
        parser.add_argument(
            'attributes',
            type=str,
            nargs='?')

    def handle(self, *args, **options):
        report = Report(
            title='Test runner from CLI',
            description='Test runner from CLI',
            runner=options['runner'],
            frequency='on_demand')
        if 'attributes' in options:
            report.attributes = options['attributes']
        report.save()
        run = report.run()
        self.stdout.write(run.result)
        run.delete()
        report.delete()
