import random

import markdown as md

from django import template
from django.utils.safestring import mark_safe


register = template.Library()


@register.filter(name='markdown')
def markdown(value):
    return mark_safe(md.markdown(value, extensions=['extra', 'codehilite']))


@register.simple_tag(name='titlefont')
def titlefont():
    font = random.choice([
        'Bungee Outline',
        'Bungee Shade',
        'Cabin Sketch',
        'Caesar Dressing',
        'Creepster',
        'Ewert',
        'Fascinate Inline',
        'Hanalei',
        'Iceland',
        'Kumar One Outline',
        'Libre Barcode 128 Text',
        'Nova Slim',
        'Revalia',
        'Supermercado One',
        'Wallpoet'])
    return mark_safe('''
    <link href="https://fonts.googleapis.com/css?family={font}" rel="stylesheet" />
    <style>
    header h1 {{
        font-family: "{font}", monospace;
    }}
    </style>
    '''.format(font=font))
