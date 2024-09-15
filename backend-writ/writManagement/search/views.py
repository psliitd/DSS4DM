from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.paginator import Paginator
import pymongo
import json
from bson import json_util, ObjectId
# Create your views here.
myclient = pymongo.MongoClient("mongodb+srv://dss:P8NKXqiTp3tN3vNt@dss-search.ujjrk5w.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["dss-search"]
mycol=mydb['search_new3']
@require_http_methods(['GET'])
def searchQuery(request):
    q= request.GET.get('q')
    page= int(request.GET.get('page'))
    skip_count = (page - 1) * 50
    print(skip_count)
    result = mycol.aggregate([
        {
            '$search': {
                'index': 'default-1', 
                'text': {
                    'query': q, 
                    'path': 'body', 
                    'fuzzy': {
                        'maxEdits': 2
                    }
                },
            }
        },
        {
            '$skip': skip_count
        },
        {
            '$limit':50
        }
        , 
        {
            '$project': {
                '_id': 1, 
                'body': 1, 
                'title': 1,
                'link':1,
                'department':1,
                'sector':1,
                'extra_keyword':1,
                'count':1, 
                'score': {
                    '$meta': 'searchScore'
                }
            }
        }
    ])
    r=[]
    for i in result:
        print(i)
        r.append(i)
    d= json.loads(json_util.dumps(r))
    paginator= Paginator( d,100)
    page_obj = paginator.get_page(page)
    # print(page_obj)
    res_data=list(page_obj.object_list)           
    return JsonResponse({'success':True,'data':{'page': 1,
     'total_pages': paginator.num_pages,'content':res_data} })
    # return JsonResponse(d,safe=False)