from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from common.models import document,department
# Create your models here.
class meeting_group(models.Model):
    member_secretary= models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True)
    meeting_group_id= models.AutoField(primary_key=True)
    title = models.CharField(blank=False, max_length=50)
    group_type = models.BooleanField(default=False) # 0->Committee meetings 1->ad hoc
    is_recurring= models.BooleanField(null=True) # 0->If not recurring
    recurring_time= models.IntegerField(default=30) # inDays
    members= models.ManyToManyField(User,related_name='group_members')
    related_departments=models.ManyToManyField(department, blank=True)


class tag(models.Model):
    owner = models.ForeignKey('auth.User', related_name="own_tags", on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=50, blank=False)
    details = models.TextField(blank=True)
    def __str__(self):
        return self.title
    
class meeting(models.Model):
    class Priority(models.IntegerChoices):
        LOW = 1
        NORMAL = 2
        HIGH = 3
    owner = models.ForeignKey('auth.User', related_name='events', on_delete=models.CASCADE)
    title = models.CharField(max_length=70, blank=False)
    is_all_day = models.BooleanField(default=False)
    start_date_time = models.DateTimeField(blank=False)
    end_date_time = models.DateTimeField(blank=False)
    '''
        https://stackoverflow.com/questions/48388366/i-want-to-add-a-location-field-in-django-model-which-take-location-input-by-putt
        location field can be made like this as well but since location can't be always found
        Format of location = 'is_lat_long,latitude,longitude'
    '''
    location = models.CharField(max_length=30, blank=True)
    priority = models.IntegerField(choices=Priority.choices, default=Priority.NORMAL)
    creation_date = models.DateTimeField(auto_now_add=True)
    meeting_participants = models.ManyToManyField(User, blank=False, related_name="meeting_participants")
    meeting_group_id= models.ForeignKey(meeting_group,on_delete=models.CASCADE)
    meeting_documents= models.ManyToManyField(document)
    meeting_minutes = models.CharField(max_length=500,blank=True)
    class Meta:
        ordering = ['start_date_time']

    def __str__(self):
        return self.title



# class meeting(models.Model):
#     class Priority(models.IntegerChoices):
#         LOW=1
#         NORMAL=2
#         HIGH=3
#     meetingId= models.UUIDField(primary_key=True, default=uuid.uuid4 , editable=False)
#     groupId= models.ForeignKey(meetingGroup,on_delete=models.CASCADE)
#     timestampCreation= models.DateTimeField(max_length=50)
#     minutesOfMeeting= models.TextField(null=True)
#     minutesLink = models.CharField(max_length=1000, default="")
#     meetingSubject= models.CharField(max_length=1000,blank=False)
#     scheduledTime= models.DateTimeField(max_length=50)
#     noticeLink= models.CharField(max_length=1000,default="")
#     doablesAssigned= ArrayField(models.UUIDField(), null= True)
#     agenda=JSONField(null=True)
#     priority = models.IntegerField(choices=Priority.choices, default=Priority.NORMAL)




# above code is written by previous batch
# copied it while merging our code and older code.


from mongodb_connection import scheduleDB

departments = scheduleDB['departments']
# depatment name
# department description

meetings = scheduleDB['meetings']
# meetingSubject
# scheduleDate
# scheduledLocation
# scheduledStartTime
# scheduledEndTime
# selectedPriority