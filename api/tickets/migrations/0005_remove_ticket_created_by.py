# Generated by Django 4.1.2 on 2022-11-13 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0004_ticket_updated_at_alter_ticket_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='created_by',
        ),
    ]
