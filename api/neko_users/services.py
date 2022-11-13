from .models import User
from .serializers import UserSerializer
from rest_framework import serializers, status
from django.contrib.auth.hashers import make_password


def save_user(data, id: int = None):
    if id is not None:
        ticket = User.objects.get(pk=id)
        serializer = UserSerializer(ticket, data=data, partial=True)
    else:
        serializer = UserSerializer(data=data)
    if not serializer.is_valid():
        raise serializers.ValidationError(serializer.errors, status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return serializer.data
