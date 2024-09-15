from django.urls import path
from . import  views 
urlpatterns = [
    path('createCompliance',views.createCompliance),
    path('getAllCompliance',views.getCompliance)
]