from .models import Ticket
from rest_framework import serializers, status
from .serializers import TicketSerializer


def save_ticket(data, id: int = None):
    if id is not None:
        ticket = Ticket.objects.get(pk=id)
        serializer = TicketSerializer(ticket, data=data)
    else:
        serializer = TicketSerializer(data=data)
    if not serializer.is_valid():
        raise serializers.ValidationError(serializer.errors, status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return serializer.data
