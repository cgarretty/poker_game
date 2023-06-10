import json

from django.urls import reverse
from django.core.cache import cache

from rest_framework import status
from rest_framework.test import APITestCase

from ..poker import deck


class HelloViewTestCase(APITestCase):
    def test_hello_view(self):
        url = '/api/hello/'
        headers = {'Origin': 'http://localhost:3000'}
        response = self.client.get(url, format='json', **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Hello, world!')


class HandEvalViewTestCase(APITestCase):
    def test_hand_view(self):
        url = reverse('evaluate_hand')
        data = {
            "hand": [
                {"rank": '10', "suit": '♥'},
                {"rank": '5', "suit": '♦'},
            ],
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['ranking'], "High Card")


class DeckTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('deal_hand')

        self.deck_id = 'test_deck'
        self.deck = deck.FrenchDeck()

        self.deck.shuffle()

        cache.set(self.deck_id, self.deck)

    def test_deck_is_shuffled(self):
        cached_deck = cache.get(self.deck_id)
        new_deck = deck.FrenchDeck()

        self.assertNotEqual(new_deck.cards, cached_deck.cards)

    def test_get_deck(self):
        # call API endpoint to get deck with deck_id
        response = self.client.post(
            self.url,
            {'deck_id': self.deck_id, 'n_cards': 3},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert that the deck was retrieved from the cache
        self.assertEqual(response.data['deck_id'], self.deck_id)
        self.assertEqual(len(response.data['hand']), 3)

        # assert that the cards in the hand are removed from the deck
        cached_deck = cache.get(self.deck_id)
        for card in response.data['hand']:
            self.assertNotIn(deck.Card(**card), cached_deck.cards)
