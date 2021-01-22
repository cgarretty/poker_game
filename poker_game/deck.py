import random


class Card:
    pretty_ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    pretty_suits = "♣ ♦ ♥ ♠".split(" ")

    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit

    def __repr__(self):
        print(self.rank, self.suit)
        return "Card(rank='{}', suit='{}')".format(
            self.pretty_ranks[self.rank],
            self.pretty_suits[self.suit]
        )

    def __eq__(self, other):
        """Checks whether self and other have the same rank and suit.
        returns: boolean
        """
        return self.suit == other.suit and self.rank == other.rank

    def __lt__(self, other):
        """Compares this card to other, first by rank, then suit.
        returns: boolean
        """
        t1 = self.rank, self.suit
        t2 = other.rank, other.suit
        return t1 < t2

    def __mul__(self, other):
        return [Card(self.rank, self.suit) for _ in range(other)]


class Deck:
    def __init__(self):
        self._cards = []

    def __repr__(self):
        return "Deck()"

    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]

    def add_cards(self, card, *args):
        """Add a card or list of cards to this deck."""
        self._cards.append(card)
        for c in args:
            self._cards.append(c)
        return self._cards

    def shuffle(self):
        """Shuffles the cards in this deck."""
        random.shuffle(self._cards)

    def deal(self, n, hands=1):
        if hands == 1:
            return [self._cards.pop() for _ in range(2)]
        elif hands > 1:
            return [[self._cards.pop() for _ in range(2)] for _ in range(hands)]
        elif not isinstance(hands, int):
            raise TypeError("hands must be int")
        else:
            raise ValueError("hands must be > 0")


class FrenchDeck(Deck):
    ranks = [n for n in range(13)]
    suits = [n for n in range(4)]

    def __init__(self):
        self._cards = [Card(r, s) for s in range(4) for r in range(13)]

    def __repr__(self):
        return "FrenchDeck()"


class Hand(Deck):
    """Represents a hand of playing cards."""

    def __init__(self, cards, label=''):
        self._cards = cards
        self.label = label

    def __repr__(self):
        return "Hand(label='{}')".format(self.label)
