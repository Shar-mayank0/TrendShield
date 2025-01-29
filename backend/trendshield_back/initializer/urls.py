from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_test, name='home_test'),
    path('get_url/', views.handle_get_url, name='get_url'),
]
