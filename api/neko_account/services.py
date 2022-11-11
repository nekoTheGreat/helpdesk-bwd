from .models import AccountUser
from .serializers import AccountUserSerializer


def save_account_user(data, id: int = None):
    if id is not None:
        ticket = AccountUser.objects.get(pk=id)
        serializer = AccountUserSerializer(ticket, data=data)
    else:
        serializer = AccountUserSerializer(data=data)
    serializer.save()
    return serializer.data
