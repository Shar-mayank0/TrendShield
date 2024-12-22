from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ProductURLData



def handle_get_url (request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prod_ID = data.get('prod_ID')
            prod_URL = data.get('prod_URL')
            site = data.get('site')
            if prod_ID is None or prod_URL is None or site is None:
                return JsonResponse({'error': 'Please provide all required fields'}, status=400)
            
            ProductURLData.objects.create(
                prod_ID=prod_ID,
                prod_URL=prod_URL,
                site=site,
                )
            return JsonResponse({'message': 'URL Recieved!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        except:
            return JsonResponse({'error': 'Something went wrong'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid Request'}, status=400)

