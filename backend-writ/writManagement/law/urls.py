from django.urls import path
from . import  views 
urlpatterns = [
    path('addSituation',views.addSituation),
    path('getSituations',views.getSituations),
    path('getCombined',views.getCombinedSituation),
]