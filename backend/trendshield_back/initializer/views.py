from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .tasks.scraping import test_worker
import json

import test
from .models import ProductURLData
from .tasks import scrape_data

@csrf_exempt
def home_test(request):
    return JsonResponse({'message': 'Hello, World! from initializer'})

@csrf_exempt
def workertest(request):
    if request.method == 'GET':
        test_worker.delay()
        return JsonResponse({'message': 'Worker triggering from initializer/views.py'})
    return JsonResponse({'error': 'Invalid Request'}, status=400)



def handle_get_url(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prod_ID = data.get('prod_ID')
            prod_URL = data.get('prod_URL')
            site = data.get('site')

            if not all([prod_ID, prod_URL, site]):
                return JsonResponse({'error': 'Please provide all required fields'}, status=400)

            ProductURLData.objects.create(prod_ID=prod_ID, prod_URL=prod_URL, site=site)

            # Step 1: Trigger Scraping Worker
            scraping_task = scrape_data()
            print(scraping_task)

            # Step 2: Chain ML Processing After Scraping


            # Step 3: Chain DB Storage After Processing


            # Chain Tasks Together (Executes Sequentially)
            workflow = (scraping_task).apply_async()

            return JsonResponse({'message': 'Scraping pipeline started', 'task_id': workflow.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
