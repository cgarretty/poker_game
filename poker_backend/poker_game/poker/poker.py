from . import deck


class HoldEmTable:
    def __init__(self, buy_in, blinds, max_seats):
        self.buy_in = buy_in
        self.blinds = blinds
        self.max_seats = max_seats
        self.seats = [Seat(buy_in) for _ in range(max_seats)]

    def __repr__(self):
        return "HoldEmTable({buy_in}, {blinds}, {max_seats})".format(
            **self.__dict__
        )

    def get_player_list(self):
        # check previous state for positions
        self.players_in_game = [seat.player for seat in self.seats if seat.player]


class Player:
    def __init__(self, name=None, bank_roll=0):
        self.name = name
        self._bank_roll = bank_roll

    @property
    def bank_roll(self):
        return self._bank_roll

    @bank_roll.setter
    def bank_roll(self, value):
        if value < 0:
            raise ValueError("Player's bankroll can't be negative")

        self._bank_roll = value

    def __repr__(self):
        return "HoldEmPlayer({name}, {_bank_roll})".format(
            **self.__dict__
        )

    @property
    def hand(self, hand) -> deck.Hand:
        self._hand = hand

    @hand.setter
    def hand(self, hand) -> None:
        self._hand = hand

    @hand.deleter
    def hand(self, hand) -> None:
        del self._hand

    def fold(self):
        del self._hand

    def evaluate_hand(self):
        cards = sorted(self._hand.cards)

        straight = False
        flush = False
        pairs = []
        three_of_a_kind = None
        four_of_a_kind = None

        # Check for flush
        for suit in range(4):
            suit_cards = [card for card in cards if card.suit == suit]
            if len(suit_cards) >= 5:
                flush = True
                cards = suit_cards
                break

        # Check for straight
        straight_cards = [cards[-1]]
        for i in range(len(cards)-1, -1, -1):
            if cards[i].rank == straight_cards[-1].rank - 1:
                straight_cards.append(cards[i])
            elif cards[i].rank != straight_cards[-1].rank:
                straight_cards = [cards[i]]
            if len(straight_cards) == 5:
                straight = True
                break

        # Aces Low
        low_rank_straight = [card.rank for card in straight_cards] == [0, 1, 2, 3]
        has_ace = cards[-1].rank == 12
        if low_rank_straight and has_ace:

            straight_cards.insert(0, cards[0])
            straight = True

        # Check for pairs, three of a kind, and four of a kind
        for rank in range(13):
            rank_cards = [card for card in cards if card.rank == rank]
            if len(rank_cards) == 2:
                pairs.append(rank_cards)
            elif len(rank_cards) == 3:
                three_of_a_kind = rank_cards
            elif len(rank_cards) == 4:
                four_of_a_kind = rank_cards

        # Determine hand ranking
        if straight and flush:
            if straight_cards[0].rank == 12:
                return "Royal Flush", straight_cards[0]
            return "Straight Flush", straight_cards[0]
        if four_of_a_kind:
            return "Four of a Kind", four_of_a_kind[0]
        if three_of_a_kind and len(pairs) >= 1:
            return "Full House", three_of_a_kind[0]
        if flush:
            return "Flush", cards[-1]
        if straight:
            return "Straight", straight_cards[0]
        if three_of_a_kind:
            return "Three of a Kind", three_of_a_kind[0]
        if len(pairs) == 2:
            return "Two Pair", max(pairs[0][0], pairs[1][0])
        if len(pairs) == 1:
            return "Pair", pairs[0][0]

        return "High Card", cards[0]

class Seat:
    def __init__(self, buy_in):
        self.buy_in = buy_in

    @property
    def player(self) -> Player:
        return self._player

    @player.setter  # player takes a seat
    def player(self, player):
        player.bank_roll -= self.buy_in
        player.stack = self.buy_in
        self._player = player

    @player.deleter  # player leaves game
    def player(self):
        self._player.bank_roll += self._player.stack
        self._player = None

    @property
    def is_playing(self) -> bool:
        return self.position

    # @position.setter
    # def position(self, position) -> None:
    #     self.position = position
    #
    # @position.deleter
    # def position(self, position) -> None:
    #     del self.position
