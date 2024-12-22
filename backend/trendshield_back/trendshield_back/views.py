from django.http import JsonResponse

def home(request):
    return JsonResponse({'message': 'Hello, World!'})

def url_recieved(request):
    return JsonResponse({'message': 'URL Recieved!'})

