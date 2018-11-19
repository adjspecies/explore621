import json

from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import render

from .models import (
    Post,
    Tag,
    Artist,
    Source,
)


def list_tags(request):
    result = {}
    page = request.GET.get('page', 0)
    tags = Tag.objects.annotate(use_count=Count('post')).order_by('-use_count')[page * 50:page * 50 + 50]
    import pdb; pdb.set_trace()
    for tag in tags:
        result[tag.tag] = tag.use_count
    return JsonResponse(result)

def artists_posted(request):
    return JsonResponse(dict([(i.name, i.post__count) for i in Artist.objects.annotate(Count('post')).order_by('-post__count')]))
