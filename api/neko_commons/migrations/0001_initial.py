# Generated by Django 4.1.3 on 2022-11-16 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('type', models.CharField(db_index=True, max_length=30)),
                ('identifier', models.BigIntegerField(db_index=True)),
                ('disk_type', models.CharField(max_length=30)),
                ('file_path', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
                ('file_name', models.CharField(max_length=255)),
                ('unique_file_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'attachments',
            },
        ),
    ]
