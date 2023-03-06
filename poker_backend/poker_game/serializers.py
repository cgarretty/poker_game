from rest_framework import serializers

from .poker import deck, poker


class CardSerializer(serializers.Serializer):
    rank = serializers.CharField()
    suit = serializers.CharField()


class HandSerializer(serializers.Serializer):
    hand = serializers.ListField(child=CardSerializer())

    def create(self, validated_data):
        cards = [deck.Card(**card_data) for card_data in validated_data['hand']]

        return deck.Hand(cards=cards)

    def to_representation(self, instance):
        return {
            'hand': [
                {
                    'rank': card.pretty_rank,
                    'suit': card.pretty_suit,
                }
                for card in instance.cards
            ]
        }


class HandEvalSerializer(serializers.Serializer):
    ranking = serializers.CharField()
    high_card = CardSerializer()

    def to_representation(self, instance):
        return {
            "ranking": instance["ranking"],
            "high_card": {
                'rank': instance["high_card"].pretty_rank,
                'suit': instance["high_card"].pretty_suit,
            },
        }
