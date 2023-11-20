from rest_framework import serializers
from poker_game.models import GameTable
from .poker import deck, poker


class GameTableSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = GameTable
        fields = (
            "uuid",
            "created_by",
            "created_at",
            "updated_at",
        )

    def is_valid(self, data=None):
        context = {"created_by": data}
        val = super().is_valid(data, context=context)

        return data


class CardSerializer(serializers.Serializer):
    rank = serializers.CharField()
    suit = serializers.CharField()


class HandSerializer(serializers.Serializer):
    hand = serializers.ListField(child=CardSerializer())
    deck_id = serializers.CharField(required=False)

    def create(self, validated_data):
        cards = [deck.Card(**card_data) for card_data in validated_data["hand"]]
        deck_id = validated_data.get("deck_id")

        return deck.Hand(cards=cards, label=deck_id)

    def to_representation(self, instance):
        return {
            "deck_id": instance["deck_id"],
            "hand": [
                {
                    "rank": card.pretty_rank,
                    "suit": card.pretty_suit,
                }
                for card in instance["hand"].cards
            ],
        }


class HandEvalSerializer(serializers.Serializer):
    ranking = serializers.CharField()
    high_card = CardSerializer()

    def to_representation(self, instance):
        return {
            "ranking": instance["ranking"],
            "high_card": {
                "rank": instance["high_card"].pretty_rank,
                "suit": instance["high_card"].pretty_suit,
            },
        }
