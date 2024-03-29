import random


class Card:
    pretty_ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    pretty_suits = "♣ ♦ ♥ ♠".split(" ")

    def __init__(self, rank, suit):
        if isinstance(rank, int) and isinstance(suit, int):
            self.rank = rank
            self.suit = suit

            self.pretty_rank = self.pretty_ranks[self.rank]
            self.pretty_suit = self.pretty_suits[self.suit]

        elif isinstance(rank, str) and isinstance(suit, str):
            self.pretty_rank = rank
            self.pretty_suit = suit

            self.rank = self.pretty_ranks.index(self.pretty_rank)
            self.suit = self.pretty_suits.index(self.pretty_suit)

        else:
            raise TypeError("Yo, something is fucked.")

    def __repr__(self):
        return "Card(rank='{}', suit='{}')".format(
            self.pretty_rank,
            self.pretty_suit,
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
        self.cards = []

    def __repr__(self):
        return "Deck()"

    def __len__(self):
        return len(self.cards)

    def __getitem__(self, position):
        return self.cards[position]

    def __eq__(self, other):
        return self.cards == other.cards

    def __add__(self, other):
        c = self.cards + other.cards
        d = Deck()
        d.add_cards(*c)
        return d

    def add_cards(self, card, *args):
        """Add a card or list of cards to this deck."""
        self.cards.append(card)
        for c in args:
            self.cards.append(c)
        return self.cards

    def shuffle(self):
        """Shuffles the cards in this deck."""
        random.shuffle(self.cards)

    def deal(self, n, hands=1):
        if hands == 1:
            return Hand([self.cards.pop() for _ in range(n)])
        elif hands > 1:
            return (
                Hand([self.cards.pop() for _ in range(n)])
                for _ in range(hands)
            )
        elif not isinstance(hands, int):
            raise TypeError("hands must be int")
        else:
            raise ValueError("hands must be > 0")


class FrenchDeck(Deck):
    ranks = [n for n in range(13)]
    suits = [n for n in range(4)]

    def __init__(self):
        self.cards = [Card(r, s) for s in range(4) for r in range(13)]

    def __repr__(self):
        return "FrenchDeck()"


class Hand(Deck):
    """Represents a hand of playing cards."""

    def __init__(self, cards, label=None):
        self.cards = cards
        self.label = label

    def __repr__(self):
        return "Hand({cards}, label={label})".format(**self.__dict__)
