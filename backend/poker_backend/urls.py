from django.contrib import admin
from django.urls import path, include
from player.views import google_token_verification

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("poker_game.urls")),
    # player auth
    path("player/auth/google/", google_token_verification),
]
