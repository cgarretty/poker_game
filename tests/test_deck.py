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


def test_deck_add_card():
    cards = deck.Deck()


def test_deck_shuffle():
    cards = deck.Deck()
    cards.add_cards(*[deck.Card(r, s) for s in range(4) for r in range(13)])
    assert cards[-1] == deck.Card(12, 3)
    cards.shuffle()
    assert cards[-1] != deck.Card(12, 3)


def test_deck_deal():
    cards = deck.Deck()
    cards.add_cards(*[deck.Card(r, s) for s in range(4) for r in range(13)])
    hand = deck.Hand(cards.deal(2))
    print(hand._cards)
    assert len(hand) == 2
    assert hand[0] not in cards


def test_deck_deal_multiple_players():
    cards = deck.Deck()
    cards.add_cards(*[deck.Card(r, s) for s in range(4) for r in range(13)])
    p1, p2 = [deck.Hand(c) for c in cards.deal(2, hands=2)]
    assert len(p1) == 2
    assert len(p2) == 2


def test_deck_deal_errors():
    cards = deck.Deck()
    cards.add_cards(*[deck.Card(r, s) for s in range(4) for r in range(13)])
    with pytest.raises(ValueError, match=r"> 0"):
        cards.deal(2, hands=0)
    with pytest.raises(TypeError, match=r"int"):
        cards.deal(2, hands="0")


def test_french_deck_length():
    cards = deck.FrenchDeck()
    assert len(cards) == 52
