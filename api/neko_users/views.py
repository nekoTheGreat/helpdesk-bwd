from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions
from rest_framework import generics
from knox.views import LoginView
from neko_users.serializers import AuthTokenSerializer
from .serializers import UserSerializer
from .models import User
from .services import save_user
from .permissions import UserOwnedPermission


class UserListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    lookup_url_kwarg = 'id'
    serializer_class = UserSerializer

class UserRUDView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [UserOwnedPermission]
    queryset = User.objects.all()
    lookup_url_kwarg = 'id'
    serializer_class = UserSerializer

    def perform_update(self, serializer):
        save_user(self.request.data, self.kwargs.get(self.lookup_url_kwarg))

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)

class CustomKnoxLoginView(LoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super().post(request, format)