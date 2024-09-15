from django.db import models
from schedule.models import meeting,document
from common.models import message
from django.contrib.auth.models import User
import datetime
# Create your models here.
class compliance(models.Model):
    class Priority(models.IntegerChoices):
        LOW = 1
        NORMAL = 2
        HIGH = 3
    is_meeting_related= models.BooleanField(blank=False)
    related_meeting= models.ForeignKey(meeting, on_delete=models.CASCADE,null=True)
    compliance_id= models.AutoField(primary_key=True)
    priority = models.IntegerField(choices=Priority.choices, default=Priority.NORMAL)
    deadline= models.DateTimeField(blank=False)
    is_completed= models.BooleanField(default=False)
    reminder_period= models.DurationField(default=datetime.timedelta(days=7))
    created_by= models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    description= models.CharField(max_length=100)
    related_users= models.ManyToManyField(User,related_name='related_users')
    related_document= models.ManyToManyField(document)
    messages= models.ManyToManyField(message)

