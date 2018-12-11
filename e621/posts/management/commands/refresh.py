from datetime import datetime
import pytz
import requests
import time

from django.core.management.base import BaseCommand
from django.db.models import Count
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
            '--pages',
            nargs='?',
            type=int,
            default=750)
        parser.add_arguments(
            '--per-page',
            nargs='?',
            type=int,
            default=320,
            dest='per_page')
        parser.add_arguments(
            'username',
            nargs='1',
            type=str)

    def handle(self, *args, **options):
        ua = '[adjective][species] (explore621) {}'.format(options['username'])
        started = datetime.now()
        started.replace(tzinfo=pytz.UTC)
        ingested = 0
        total_new = 0
        total_updated = 0
        last_id = 0
        tags_added = {}
        sources_added = {}
        artists_added = {}
        self.stdout.write('Refreshing data from e621 starting at {}'.format(
            started.isoformat()))
        self.stdout.write(
            'Fetching {} pages worth of posts at {} per page'.format(
                options['pages'], options['per_page']))
        for i in range(1, options['pages'] + 1):
            time.sleep(1)
            self.stdout.write('--- Fetching page {}'.format(i))
            r = requests.get(
                'https://e621.net/post/index.json',
                {'limit': options['per_page'], 'page': i},
                headers={'user-agent': ua})
            if r.status_code != 200:
                self.stdout.write(
                    self.style.NOTICE('    got {} on page {}, skipping'.format(
                        r.status_code, i)))
                continue
            tags_added = {}
            sources_added = {}
            artists_added = {}
            updated = 0
            new = 0
            for record in r.json():
                if record['id'] > last_id:
                    last_id = record['id']
                created_at = pytz.utc.localize(
                    datetime.fromtimestamp(record['created_at']['s']))
                try:
                    post = Post.objects.get(source_id=record['id'])
                    post.source_id = record['id']
                    post.description = record['description']
                    post.created_at = created_at
                    post.creator_id = record['creator_id']
                    post.author = record['author']
                    post.change = record['change']
                    post.source = record['source']
                    post.score = record['score']
                    post.fav_count = record['fav_count']
                    post.md5 = record['md5']
                    post.file_size = record['file_size']
                    post.file_url = record['file_url']
                    post.width = record['width']
                    post.height = record['height']
                    post.file_ext = record['file_ext']
                    post.preview_url = record['preview_url']
                    post.preview_width = record['preview_width']
                    post.preview_height = record['preview_height']
                    post.sample_url = record['sample_url']
                    post.sample_width = record['sample_width']
                    post.sample_height = record['sample_height']
                    post.rating = record['rating']
                    post.status = record['status']
                    post.has_comments = record['has_comments']
                    post.has_notes = record['has_notes']
                    post.has_children = record['has_children']
                    post.children = record['children']
                    post.parent_id = record['parent_id']
                    updated += 1
                except Post.DoesNotExist:
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
            total_new += new
            total_updated += updated
            self.stdout.write(
                self.style.SUCCESS(
                    '    processed page {}; {} new, {} updated'.format(
                        i, new, updated)))
        self.stdout.write(
            self.style.SUCCESS('{} posts ingested ({} new - {} updated)'.format(
                ingested, total_new, total_updated)))
        tags_fixed = 0
        fixed_tags = []
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
        empty = Tag.objects.annotate(Count('post')).filter(post__count=0)
        tags_deleted = 0
        deleted_tags = []
        self.stdout.write('Deleting empty tags')
        for tag in empty:
            self.stdout.write(
                self.style.NOTICE('--- deleting {}'.format(tag.tag)))
            deleted_tags.append(tag.tag)
            tag.delete()
            tags_deleted += 1
        self.stdout.write(
            self.style.SUCCESS('{} empty tags deleted'.format(tags_deleted)))
        log = IngestLog(
            started=started,
            records_ingested=ingested,
            new=total_new,
            updated=total_updated,
            last_id=last_id,
            fixed_tags=' '.join(fixed_tags),
            deleted_tags=' '.join(deleted_tags))
        log.save()
        self.stdout.write(
            self.style.SUCCESS('Finished refreshing in {}'.format(
                str(datetime.now() - started))))
