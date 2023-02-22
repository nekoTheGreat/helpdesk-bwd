from .models import Ticket
from rest_framework import serializers, status
from .serializers import TicketSerializer
from neko_commons.models import Attachment

def save_ticket(data, id: int = None):
    if id is not None:
        ticket = Ticket.objects.get(pk=id)
        serializer = TicketSerializer(ticket, data=data, partial=True)
    else:
        serializer = TicketSerializer(data=data)
    if not serializer.is_valid():
        raise serializers.ValidationError(serializer.errors, status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return serializer.data

def add_attachment(ticket, data):
    defaults = {"disk_type": 'local'}
    obj = Attachment({**defaults, **data})
    obj.type = 'ticket_images'
    obj.identifier = ticket.get('id')
    obj.save()