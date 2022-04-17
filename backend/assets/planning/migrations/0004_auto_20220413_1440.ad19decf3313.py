# Generated by Django 3.2.12 on 2022-04-13 13:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('planning', '0003_alter_planning_is_default'),
    ]

    operations = [
        migrations.AddField(
            model_name='planning',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='planning',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
