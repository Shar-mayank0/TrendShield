import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .tasks import scrape_data, ml_analysis  # Importing the tasks correctly
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
            result = scrape_data.apply_async(args=[prod_URL, prod_ID, site])
            try:
                scraping_response, scraping_data = result.get(timeout=30)
                if scraping_response and scraping_data:
                    # Trigger ML analysis task here
                    ml_result = ml_analysis.apply_async(args=[scraping_data, prod_ID])
                    return JsonResponse({'message': 'Scraping completed, ML analysis started', 'data': scraping_response}, status=200)
                else:
                    return JsonResponse({'error': 'Empty response from scraping task'}, status=400)
            except Exception as e:
                return JsonResponse({'error': f'No response from the scraping task: {str(e)}'}, status=500)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
