from ..poker.deck import Card, Hand
from ..poker.poker import Player


def test_hand_rank_pair():
    hand = Hand([Card(0, 0), Card(0, 1), Card(2, 2), Card(3, 3), Card(4, 1)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Pair", Card(0, 0))


def test_hand_rank_two_pair():
    hand = Hand([Card(0, 0), Card(0, 1), Card(2, 2), Card(2, 3), Card(4, 1)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Two Pair", Card(2, 2))


def test_hand_rank_three_of_a_kind():
    hand = Hand([Card(0, 0), Card(0, 1), Card(0, 2), Card(3, 3), Card(4, 1)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Three of a Kind", Card(0, 0))


def test_hand_rank_straight():
    hand = Hand([Card(0, 0), Card(1, 1), Card(2, 2), Card(3, 3), Card(4, 1)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Straight", Card(4, 1))


def test_hand_rank_flush():
    hand = Hand([Card(0, 0), Card(2, 0), Card(4, 0), Card(6, 0), Card(8, 0)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Flush", Card(8, 0))


def test_hand_rank_full_house():
    hand = Hand([Card(0, 0), Card(0, 1), Card(0, 2), Card(3, 3), Card(3, 1)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Full House", Card(0, 0))


def test_hand_rank_four_of_a_kind():
    hand = Hand([Card(0, 0), Card(0, 1), Card(0, 2), Card(0, 3), Card(4, 1)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Four of a Kind", Card(0, 0))


def test_hand_rank_straight_flush():
    hand = Hand([Card(0, 0), Card(1, 0), Card(2, 0), Card(3, 0), Card(4, 0)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Straight Flush", Card(4, 0))


def test_hand_rank_royal_flush():
    hand = Hand([Card(8, 0), Card(9, 0), Card(10, 0), Card(11, 0), Card(12, 0)])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Royal Flush", Card(12, 0))


def test_two_card_hand():
    hand = Hand([Card(0, 0), Card(1, 1), ])
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("High Card", Card(1, 1))


def test_seven_card_hand():
    hand = Hand(
        [
            Card(0, 0),
            Card(0, 1),
            Card(8, 0),
            Card(9, 0),
            Card(10, 0),
            Card(11, 0),
            Card(12, 0),
        ]
    )
    player = Player()
    player.hand = hand

    assert player.evaluate_hand() == ("Royal Flush", Card(12, 0))
