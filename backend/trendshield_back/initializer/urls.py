from django.urls import path
from . import views

urlpatterns = [
    path('', views.handle_get_url, name='handle_get_url'),
]
