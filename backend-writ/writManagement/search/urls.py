from django.urls import path
from . import  views 
urlpatterns = [
    path('searchEngine',views.searchQuery),
    # path('getSituations',views.getSituations)
]