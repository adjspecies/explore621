from datetime import datetime
import pytz
import requests
import time

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from posts.models import (
    Post,
    Tag,
    Source,
    Artist,
    IngestLog
)


class Command(BaseCommand):

    help = ("Adds any new posts and refreshes tags on old posts up "
            "to a certain point")

    def handle(self, *args, **options):
        ingested = 0
        last_id = 0
        tags_added = {}
        sources_added = {}
        artists_added = {}
        for i in range(1, 751):
            time.sleep(2)
            r = requests.get(
                'https://e621.net/post/index.json',
                {'page': i},
                headers={'user-agent': '[adjective][species]'})
            if r.status_code != 200:
                self.stdout.write(
                    self.style.NOTICE('got {} on page {}, skipping'.format(
                        r.status_code, i)))
            tags_added = {}
            sources_added = {}
            artists_added = {}
            updated = 0
            new = 0
            for record in r.json():
                if record['id'] > last_id:
                    last_id = record['id']
                try:
                    post = Post.objects.get(source_id=record['id'])
                    updated += 1
                except Post.DoesNotExist:
                    created_at = pytz.utc.localize(
                        datetime.fromtimestamp(record['created_at']['s']))
                    post = Post(
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
                    new += 1
                record_tags = record['tags'].split(' ')
                tags = []
                for record_tag in record_tags:
                    if record_tag in tags_added:
                        tag = tags_added[record_tag]
                    else:
                        try:
                            tag = Tag.objects.get(tag=record_tag)
                        except Tag.DoesNotExist:
                            tag = Tag(tag=record_tag)
                            tag.save()
                        tags_added[record_tag] = tag
                    tags.append(tag)
                artists = []
                for record_artist in record.get('artist', []):
                    if record_artist in artists_added:
                        artist = artists_added[record_artist]
                    else:
                        try:
                            artist = Artist.objects.get(name=record_artist)
                        except Artist.DoesNotExist:
                            artist = Artist(name=record_artist)
                            artist.save()
                        artists_added[record_artist] = artist
                    artists.append(artist)
                sources = []
                for record_source in record.get('sources', []):
                    if record_source in sources_added:
                        source = sources_added[record_source]
                    else:
                        try:
                            source = Source.objects.get(url=record_source)
                        except Source.DoesNotExist:
                            source = Source(url=record_source)
                            source.save()
                        sources_added[record_source] = source
                    sources.append(source)
                try:
                    post.save()
                except IntegrityError:
                    continue
                post.artists.set(artists)
                post.sources.set(sources)
                post.tags.set(tags)
                ingested += 1
            self.stdout.write(
                self.style.SUCCESS(
                    'processed page {}; {} new, {} updated'.format(
                        i, new, updated)))
        log = IngestLog(
            records_ingested=ingested,
            last_id=last_id)
        log.save()
        self.stdout.write(
            self.style.SUCCESS('{} posts ingested'.format(ingested)))
