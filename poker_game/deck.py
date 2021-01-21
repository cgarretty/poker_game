
class Card:
    pretty_ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    pretty_suits = "♣ ♦ ♥ ♠".split(" ")

    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit

    def __repr__(self):
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
    ranks = [n for n in range(13)]
    suits = [n for n in range(4)]

    def __init__(self):
        self._cards = [Card(rank, suit) for suit in self.suits
                       for rank in self.ranks]

    def __repr__(self):
        return "Deck()"

    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]
