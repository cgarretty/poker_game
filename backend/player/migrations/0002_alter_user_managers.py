# Generated by Django 4.2.2 on 2023-07-30 06:13

from django.db import migrations
import player.models


class Migration(migrations.Migration):

    dependencies = [
        ('player', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', player.models.CustomizedUserManager()),
            ],
        ),
    ]
