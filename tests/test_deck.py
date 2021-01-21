from poker_game import deck
import pytest


def test_card_string():
    card = deck.Card(12, 3)  # A♠
    assert str(card) == "Card(rank='A', suit='♠')"


def test_card_equality():
    card_1, card_2 = deck.Card(12, 3) * 2
    assert card_1 == card_2

    card_1.rank = 1
    assert card_1 != card_2


def test_card_inequality():
    assert deck.Card(0, 1) > deck.Card(0, 0)
    assert deck.Card(0, 1) < deck.Card(1, 0)


def test_deck_string():
    cards = deck.Deck()
    assert str(cards) == "Deck()"


def test_deck_length():
    cards = deck.Deck()
    assert len(cards) == 52


def test_deck_shuffle():
    cards = deck.Deck()
    cards.shuffle()
    assert cards[-1] != deck.Card(12, 3)


def test_deck_deal():
    cards = deck.Deck()
    hand = cards.deal(2)
    assert len(hand) == 2
    assert hand[0] not in cards


def test_deck_deal_multiple_players():
    cards = deck.Deck()
    p1, p2 = cards.deal(2, hands=2)
    assert p1
    assert p2


def test_deck_deal_errors():
    cards = deck.Deck()
    with pytest.raises(ValueError, match=r"> 0"):
        cards.deal(2, hands=0)
    with pytest.raises(TypeError, match=r"int"):
        cards.deal(2, hands="0")
