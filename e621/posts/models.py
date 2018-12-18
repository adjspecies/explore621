from datetime import timedelta

from django.db import (
    connection,
    models,
)


class Tag(models.Model):
    TYPE_CHOICES = (
        (0, 'general'),
        (1, 'artist'),
        (3, 'copyright'),
        (4, 'character'),
        (5, 'species'),
        (10, 'anatomy'),
        (11, 'gender'),
        (12, 'act'),
        (13, 'interest'),
        (14, 'objects'),
        (15, 'media'),
        (16, 'location'),
        (17, 'theme'),
        (18, 'subject attributes'),
        (19, 'image attributes'),
    )
    tag = models.TextField(unique=True)
    tag_type = models.IntegerField(choices=TYPE_CHOICES, default=-1)

    class Meta:
        indexes = [
            models.Index(fields=['tag']),
            models.Index(fields=['tag_type']),
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
    started = models.DateTimeField(blank=True, null=True)
    finished = models.DateTimeField(auto_now_add=True)
    records_ingested = models.IntegerField()
    new = models.IntegerField()
    updated = models.IntegerField()
    last_id = models.IntegerField()
    fixed_tags = models.TextField(blank=True)
    deleted_tags = models.TextField(blank=True)
    sources_deleted = models.IntegerField(default=0)
    artists_deleted = models.IntegerField(default=0)

    def fixed_tags_count(self):
        return len(self.fixed_tags.split(' '))

    def deleted_tags_count(self):
        return len(self.deleted_tags.split(' '))

    def duration(self):
        if self.started:
            return self.finished - self.started
        else:
            return timedelta(seconds=0)


def posts_stats():
    with connection.cursor() as cursor:
        cursor.execute('select count(*) from posts_post_tags')
        post_tags_count = cursor.fetchone()[0]
        cursor.execute('select count(*) from posts_post_sources')
        post_sources_count = cursor.fetchone()[0]
        cursor.execute('select count(*) from posts_post_artists')
        post_artists_count = cursor.fetchone()[0]
    return {
        'source_count': Source.objects.count(),
        'artist_count': Artist.objects.count(),
        'max_artists_per_post': Post.objects\
            .annotate(count=models.Count('artists'))\
            .aggregate(max=models.Max('count'))['max'],
        'post_counts': {
            'total': Post.objects.count(),
            'safe': Post.objects.filter(rating='s').count(),
            'questionable': Post.objects.filter(rating='q').count(),
            'explicit': Post.objects.filter(rating='e').count(),
        },
        'tag_counts': {
            'total': Tag.objects.count(),
            'general': Tag.objects.filter(tag_type=0).count(),
            'artist': Tag.objects.filter(tag_type=1).count(),
            'copyright': Tag.objects.filter(tag_type=3).count(),
            'character': Tag.objects.filter(tag_type=4).count(),
            'species': Tag.objects.filter(tag_type=5).count(),
            'anatomy': Tag.objects.filter(tag_type=10).count(),
            'gender': Tag.objects.filter(tag_type=11).count(),
            'act': Tag.objects.filter(tag_type=12).count(),
            'interest': Tag.objects.filter(tag_type=13).count(),
            'objects': Tag.objects.filter(tag_type=14).count(),
            'media': Tag.objects.filter(tag_type=15).count(),
            'location': Tag.objects.filter(tag_type=16).count(),
            'theme': Tag.objects.filter(tag_type=17).count(),
            'subject': Tag.objects.filter(tag_type=18).count(),
            'image': Tag.objects.filter(tag_type=19).count(),
            
        },
        'max_tags_per_post': Post.objects\
            .annotate(count=models.Count('tags'))\
            .aggregate(max=models.Max('count'))['max'],
        'avg_tags_per_post': Post.objects\
                .annotate(count=models.Count('tags'))\
                .aggregate(avg=models.Avg('count'))['avg'],
        'post_tags_count': post_tags_count,
        'post_sources_count': post_sources_count,
        'post_artists_count': post_artists_count,
        'total_file_sizes': Post.objects.aggregate(
            fs=models.Sum('file_size'))['fs'],
    }


def ingest_stats():
    with connection.cursor() as cursor:
        cursor.execute('''select
            avg(array_length(regexp_split_to_array(fixed_tags, E' '), 1))
            from posts_ingestlog where fixed_tags != '' ''')
        avg_fixed_tags_count = cursor.fetchone()[0]
        cursor.execute('''select
            avg(array_length(regexp_split_to_array(deleted_tags, E' '), 1))
            from posts_ingestlog where deleted_tags != '' ''')
        avg_deleted_tags_count = cursor.fetchone()[0]
    return {
        'ingest_count': IngestLog.objects.count(),
        'ingest_avg_duration': IngestLog.objects\
            .exclude(started__isnull=True)\
            .aggregate(
                duration=models.Avg(
                    models.F('finished') - models.F('started')))['duration']\
                    .total_seconds(),
        'avg_processed': IngestLog.objects\
            .aggregate(avg=models.Avg('records_ingested'))['avg'],
        'avg_new': IngestLog.objects\
            .filter(new__gt=0)\
            .aggregate(avg=models.Avg('new'))['avg'],
        'avg_updated': IngestLog.objects\
            .filter(updated__gt=0)\
            .aggregate(avg=models.Avg('updated'))['avg'],
        'avg_fixed_tags_count': float(avg_fixed_tags_count),
        'avg_deleted_tags_count': float(avg_deleted_tags_count),
        'avg_sources_deleted': IngestLog.objects\
            .filter(sources_deleted__gt=0)\
            .aggregate(avg=models.Avg('sources_deleted'))['avg'],
        'avg_artists_deleted': IngestLog.objects\
            .filter(artists_deleted__gt=0)\
            .aggregate(avg=models.Avg('artists_deleted'))['avg'],
        'last_10': [{
            'duration': log.duration().total_seconds(),
            'processed': log.records_ingested,
            'new': log.new,
            'updated': log.updated,
            'fixed_tags_count': log.fixed_tags_count(),
            'deleted_tags_count': log.deleted_tags_count(),
            'sources_deleted': log.sources_deleted,
            'artists_deleted': log.artists_deleted,
        } for log in IngestLog.objects.order_by('-finished')[:10]],
    }
