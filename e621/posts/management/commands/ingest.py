import argparse
from datetime import datetime
import json
import pytz

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from posts import models


class Command(BaseCommand):

    help = "Ingests e621 metadata blobs"

    def add_arguments(self, parser):
        parser.add_argument('infile', type=argparse.FileType('r'))

    def handle(self, *args, **options):
        try:
            max_id = models.IngestLog.objects.latest('ingest_date').last_id
        except models.IngestLog.DoesNotExist:
            max_id = 0
        ingested = 0
        last_id = 0
        tags_added = {}
        sources_added = {}
        artists_added = {}
        data = json.load(options['infile'])
        for record in data:
            if record['id'] <= max_id:
                continue
            if record['id'] > last_id:
                last_id = record['id']
            record_tags = record['tags'].split(' ')
            tags = []
            for record_tag in record_tags:
                if record_tag in tags_added:
                    tag = tags_added[record_tag]
                else:
                    tag = models.Tag(tag=record_tag)
                    tag.save()
                    tags_added[record_tag] = tag
                tags.append(tag)
            artists = []
            for record_artist in record.get('artist', []):
                if record_artist in artists_added:
                    artist = artists_added[record_artist]
                else:
                    artist = models.Artist(name=record_artist)
                    artist.save()
                    artists_added[record_artist] = artist
                artists.append(artist)
            sources = []
            for record_source in record.get('sources', []):
                if record_source in sources_added:
                    source = sources_added[record_source]
                else:
                    source = models.Source(url=record_source)
                    source.save()
                    sources_added[record_source] = source
                sources.append(source)
            created_at = pytz.utc.localize(
                datetime.fromtimestamp(record['created_at']['s']))
            post = models.Post(
                source_id=record['id'],
                description=record['description'],
                created_at=created_at,
                creator_id=record['creator_id'],
                author=record['author'],
                change=record['change'],
                source=record['source'],
                score=record['score'],
                fav_count=record['fav_count'],
                md5=record['md5'],
                file_size=record['file_size'],
                file_url=record['file_url'],
                width=record['width'],
                height=record['height'],
                file_ext=record['file_ext'],
                preview_url=record['preview_url'],
                preview_width=record['preview_width'],
                preview_height=record['preview_height'],
                sample_url=record['sample_url'],
                sample_width=record['sample_width'],
                sample_height=record['sample_height'],
                rating=record['rating'],
                status=record['status'],
                has_comments=record['has_comments'],
                has_notes=record['has_notes'],
                has_children=record['has_children'],
                children=record['children'],
                parent_id=record['parent_id'])
            try:
                post.save()
            except IntegrityError:
                continue
            post.artists.set(artists)
            post.sources.set(sources)
            post.tags.set(tags)
            ingested += 1
        log = models.IngestLog(
            records_ingested=ingested,
            last_id=last_id)
        log.save()
        self.stdout.write(
            self.style.SUCCESS('{} posts ingested'.format(ingested)))
