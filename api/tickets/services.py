from .models import Ticket
from rest_framework import status
from rest_framework.response import Response
from .serializers import TicketSerializer


def save_ticket(data, id: int = None):
    if id is not None:
        ticket = Ticket.objects.get(pk=id)
        serializer = TicketSerializer(ticket, data=data)
    else:
        serializer = TicketSerializer(data=data)
    serializer.save()
    return serializer.data
