import datetime
from pytz import UTC

from django.db.models import Max

from posts.models import Post


FIRST = datetime.datetime(2007, 2, 10, 7, 17, 30, tzinfo=UTC)
LATEST = Post.objects.aggregate(now=Max('created_at'))['now']

def date_out_of_bounds(year=None, month=None, day=None, hour=None,
                       minute=None, second=None):
    to_check = datetime.datetime(    
        year=year or FIRST.year,
        month=month or FIRST.month,
        day=day or FIRST.day,
        hour=hour or FIRST.hour,
        minute=minute or FIRST.minute,
        second=second or FIRST.second,
        tzinfo=UTC)
    second = datetime.timedelta(seconds=1)
    return to_check + second < FIRST or to_check - second > LATEST

def dict_to_key_value_list(d):
    return [
        {'key': k1, 'value': v1} for k1, v1 in sorted(
            [(k2, v2) for k2, v2 in d.items()])]

def date_range(days, offset):
    start = LATEST\
        - datetime.timedelta(days=days)\
        - datetime.timedelta(days=offset)
    end = start + datetime.timedelta(days=days)
    return start, end
