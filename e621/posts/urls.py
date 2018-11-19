from django.urls import path

from posts import views


apiurls = [
    path('tags/', views.list_tags),
    path('artists/', views.artists_posted),
]
