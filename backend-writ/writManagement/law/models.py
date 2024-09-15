from django.db import models
from django.contrib.postgres.fields import ArrayField
class calamity(models.Model):
    class calamityTypes(models.TextChoices):
        FLOODS = "floods"
        DROUGHT =  "drought"
        EARTHQUAKE = "earthquake"
        FORESTFIRE = "forest fire"
        CYCLONE = "cyclone"
        LANDSLIDE = "landslide"
        STORM = "storm"
        OTHER = "other"

    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.TextField(blank=False)
    type = models.CharField(max_length=20, choices=calamityTypes.choices, default=calamityTypes.OTHER)
    total_cost = models.BigIntegerField(default=0)
    injured = models.IntegerField(default=0)
    dead = models.IntegerField(default=0)
    people_affected = models.IntegerField(default=0)
    start_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    police = models.IntegerField(blank=False, default=0)
    ambulance = models.IntegerField(blank=False, default=0)
    ndrf = models.IntegerField(blank=False, default=0)
    lesson_learnt = ArrayField(models.CharField(max_length=100),blank=False)
    class Meta:
        ordering = ['start_date']
    def __str__(self):
        return self.title
# Create your models here.
class crime(models.Model):
    class crimeTypes(models.TextChoices):
        MURDER = "murder"
        RAPE =  "rape"
        KIDNAPPING = "kidnapping"
        LOOT = "loot"
        ROBBERY = "robbery"
        SMUGGLING = "smuggling"
        OTHER = "other"
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.TextField(blank=False)
    type = models.CharField(max_length=20, choices=crimeTypes.choices, default=crimeTypes.OTHER)
    crime_location = models.TextField(blank = True)
    date_time = models.DateTimeField(blank=True,null=True)
    lesson_learnt = ArrayField(models.CharField(max_length=100),blank=False)
    class Meta:
        ordering = ['date_time']
    def __str__(self):
            return self.title

class gathering(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.TextField( blank=False)
    class gatheringTypes(models.TextChoices):
        RELIGIOUS = "religious"
        POLITICAL =  "political"
        SOCIAL = "social"
        PROTEST = "protest"
        GOVERNMENT = "government"
        OTHER = "other"
    type=models.CharField(max_length=20, choices=gatheringTypes.choices, default=gatheringTypes.OTHER)
    attendance = models.IntegerField(blank=False, default=0)
    close = models.BooleanField(default = False,blank=False)
    location = models.TextField(blank = False)
    police = models.IntegerField(blank=False, default=0)
    ambulance = models.IntegerField(blank=False, default=0)
    fire_fighters = models.IntegerField(blank=False, default=0)
    date_time = models.DateTimeField(blank=True, null=True)
    duration = models.IntegerField(blank=False)
    lesson_learnt = ArrayField(models.CharField(max_length=100),blank=False)
    class Meta:
        ordering = ['date_time']


class rally(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.TextField( blank=False)
    class rallyTypes(models.TextChoices):
        RELIGIOUS = "religious"
        POLITICAL =  "political"
        SOCIAL = "social"
        PROTEST = "protest"
        GOVERNMENT = "government"
        OTHER = "other"
    type= models.CharField(max_length=20, choices=rallyTypes.choices, default=rallyTypes.OTHER)
    attendance = models.IntegerField(blank=False, default=0)
    stationary = models.BooleanField(default = False,blank=False)
    start_location = models.CharField( max_length=50, blank = False)
    end_location = models.CharField(max_length=50, blank = False)
    police = models.IntegerField(blank=False, default=0)
    ambulance = models.IntegerField(blank=False, default=0)
    fire_fighters = models.IntegerField(blank=False, default=0)
    date_time = models.DateTimeField(blank=True, null=True)
    lesson_learnt = ArrayField(models.CharField(max_length=100),blank=False)
    class Meta:
        ordering = ['date_time']


class sentences(models.Model):
    class type(models.TextChoices):
        epidemic= 'epidemic'
        rally='rally'
        gathering='gathering'
        crime='crime'
        calamity='calamity'    
    situation_id= models.IntegerField(blank=False)
    lesson= models.TextField()

class epidemic(models.Model):
    class epidemicTypes(models.TextChoices):
        DEADLY = "deadly"
        SEASONAL =  "seasonal"
        INFECTIOUS = "infectious"
        OTHER = "other"
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.TextField( blank=False)
    type = models.CharField(max_length=50,choices=epidemicTypes.choices, default=epidemicTypes.OTHER)
    total_infected = models.IntegerField(blank=False, default=0)
    cured = models.IntegerField(blank=False, default=0)
    died = models.IntegerField(blank=False, default=0)
    year = models.IntegerField(blank=False, default=2020)
    date = models.DateField(blank = True, null=True)
    police = models.IntegerField(blank=False, default=0)
    hospital_beds = models.IntegerField(blank=False, default=0)
    health_staff = models.IntegerField(blank=False, default=0)
    lesson_learnt = models.TextField(blank=False)
    def __str__(self):
        return self.title