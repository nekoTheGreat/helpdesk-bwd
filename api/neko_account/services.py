from .models import AccountUser
from .serializers import AccountUserSerializer
from rest_framework import serializers, status


def save_account_user(data, id: int = None):
    if id is not None:
        ticket = AccountUser.objects.get(pk=id)
        serializer = AccountUserSerializer(ticket, data=data)
    else:
        serializer = AccountUserSerializer(data=data)
    if serializer.is_valid():
        raise serializers.ValidationError(serializer.errors, status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return serializer.data
