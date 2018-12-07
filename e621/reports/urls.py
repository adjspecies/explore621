from django.urls import path

from reports import (
    api,
    views,
)


reports_api = [
    path('reports/', api.list_reports),
    path('report/<int:report_id>/', api.show_report),
    path('run/<int:run_id>/', api.show_run),
]

reports_views = [
    path('reports/', views.list_reports),
    path('report/<int:report_id>/', views.show_report),
    path('run/<int:run_id>/', views.show_run),
]
