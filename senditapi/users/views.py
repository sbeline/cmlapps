from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import CustomUser
from .serializers import UserSerializer
from .serializers import UserRegistrationSerializer  # Assuming you have a custom serializer for registration
from oauth2_provider.models import Application
from oauth2_provider.settings import oauth2_settings
from oauth2_provider.views.mixins import OAuthLibMixin


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer  # Use your custom registration serializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Log the user in after registration
        user = serializer.instance
        login(request, user)


        return Response(status=status.HTTP_201_CREATED, headers=headers)


@permission_classes([permissions.IsAuthenticated])
class UserLoginView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Invalid credentials"}, status=400)

@permission_classes([permissions.IsAuthenticated])
class UserProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
