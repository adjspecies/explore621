"""e621 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.flatpages import views as flatpages_views
from django.urls import (
    include,
    path,
)

from posts.urls import posts_api
from reports.urls import (
    reports_api,
    reports_views,
)

urlpatterns = reports_views + [
    path('admin/', admin.site.urls),
    path('api/', include(posts_api + reports_api)),
    path('about/', flatpages_views.flatpage, {'url': '/about/'}),
    path('about/faq/', flatpages_views.flatpage, {'url': '/about/faq/'}),
    path('about/contributing/', flatpages_views.flatpage, {'url': '/about/contributing/'}),
    path('about/how-it-works/', flatpages_views.flatpage, {'url': '/about/how-it-works/'}),
]
