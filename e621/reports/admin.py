from django.contrib import admin

from .models import (
    Report,
    Run,
)


admin.site.register(Report)
admin.site.register(Run)
