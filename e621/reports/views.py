from django.shortcuts import (
    get_object_or_404,
    redirect,
    render,
)

from posts.models import IngestLog
from reports.models import (
    Report,
    Run,
)


def list_reports(request):
    return render(request, 'dashboard.html', {
        'reports': Report.objects.all(),
        'ingests': IngestLog.objects.order_by('-id')[:5],
    })

def show_report(request, report_id):
    report = get_object_or_404(Report, pk=report_id)
    return redirect(report.last_run().get_absolute_url())

def show_run(request, report_id, run_id):
    run = get_object_or_404(Run, pk=run_id)
    report = run.report
    return render(request, 'run.html', {
        'title': report.title,
        'report': report,
        'reports': Report.objects.all(),
        'run': run,
    })
