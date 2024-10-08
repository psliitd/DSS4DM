# Generated by Django 4.1.11 on 2024-05-25 10:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('details', models.TextField(blank=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='own_tags', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='meeting_group',
            fields=[
                ('meeting_group_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('group_type', models.BooleanField(default=False)),
                ('is_recurring', models.BooleanField(null=True)),
                ('recurring_time', models.IntegerField(default=30)),
                ('member_secretary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(related_name='group_members', to=settings.AUTH_USER_MODEL)),
                ('related_departments', models.ManyToManyField(blank=True, to='common.department')),
            ],
        ),
        migrations.CreateModel(
            name='meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=70)),
                ('is_all_day', models.BooleanField(default=False)),
                ('start_date_time', models.DateTimeField()),
                ('end_date_time', models.DateTimeField()),
                ('location', models.CharField(blank=True, max_length=30)),
                ('priority', models.IntegerField(choices=[(1, 'Low'), (2, 'Normal'), (3, 'High')], default=2)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('meeting_minutes', models.CharField(blank=True, max_length=500)),
                ('meeting_documents', models.ManyToManyField(to='common.document')),
                ('meeting_group_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schedule.meeting_group')),
                ('meeting_participants', models.ManyToManyField(related_name='meeting_participants', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['start_date_time'],
            },
        ),
    ]
