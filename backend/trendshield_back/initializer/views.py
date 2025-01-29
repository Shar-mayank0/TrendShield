import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .tasks import scrape_data  # Importing the task correctly
from .models import ProductURLData

@csrf_exempt
def home_test(request):
    return JsonResponse({'message': 'Hello, World! from initializer'})

@csrf_exempt
def handle_get_url(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prod_ID = data.get('prod_ID')
            prod_URL = data.get('prod_URL')
            site = data.get('site')

            # Ensure all fields are provided
            if not all([prod_ID, prod_URL, site]):
                return JsonResponse({'error': 'Please provide all required fields'}, status=400)

            # Step 1: Trigger Scraping Worker
            # Use apply_async to trigger the Celery task asynchronously
            result = scrape_data.apply_async(args=[prod_URL, prod_ID, site])
            result.get(timeout=30)

            # Step 2: Chain ML Processing After Scraping (You can chain another task here if needed)
            # You can use Celery's `link` or `link_error` to chain additional tasks to handle the result

            # Step 3: Chain DB Storage After Processing (Chain if needed)

            return JsonResponse({'message': 'Scraping pipeline started', 'task_id': result.id}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
