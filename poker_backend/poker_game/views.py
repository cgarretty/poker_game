from rest_framework.decorators import api_view
from rest_framework.response import Response

from .poker import deck

from .serializers import HandSerializer


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})


@api_view(['POST'])
def deal_hand(request):
    hand = deck.Hand(
        cards=[
            deck.Card(rank='10', suit='♥'),
            deck.Card(rank='5', suit='♦')
        ]
    )
    serializer = HandSerializer(hand)

    return Response(serializer.data)
