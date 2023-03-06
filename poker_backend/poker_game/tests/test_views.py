from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase


class HelloViewTestCase(APITestCase):
    def test_hello_view(self):
        url = '/api/hello/'
        headers = {'Origin': 'http://localhost:3000'}
        response = self.client.get(url, format='json', **headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Hello, world!')


class HandViewTestCase(APITestCase):
    def test_hand_view(self):
        url = reverse('deal_hand')
        data = {
            'hand': [
                {'rank': '10', 'suit': '♥'},
                {'rank': '5', 'suit': '♦'}
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, data)