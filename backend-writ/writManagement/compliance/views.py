from django.views.decorators.http import require_http_methods
from .models import compliance
from django.http import JsonResponse
from django.db import models
from django.core.paginator import Paginator
from schedule.models import meeting
import datetime
from django.contrib.auth.models import User
from common.models import message,document
import json
# Create your views here.
@require_http_methods(["POST"])
def createCompliance(request):
        try:
            # compliance.objects.all().delete()
            compliance_data=json.loads(request.body)
            compliance_data['created_by']=request.user
            compliance_data['is_meeting_related']= compliance_data['doableType']!="compliance"
            compliance_data['reminder_period']=datetime.timedelta(days=compliance_data['reminder_period'])
            assignedTo=compliance_data['assignedTo']
            text=compliance_data['subject']
            compliance_data['description']=text
            # compliance_data['related_meeting']=meeting.objects.all()[0]
            user_assigned=User.objects.get(pk=assignedTo)
            relatedDocumentLink= compliance_data['relatedDocumentLink']
            # compliance_data.pop('assignedBy')
            compliance_data.pop('doableType')                
            compliance_data.pop('assignedTo')
            compliance_data.pop('subject')
            compliance_data.pop('relatedDocumentLink')                
            compliance_obj=compliance.objects.create(**compliance_data)
            # User.objects.get(pk=assignedTo)
            msg=message.objects.create(message_text=text,message_by=request.user, message_to=user_assigned)
            compliance_obj.messages.add(msg)
            compliance_obj.related_users.add(user_assigned)
            compliance_obj.save()
            for i in relatedDocumentLink:
                 doc=document.objects.create(owner=request.user,document_link=i,document_type='compliance',file_name='Test Doc 1')
                 compliance_obj.document.add(doc)
                 compliance_obj.save()
            return JsonResponse({'success':True , 'message':'Created Compliance!'})
        except Exception as err:
            print(err)
            return JsonResponse({'error':'Some Error Has Occured!', 'success':False})

@require_http_methods(["GET","POST"])
def getCompliance(request):
          try:
               page=request.GET.get('page1')
               print(page)
               crime_situations= compliance.objects.all().values()
               for i in crime_situations:
                     print(i)
               paginator= Paginator( crime_situations,5)
               page_obj = paginator.get_page(page)
               print(page_obj)
               res_data=list(page_obj.object_list)
               return JsonResponse({'success':True,'data':{'page': 1,
     'total_pages': paginator.num_pages,'content':res_data} })
          except Exception as err:
               print(err)
               return JsonResponse({'error':'Some Error Has Occured!', 'success':False})