# Generated by Django 3.2.12 on 2022-04-14 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0004_client_carte'),
    ]

    operations = [
        migrations.AddField(
            model_name='personnel',
            name='function',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Fonction'),
        ),
    ]
