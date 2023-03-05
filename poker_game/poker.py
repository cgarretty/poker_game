from poker_game import deck


class Seat:
    def __init__(self, buy_in):
        self.buy_in = buy_in

    @property
    def player(self) -> HoldEmPlayer:
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
    def is_playing(self) -> Bool:
        return self.position

    @position.setter
    def position(self, position) -> None:
        self.position = position

    @position.deleter
    def position(self, position) -> None:


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



class HoldEmPlayer:
    def __init__(self, name, bank_roll=0):
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

    def fold(self):
        del self._hand
