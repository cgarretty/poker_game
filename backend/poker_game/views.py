import uuid
import logging

from django.core.cache import cache

from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response

from .poker import deck, poker
from poker_game import serializers
from player.auth import JSONWebTokenAuthentication

logger = logging.getLogger(__name__)


@api_view(["POST"])
@authentication_classes([JSONWebTokenAuthentication])
def create_game_table(request):
    serializer = serializers.GameTableSerializer(data=request.data)
    serializer.is_valid(raise_exception=True, data={"created_by": request.user})
    serializer.save(created_by=request.user)

    return Response(serializer.data)


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})


@api_view(["POST"])
def deal_hand(request):
    deck_id = request.data.get("deck_id")

    logger.debug(request.data)

    # Find a new deck, shuffle and deal it.
    if deck_id and deck_id in cache:
        french_deck = cache.get(deck_id)
    else:
        deck_id = deck_id if deck_id else uuid.uuid4()
        french_deck = deck.FrenchDeck()
        french_deck.shuffle()

    hand = french_deck.deal(request.data["n_cards"])

    # cache the deck
    cache.set(deck_id, french_deck)

    # serialize the hand
    serializer = serializers.HandSerializer({"hand": hand, "deck_id": deck_id})

    return Response(serializer.data)


@api_view(["POST"])
def evaluate_hand(request):
    serializer = serializers.HandSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    hand = serializer.save()

    player = poker.Player()
    player.hand = hand

    if not hand:
        return Response()

    ranking, high_card = player.evaluate_hand()

    # serialize
    serializer = serializers.HandEvalSerializer(
        {
            "ranking": ranking,
            "high_card": high_card,
        }
    )

    return Response(serializer.data)
