# Generated by Django 3.2.12 on 2022-04-04 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('presence', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presence',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='presencecoach',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
