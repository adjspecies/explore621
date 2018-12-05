from django.db import models


class Tag(models.Model):
    TYPE_CHOICES = (
        (0, 'general'),
        (1, 'artist'),
        (3, 'copyright'),
        (4, 'character'),
        (5, 'species'),
    )
    tag = models.TextField(unique=True)
    tag_type = models.IntegerField(choices=TYPE_CHOICES, default=-1)

    class Meta:
        indexes = [
            models.Index(fields=['tag']),
        ]


class Source(models.Model):
    url = models.URLField(unique=True)


class Artist(models.Model):
    name = models.TextField(unique=True)


class Post(models.Model):
    RATING_CHOICES = (
        ('s', 'safe'),
        ('q', 'questionable'),
        ('e', 'explicit'),
    )
    source_id = models.IntegerField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField()
    creator_id = models.IntegerField()
    author = models.TextField()
    change = models.IntegerField()
    source = models.URLField(null=True)
    score = models.IntegerField()
    fav_count = models.IntegerField()
    md5 = models.CharField(max_length=40, unique=True)
    file_size = models.IntegerField()
    file_url = models.URLField()
    width = models.IntegerField()
    height = models.IntegerField()
    file_ext = models.CharField(max_length=5)
    preview_url = models.URLField()
    preview_width = models.IntegerField()
    preview_height = models.IntegerField()
    sample_url = models.URLField()
    sample_width = models.IntegerField()
    sample_height = models.IntegerField()
    rating = models.CharField(max_length=5, choices=RATING_CHOICES)
    status = models.CharField(max_length=20)
    has_comments = models.BooleanField()
    has_notes = models.BooleanField()
    has_children = models.BooleanField()
    children = models.TextField()
    parent_id = models.IntegerField(null=True)
    artists = models.ManyToManyField(Artist)
    sources = models.ManyToManyField(Source)
    tags = models.ManyToManyField(Tag)


class IngestLog(models.Model):
    ingest_date = models.DateTimeField(auto_now_add=True)
    records_ingested = models.IntegerField()
    new = models.IntegerField()
    updated = models.IntegerField()
    last_id = models.IntegerField()
