from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import crime,calamity,epidemic,gathering,rally
from django.http import JsonResponse
from django.core.paginator import Paginator
from datetime import datetime
from django.contrib.auth.models import User
import json
from django.db import connection
# Create your views here.
@require_http_methods(["POST"])
def addSituation(request):
        try:
            situation_data=json.loads(request.body)
            # print(request.use)
            situation_data['owner']=request.user
            situation_type=situation_data['situationType']
            situation_data.pop('situationType')
            situation_data['lesson_learnt']=situation_data['lesson_learnt'].split(',')
            if situation_type=='crime':
                 situation= crime.objects.create(**situation_data)
                 situation.save()
                #  print(crime_situation)
            if situation_type=='rally':
                 situation= rally.objects.create(**situation_data)
                 situation.save()
            if situation_type=='epidemic':
                 situation= epidemic.objects.create(**situation_data)
                 situation.save()
            if situation_type=='calamity':
                 situation= calamity.objects.create(**situation_data)
                 situation.save()
            if situation_type=='gathering':
                 situation_data['close']=situation_data['close']=='true'
                 situation= gathering.objects.create(**situation_data)
                 situation.save()
            
            return JsonResponse({'success':True , 'message':'Added The Situation!'})
        except Exception as err:
            print(err)
            return JsonResponse({'error':'Some Error Has Occured!', 'success':False})

