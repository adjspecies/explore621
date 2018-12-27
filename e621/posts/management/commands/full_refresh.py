from datetime import datetime
import pytz
import requests
import time

from django.core.management.base import BaseCommand
from django.db.models import (
    Count,
    Max,
    Min,
)
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

    def add_arguments(self, parser):
        parser.add_argument(
            'username')

    def handle(self, *args, **options):
        ua = '[adjective][species] (explore621) {}'.format(options['username'])
        started = datetime.now()
        self.stdout.write(
            'Performing a full refresh from e621 starting at {}'.format(
                started.isoformat()))
        max_id = Post.objects.aggregate(mid=Max('source_id'))['mid']
        min_id = Post.objects.aggregate(mid=Min('source_id'))['mid']
        total_added = 0
        while max_id > min_id:
            time.sleep(1)
            r = requests.get(
                'https://e621.net/post/index.json',
                {'limit': 320, 'before_id': max_id},
                headers={'user-agent': ua})
            if r.status_code != 200:
                self.stdout.write(
                    self.style.NOTICE('    got {} on before_id {}, skipping'.format(
                        r.status_code, max_id)))
                continue
            skipped = 0
            added = 0
            for record in r.json():
                max_id = record['id']
                created_at = pytz.utc.localize(
                    datetime.fromtimestamp(record['created_at']['s']))
                if Post.objects.filter(source_id=record['id']).count() != 0:
                    skipped += 1
                    continue
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
                record_tags = record['tags'].split(' ')
                tags = []
                for record_tag in record_tags:
                    try:
                        tag = Tag.objects.get(tag=record_tag)
                    except Tag.DoesNotExist:
                        tag = Tag(tag=record_tag)
                        tag.save()
                    tags.append(tag)
                artists = []
                for record_artist in record.get('artist', []):
                    try:
                        artist = Artist.objects.get(name=record_artist)
                    except Artist.DoesNotExist:
                        artist = Artist(name=record_artist)
                        artist.save()
                    artists.append(artist)
                sources = []
                for record_source in record.get('sources', []):
                    try:
                        source = Source.objects.get(url=record_source)
                    except Source.DoesNotExist:
                        source = Source(url=record_source)
                        source.save()
                    sources.append(source)
                try:
                    post.save()
                except IntegrityError:
                    continue
                post.artists.set(artists)
                post.sources.set(sources)
                post.tags.set(tags)
                added += 1
            self.stdout.write(
                self.style.SUCCESS('Ending at {}: {} added / {} skipped'.format(
                    max_id, added, skipped)))
            total_added += added
        self.stdout.write('Fixing typeless tags')
        for tag in Tag.objects.filter(tag_type=-1):
            self.stdout.write('--- Fixing tag {}'.format(tag.tag))
            r = requests.get(
                'https://e621.net/tag/show.json',
                params={'name': tag.tag},
                headers={'user-agent': '[adjective][species]'})
            if 'type' not in r.json():
                self.stdout.write(
                    self.style.NOTICE('    not fixing {}'.format(tag.tag)))
                continue
            tag.tag_type = r.json()['type']
            tag.save()
            tags_fixed += 1
            fixed_tags.append(tag.tag)
            self.stdout.write(
                self.style.SUCCESS('    fixed {} ({})'.format(
                    tag.tag, tag.get_tag_type_display())))
            time.sleep(0.7)
        self.stdout.write(
            self.style.SUCCESS('{} tags fixed'.format(tags_fixed)))
        self.stdout.write(
            self.style.SUCCESS('Finished full refresh in {}'.format(
                str(datetime.now() - started))))
