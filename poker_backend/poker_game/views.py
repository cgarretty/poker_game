from rest_framework.decorators import api_view
from rest_framework.response import Response

from .poker import deck, poker

from .serializers import HandSerializer, HandEvalSerializer


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


@api_view(['POST'])
def evaluate_hand(request):

    serializer = HandSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    hand = serializer.save()
    print(hand[0].rank, hand[1].rank)
    player = poker.Player()
    player.hand = hand
    ranking, high_card = player.evaluate_hand()

    # serialize
    serializer = HandEvalSerializer(
        {
            "ranking": ranking,
            "high_card": high_card,
        }
    )

    return Response(serializer.data)
