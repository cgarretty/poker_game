from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from google.oauth2 import id_token
from google.auth.transport import requests

from .models import User
from .auth import JSONWebTokenAuthentication


@api_view(["POST"])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def google_token_verification(request):
    """Verify the token with Google"""
    return Response({"message": "User registered successfully"})
