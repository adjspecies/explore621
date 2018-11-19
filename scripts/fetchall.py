import requests
import time
import json

seen = []
max_id = 1707776

with open('e621-total-2018-11-13.json', 'w') as f:
    f.write('[')
    while max_id > 0:
        print('fetching starting at {}'.format(max_id))
        r = requests.get(
            'https://e621.net/post/index.json',
            {'limit': 100, 'before_id': max_id},
            headers={'user-agent': '[adjective][species]'})
        if r.status_code != 200:
            print('!!! bailing on this request, got {}'.format(r.status_code, r.text))
        for item in r.json():
            if item['md5'] in seen:
                continue
            seen.append(item['md5'])
            f.write(json.dumps(item))
            f.write(',')
        max_id -= 100
        time.sleep(2)
    f.write(']')

print('fetched {} records'.format(len(seen)))
