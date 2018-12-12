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


def dashboard(request):
    front_reports = {
        'data_set_stats': Report.objects.get(pk=23),
        'total_posts_over_day': Report.objects.get(pk=6),
        'uploads_over_day': Report.objects.get(pk=3),
        'uploads_over_hour_past_week': Report.objects.get(pk=4),
        'top_10_tags_past_week': Report.objects.get(pk=5),
        'top_5_general_tags_past_week': Report.objects.get(pk=7),
        'top_5_copyright_tags_past_week': Report.objects.get(pk=9),
        'top_5_character_tags_past_week': Report.objects.get(pk=10),
        'top_5_species_tags_past_week': Report.objects.get(pk=11),
        'total_popularity_over_month': Report.objects.get(pk=18),
    }
    return render(request, 'dashboard.html', {
        'title': 'Dashboard',
        'front_reports': front_reports,
        'reports': Report.objects.filter(unlisted=False),
        'ingests': IngestLog.objects.order_by('-id')[:5],
    })

def show_report(request, report_id):
    report = get_object_or_404(Report, pk=report_id)
    return render(request, 'run.html', {
        'title': report.title,
        'report': report,
        'reports': Report.objects.filter(unlisted=False),
        'run': report.last_run(),
    })

def show_run(request, report_id, run_id):
    run = get_object_or_404(Run, pk=run_id)
    report = run.report
    return render(request, 'run.html', {
        'title': report.title,
        'report': report,
        'reports': Report.objects.filter(unlisted=False),
        'run': run,
    })
