# Generated by Django 3.2.12 on 2022-04-12 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('abonnement', '0003_abonnement_type_of'),
    ]

    operations = [
        migrations.RenameField(
            model_name='abonnement',
            old_name='number_of_days',
            new_name='length',
        ),
        migrations.RemoveField(
            model_name='abonnement',
            name='systeme_cochage',
        ),
        migrations.AlterField(
            model_name='abonnement',
            name='seances_quantity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='abonnement',
            name='type_of',
            field=models.CharField(choices=[('VH', 'Volume Horaire'), ('OU', 'Ouvert'), ('SF', 'Seances Fix'), ('SL', 'Seances Libre')], default='OU', max_length=2, verbose_name="type d'abonnement"),
        ),
    ]
