# Generated by Django 3.2.12 on 2022-04-11 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salle_activite', '0004_auto_20220404_1714'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='color',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
