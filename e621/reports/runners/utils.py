import datetime
from pytz import UTC


FIRST = datetime.datetime(2007, 2, 10, 7, 17, 30, tzinfo=UTC)
NOW = datetime.datetime.utcnow()
NOW = NOW.replace(tzinfo=UTC)

def too_early(year=None, month=None, day=None, hour=None, minute=None,
               second=None):
    to_check = datetime.datetime(    
        year=year or FIRST.year,
        month=month or FIRST.month,
        day=day or FIRST.day,
        hour=hour or FIRST.hour,
        minute=minute or FIRST.minute,
        second=second or FIRST.second,
        tzinfo=UTC)
    return to_check < FIRST

def dict_to_key_value_list(d):
    return [
        {'key': k1, 'value': v1} for k1, v1 in sorted(
            [(k2, v2) for k2, v2 in d.items()])]