@require_http_methods(["GET","POST"])
def getSituations(request):
     if(request.method=='POST'):
          print('post request')
          try:
               page=request.GET.get('page_number')
               filters=json.loads(request.body)
               print(filters['situationType'])
               if(filters['situationType']=='crime'):
                    format_string = '%Y-%m-%d'
                         # print(filters['startDate'])
                    startDate= datetime.strptime(filters['startDate'],format_string)
                    endDate= datetime.strptime(filters['endDate'],format_string)
                    crime_situations= crime.objects.filter(date_time__range=(startDate,endDate))
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         # filter(police__range=(filters['police-min'],filters['police-max'])).
                         # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                         # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                    data=[]
                    for i in  crime_situations.values():
                         i['situationType']=filters['situationType']
                         data.append(i)
                         # all_data.append(i)
                    print(len(data))
                    paginator= Paginator( data,4)
                    page_obj = paginator.get_page(page)
                    res_data=list(page_obj.object_list)
                    print(res_data)
                    return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
               if(filters['situationType']=='rally'):
                    format_string = '%Y-%m-%d'
                         # print(filters['startDate'])
                    startDate= datetime.strptime(filters['startDate'],format_string)
                    endDate= datetime.strptime(filters['endDate'],format_string)
                    crime_situations= rally.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                    data=[]
                    for i in  crime_situations.values():
                         i['situationType']=filters['situationType']
                         data.append(i)
                         # all_data.append(i)
                    paginator= Paginator( data,4)
                    page_obj = paginator.get_page(page)
                    res_data=list(page_obj.object_list)
                    return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
               if(filters['situationType']=='epidemic'):
                    format_string = '%Y-%m-%d'
                         # print(filters['startDate'])
                    startDate= datetime.strptime(filters['startDate'],format_string)
                    print(startDate.year)
                    endDate= datetime.strptime(filters['endDate'],format_string)
                    crime_situations= epidemic.objects.filter(date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max']))
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                         # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                    data=[]
                    for i in  crime_situations.values():
                         i['situationType']=filters['situationType']
                         data.append(i)
                         # all_data.append(i)
                    paginator= Paginator( data,4)
                    page_obj = paginator.get_page(page)
                    res_data=list(page_obj.object_list)
                    return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
               if(filters['situationType']=='gathering'):
                    format_string = '%Y-%m-%d'
                         # print(filters['startDate'])
                    startDate= datetime.strptime(filters['startDate'],format_string)
                    endDate= datetime.strptime(filters['endDate'],format_string)
                    crime_situations= gathering.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                    data=[]
                    for i in  crime_situations.values():
                         i['situationType']=filters['situationType']
                         data.append(i)
                         # all_data.append(i)
                    paginator= Paginator( data,4)
                    page_obj = paginator.get_page(page)
                    res_data=list(page_obj.object_list)
                    return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
               if(filters['situationType']=='calamity'):
                    format_string = '%Y-%m-%d'
                         # print(filters['startDate'])
                    startDate= datetime.strptime(filters['startDate'],format_string)
                    endDate= datetime.strptime(filters['endDate'],format_string)
                    crime_situations= calamity.objects.filter(start_date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max']))
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                    data=[]
                    for i in  crime_situations.values():
                         i['situationType']=filters['situationType']
                         data.append(i)
                         # all_data.append(i)
                    paginator= Paginator( data,4)
                    page_obj = paginator.get_page(page)
                    res_data=list(page_obj.object_list)
                    return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
               if(filters['situationType']=='all'):
                    all_data=[]
                    format_string = '%Y-%m-%d'
                         # print(filters['startDate'])
                    startDate= datetime.strptime(filters['startDate'],format_string)
                    endDate= datetime.strptime(filters['endDate'],format_string)
                    crime_situations= crime.objects.filter(date_time__range=(startDate,endDate))
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         # filter(police__range=(filters['police-min'],filters['police-max'])).
                         # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                         # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                    # data=[]
                    for i in  crime_situations.values():
                         i['situationType']='crime'
                         # data.append(i)
                         all_data.append(i)
                    crime_situations= calamity.objects.filter(start_date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max']))
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                    # data=[]
                    for i in  crime_situations.values():
                         i['situationType']='calamity'
                         # data.append(i)
                         all_data.append(i)
                    crime_situations= gathering.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                    # data=[]
                    for i in  crime_situations.values():
                         i['situationType']='gathering'
                         # data.append(i)
                         all_data.append(i)
                    crime_situations= epidemic.objects.filter(date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max']))
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                         # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                    # data=[]
                    for i in  crime_situations.values():
                         i['situationType']='epidemic'
                         # data.append(i)
                         all_data.append(i)
                    crime_situations= rally.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                    if(filters['type']!='all'):
                         crime_situations=crime_situations.filter(type=filters['type'])
                    # data=[]
                    for i in  crime_situations.values():
                         i['situationType']='rally'
                         # data.append(i)
                         all_data.append(i)

                    paginator= Paginator( all_data,4)
                    page_obj = paginator.get_page(page)
                    res_data=list(page_obj.object_list)
                    return JsonResponse({'success':True,'data':{'page': 1,
          'total_pages': paginator.num_pages,'content':res_data} })
          except Exception as err:
               print(err)
               return JsonResponse({'error':'Some Error Has Occured!', 'success':False})          
          
          # POST REQUEST ENDS HERE


     if(request.method=="GET"):
          try:
               page=request.GET.get('page_number')
               print(page)
               crime_situations= crime.objects.all()
               gathering_situations= gathering.objects.all()
               rally_situations= rally.objects.all()
               calamity_situations= calamity.objects.all()
               epidemic_situations= epidemic.objects.all()
               data=[]
               for i in  crime_situations.values():
                    i['situationType']='crime'
                    data.append(i)
               for i in gathering_situations.values():
                    i['situationType']='gathering'
                    data.append(i)
               for i in rally_situations.values():
                    i['situationType']='rally'
                    data.append(i)
               for i in calamity_situations.values():
                    i['situationType']='calamity'
                    data.append(i)
               for i in epidemic_situations.values():
                    i['situationType']='epidemic'
                    data.append(i)
               paginator= Paginator( data,4)
               page_obj = paginator.get_page(page)
               print(page_obj)
               res_data=list(page_obj.object_list)
               
               return JsonResponse({'success':True,'data':{'page': 1,
     'total_pages': paginator.num_pages,'content':res_data} })
          except Exception as err:
               print(err)
               return JsonResponse({'error':'Some Error Has Occured!', 'success':False})
          

@require_http_methods(["POST"])
def getCombinedSituation(request):
          if(request.method=='POST'):
               # print('post request')
               try:
                    page=request.GET.get('page_number')
                    filters=json.loads(request.body)
                    # print(filters['situationType'])
                    data=[]
                    if(filters['situationType']=='crime'):
                         format_string = '%Y-%m-%d'
                              # print(filters['startDate'])
                         startDate= datetime.strptime(filters['startDate'],format_string)
                         endDate= datetime.strptime(filters['endDate'],format_string)
                         crime_situations= crime.objects.filter(date_time__range=(startDate,endDate))
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                              # filter(police__range=(filters['police-min'],filters['police-max'])).
                              # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                              # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         for i in  crime_situations.values():
                              i['situationType']=filters['situationType']
                              data.append(i)
                         # paginator= Paginator( data,4)
                         # page_obj = paginator.get_page(page)
                         # res_data=list(page_obj.object_list)
                         # return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
                    if(filters['situationType']=='rally'):
                         format_string = '%Y-%m-%d'
                              # print(filters['startDate'])
                         startDate= datetime.strptime(filters['startDate'],format_string)
                         endDate= datetime.strptime(filters['endDate'],format_string)
                         crime_situations= rally.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                         for i in  crime_situations.values():
                              i['situationType']=filters['situationType']
                              data.append(i)
                         # paginator= Paginator( data,4)
                         # page_obj = paginator.get_page(page)
                         # res_data=list(page_obj.object_list)
                         # return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
                    if(filters['situationType']=='epidemic'):
                         format_string = '%Y-%m-%d'
                              # print(filters['startDate'])
                         startDate= datetime.strptime(filters['startDate'],format_string)
                         # print(startDate.year)
                         endDate= datetime.strptime(filters['endDate'],format_string)
                         crime_situations= epidemic.objects.filter(date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max']))
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                              # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                              # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         for i in  crime_situations.values():
                              i['situationType']=filters['situationType']
                              data.append(i)
                         # paginator= Paginator( data,4)
                         # page_obj = paginator.get_page(page)
                         # res_data=list(page_obj.object_list)
                         # return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
                    if(filters['situationType']=='gathering'):
                         format_string = '%Y-%m-%d'
                              # print(filters['startDate'])
                         startDate= datetime.strptime(filters['startDate'],format_string)
                         endDate= datetime.strptime(filters['endDate'],format_string)
                         crime_situations= gathering.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                         for i in  crime_situations.values():
                              i['situationType']=filters['situationType']
                              data.append(i)
                         # paginator= Paginator( data,4)
                         # page_obj = paginator.get_page(page)
                         # res_data=list(page_obj.object_list)
                         # return JsonResponse({'success':True,'data':{'page': 1,'total_pages': paginator.num_pages,'content':res_data} })
                    if(filters['situationType']=='calamity'):
                         format_string = '%Y-%m-%d'
                              # print(filters['startDate'])
                         startDate= datetime.strptime(filters['startDate'],format_string)
                         endDate= datetime.strptime(filters['endDate'],format_string)
                         crime_situations= calamity.objects.filter(start_date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max']))
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                         for i in  crime_situations.values():
                              i['situationType']=filters['situationType']
                              data.append(i)
                    if(filters['situationType']=='all'):
                         # all_data=[]
                         format_string = '%Y-%m-%d'
                              # print(filters['startDate'])
                         startDate= datetime.strptime(filters['startDate'],format_string)
                         endDate= datetime.strptime(filters['endDate'],format_string)
                         crime_situations= crime.objects.filter(date_time__range=(startDate,endDate))
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                              # filter(police__range=(filters['police-min'],filters['police-max'])).
                              # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                              # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         # data=[]
                         for i in  crime_situations.values():
                              i['situationType']='crime'
                              # data.append(i)
                              data.append(i)
                         crime_situations= calamity.objects.filter(start_date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max']))
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                         # data=[]
                         for i in  crime_situations.values():
                              i['situationType']='calamity'
                              # data.append(i)
                              data.append(i)
                         crime_situations= gathering.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                         # data=[]
                         for i in  crime_situations.values():
                              i['situationType']='gathering'
                              # data.append(i)
                              data.append(i)
                         crime_situations= epidemic.objects.filter(date__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max']))
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                              # filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).
                              # filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                         # data=[]
                         for i in  crime_situations.values():
                              i['situationType']='epidemic'
                              # data.append(i)
                              data.append(i)
                         crime_situations= rally.objects.filter(date_time__range=(startDate,endDate)).filter(police__range=(filters['police-min'],filters['police-max'])).filter(ambulance__range=(filters['ambulance-min'],filters['ambulance-max'])).filter(attendance__range=(filters['attendance-min'],filters['attendance-max']))
                              # filter(injured__range=(filters['injured-min'],filters['injured-max'])).
                         if(filters['type']!='all'):
                              crime_situations=crime_situations.filter(type=filters['type'])
                         # data=[]
                         for i in  crime_situations.values():
                              i['situationType']='rally'
                              # data.append(i)
                              data.append(i)
                    # paginator= Paginator( data,4)
                    # page_obj = paginator.get_page(page)
                    # res_data=list(page_obj.object_list)
                    unique_strings = []
                    strings=[]
                    for i in data:
                         # print(i)
                         for j in i['lesson_learnt']:
                              if(len(strings)==0):
                                   strings.append(j)
                              else:
                                   matched=0
                                   for k in strings:
                                        s= "'"+j+"','"+k+"')"
                                        a= execute_sql_command('SELECT similarity('+s+';')[0][0]
                                        print(a)
                                        if(a>0.35):
                                             matched=1
                                             break
                                   if(matched==0):
                                        strings.append(j)
                                        # print()
                    print(strings)
                    # for i, s1 in enumerate(strings):
                    #      is_similar = False
                    #      for j, s2 in enumerate(strings):
                    #           if i != j:
                    #               similarity_ratio = 
                    #                if similarity_ratio > 0.5:
                    #                     is_similar = True
                    #                     break
                    #      if not is_similar:
                    #           unique_strings.append(s1)
                    return JsonResponse({'success':True,'data':strings })
               except Exception as err:
                    print(err)
                    return JsonResponse({'error':'Some Error Has Occured!', 'success':False})         
def execute_sql_command(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        # If your SQL command is a SELECT statement and you want to retrieve the results:
        results = cursor.fetchall()
        # Process the results as needed
        return results