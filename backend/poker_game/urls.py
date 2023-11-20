from django.urls import path
from .views import hello_world, deal_hand, evaluate_hand, create_game_table

urlpatterns = [
    path("api/hello/", hello_world, name="hello"),
    path("api/deck/deal_hand", deal_hand, name="deal_hand"),
    path("api/player/evaluate_hand", evaluate_hand, name="evaluate_hand"),
    path("api/game/", create_game_table, name="create_game_table"),
]
