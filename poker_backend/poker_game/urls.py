from django.urls import path
from .views import hello_world, deal_hand

urlpatterns = [
    path('api/hello/', hello_world, name='hello'),
    path('api/deal_hand', deal_hand, name='deal_hand')
]
