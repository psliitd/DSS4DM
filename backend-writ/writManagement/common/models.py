from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
# from schedule.models import meeting
# from compliance.models import compliance

class district(models.Model):
    name = models.CharField(max_length=20, blank=False)
    area = models.IntegerField(blank=True)
    state = models.CharField(max_length=20, blank=False)
    # In the latitude longitude format
    location = models.CharField(max_length=30, blank=True)
    population = models.PositiveIntegerField(default=0)
    district= models.AutoField(primary_key=True)

    def __str__(self):
        return self.name

class document(models.Model):
    class objectType(models.TextChoices):
        MEETING='meeting'
        COMPLIANCE='compliance'
        MESSAGE= 'message'
    document_id=models.AutoField(primary_key=True)
    # meeting_id=models.ForeignKey(meeting,on_delete=models.CASCADE, blank=True)
    # compliance_id= models.ForeignKey(compliance,on_delete=models.CASCADE,blank=True)
    object_type= models.CharField(max_length=10,choices=objectType.choices,blank=False)
    # message_id= models.ForeignKey(message,on_delete=models.CASCADE,blank=True)
    document_link=models.CharField(max_length=100,null=False)
    file_type= models.CharField(max_length=8,null=True)
    document_name= models.CharField(max_length=30,null=False)
    owner=models.ForeignKey(User,blank=False,null=True, on_delete=models.SET_NULL)


class message(models.Model):
    message_text=models.CharField(max_length=200,blank=False)
    message_id= models.AutoField(primary_key=True)
    message_by = models.ForeignKey(User,blank=False, on_delete=models.CASCADE, related_name='message_by')
    message_to= models.ForeignKey(User,blank=False,on_delete=models.CASCADE,related_name='message_to')
    is_read= models.BooleanField(default=0)
    created_at= models.DateTimeField(auto_now_add=True)
    read_at= models.DateTimeField(blank=True,null=True)
    documents= models.ManyToManyField(document, name='related_documents') 


class department(models.Model):
    title=models.CharField(max_length=50,blank=False)
    department_id=models.AutoField(primary_key=True,blank=False,null=False)
    details=models.TextField(blank=True)

class profile(models.Model):
    class Sex(models.TextChoices):
        MALE = "male"
        FEMALE = "female"
        OTHER = "other"
    user = models.OneToOneField('auth.User', related_name="profile", on_delete=models.CASCADE, primary_key=True)
    sex = models.CharField(max_length=7, choices=Sex.choices, default=Sex.MALE)
    dob = models.DateField(blank=True)
    batch = models.PositiveSmallIntegerField(blank=True)
    # district_current = models.ForeignKey(district,on_delete=models.SET_NULL,null=True)
    district = models.CharField(max_length=30, blank=True)
    image = models.CharField(max_length=50,blank=True)
    mobile_number = models.CharField(max_length=12, blank= True) 
    # 91 must be added to the 10 digit mobile number 
    departments= models.ManyToManyField(department)
    def __str__(self):
        return self.user.first_name
# Create your models here.