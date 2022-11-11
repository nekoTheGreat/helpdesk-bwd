from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import AccountUserSerializer
from .models import AccountUser
from .services import save_account_user


@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'POST':
        return store(request)
    tickets = AccountUser.objects.all()
    serializer = AccountUserSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def get_account_user(request, id: int):
    if request.method == 'PUT':
        return store(request, id)
    try:
        data = None
        ticket = AccountUser.objects.get(pk=id)
        if request.method == 'DELETE':
            ticket.delete()
        else:
            serializer = AccountUserSerializer(ticket)
            data = serializer.data
        response_status = status.HTTP_200_OK
    except AccountUser.DoesNotExist:
        response_status = status.HTTP_404_NOT_FOUND
    return Response(data=data, status=response_status)


def store(request, id: int = None):
    try:
        data = save_account_user(request.data, id)
        return Response(data, status=status.HTTP_200_OK)
    except AccountUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
