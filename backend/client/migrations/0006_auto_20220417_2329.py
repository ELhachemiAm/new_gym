# Generated by Django 3.2.12 on 2022-04-17 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0005_personnel_function'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Date de dernière mise à jour'),
        ),
        migrations.AddField(
            model_name='coach',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Date de dernière mise à jour'),
        ),
        migrations.AddField(
            model_name='personnel',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Date de dernière mise à jour'),
        ),
    ]
