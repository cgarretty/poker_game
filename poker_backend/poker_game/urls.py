from django.urls import path
from .views import hello_world, deal_hand, evaluate_hand

urlpatterns = [
    path('api/hello/', hello_world, name='hello'),
    path('api/player/deal_hand', deal_hand, name='deal_hand'),
    path('api/player/evaluate_hand', evaluate_hand, name='evaluate_hand')
]
