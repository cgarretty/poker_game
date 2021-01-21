from poker_game import deck


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
