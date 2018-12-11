import json
import re

from django.http import HttpResponse

from .models import (
    Report,
    Run,
)
from .runners import RUNNERS


help_text_re = re.compile(r'\n    ')
def _success(obj):
    return HttpResponse(json.dumps({
        'status': 'success',
        'message': 'ok',
        'result': obj,
    }), content_type='application/json')

def _error(message, obj=None, status=400):
    response = {
        'status': 'error',
        'message': message,
    }
    if obj is not None:
        response['result'] = obj
    return HttpResponse(
        json.dumps(response),
        content_type='application/json',
        status=status)

def list_reports(request):
    response = []
    for report in Report.objects.all():
        response.append({
            'id': report.id,
            'title': report.title,
            'description': report.description,
            'frequency': report.frequency,
            'frequency_display': report.get_frequency_display(),
            'runner': report.runner,
            'runner_help_text': help_text_re.sub(
                '\n', RUNNERS[report.runner].help_text),
            'attributes': report.attributes,
            'max_stored_runs': report.max_stored_runs,
            'requires_datum_models': report.requires_datum_models,
            'runs': [run.id for run in report.run_set.all()],
        })
    return _success(response)

def show_report(request, report_id):
    try:
        report = Report.objects.get(pk=report_id)
        try:
            last_run = report.run_set.order_by('-id')[0]
            last_run_obj = {
                'id': last_run.id,
                'started': str(last_run.started),
                'finished': str(last_run.finished),
                'duration': 
                    (last_run.finished - last_run.started).total_seconds(),
                'result': json.loads(last_run.result),
            }
        except:
            last_run_obj = {}
        response = {
            'id': report.id,
            'title': report.title,
            'description': report.description,
            'frequency': report.frequency,
            'frequency_display': report.get_frequency_display(),
            'runner': report.runner,
            'runner_help_text': help_text_re.sub(
                '\n', RUNNERS[report.runner].help_text),
            'attributes': report.attributes,
            'max_stored_runs': report.max_stored_runs,
            'requires_datum_models': report.requires_datum_models,
            'runs': [run.id for run in report.run_set.all()],
            'last_run': last_run_obj,
        }
        return _success(response)
    except Report.DoesNotExist:
        return _error('report {} not found'.format(report_id), status=404)

def show_run(request, report_id, run_id):
    try:
        run = Run.objects.get(pk=run_id)
        response = {
            'id': run.id,
            'started': str(run.started),
            'finished': str(run.finished),
            'duration': (run.finished - run.started).total_seconds(),
            'result': json.loads(run.result),
        }
        return _success(response)
    except Run.DoesNotExist:
        return _error('run {} not found'.format(run_id), status=404)
