from django.core.management.base import BaseCommand
from django.db.models import Count

from posts.models import Tag


class Command(BaseCommand):

    help = ("Redo tag types to include non-standard tags")

    def handle(self, *args, **options):
        tags_to_check = Tag.objects.filter(tag_type=0)\
            .annotate(count=Count('post'))\
            .order_by('-count')
        valid_types = [t[0] for t in Tag.TYPE_CHOICES]
        new_types = [': '.join((str(t[0]), t[1])) for t in Tag.TYPE_CHOICES if t[0] > 5]
        new_types.append('q: Quit')
        for tag in tags_to_check:
            new_type = input('{}\n    {}: '.format(
                '\n'.join(new_types),
                tag.tag))
            if new_type == '':
                continue
            if new_type == 'q':
                break
            tag.tag_type = int(new_type)
            tag.save()
