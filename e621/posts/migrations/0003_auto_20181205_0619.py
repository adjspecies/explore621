# Generated by Django 2.1.3 on 2018-12-05 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20181118_0154'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='rating',
            field=models.CharField(choices=[('s', 'safe'), ('q', 'questionable'), ('e', 'explicit')], max_length=5),
        ),
    ]
