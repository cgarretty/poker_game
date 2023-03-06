from rest_framework import serializers


class CardSerializer(serializers.Serializer):
    rank = serializers.CharField()
    suit = serializers.CharField()


class HandSerializer(serializers.Serializer):
    hand = serializers.ListField(child=CardSerializer())

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
