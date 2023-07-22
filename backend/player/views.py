from rest_framework.decorators import api_view
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests


@api_view(['POST'])
def google_token_verification(request):
    print(request.data)
    token = request.data.get('access_token')
    try:
        # Verify the token with Google
        id_info = id_token.verify_oauth2_token(token, requests.Request())
        print(id_info)
        return Response({'message': 'User registered successfully'})
    except ValueError:
        # Token verification failed
        return Response({'error': 'Invalid token'}, status=400)
