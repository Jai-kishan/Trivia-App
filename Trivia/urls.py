from django.urls import path
from .views import *


urlpatterns =[
    path('', get_user_name, name='user_name'),
    path('welcome/<str:name>/', welcome_user, name='welcome_page'),
    path('history/<int:pk>/', user_histroy, name='user_history'),
]