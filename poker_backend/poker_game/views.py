from rest_framework.decorators import api_view
from rest_framework.response import Response

from .poker import deck

from .serializers import HandSerializer


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})


@api_view(['POST'])
def deal_hand(request):
    # Find a new deck, shuffle and deal it.
    french_deck = deck.FrenchDeck()
    french_deck.shuffle()
    hand = french_deck.deal(2)

    # serialize the hand
    serializer = HandSerializer(hand)

    return Response(serializer.data)
