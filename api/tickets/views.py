from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import TicketSerializer
from .models import Ticket
from .services import save_ticket, add_attachment
from neko_commons.models import Attachment
from uuid import uuid4
import os
from django.conf import settings


@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'POST':
        return store(request)
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def get_ticket(request, id: int):
    if request.method == 'PUT':
        return store(request, id)
    try:
        data = None
        ticket = Ticket.objects.get(pk=id)
        if request.method == 'DELETE':
            ticket.delete()
        else:
            serializer = TicketSerializer(ticket)
            data = serializer.data
        response_status = status.HTTP_200_OK
    except Ticket.DoesNotExist:
        response_status = status.HTTP_404_NOT_FOUND
    return Response(data=data, status=response_status)

@api_view(['DELETE'])
def delete_ticket_photo(request, ticket_id, photo_id):
    response_status = status.HTTP_200_OK
    try:
        ticket = Ticket.objects.get(pk=ticket_id)
        photo = ticket.photos.filter(id=photo_id).first()
        if photo is None:
            raise Attachment.DoesNotExist
        photo.delete()
        data = {"message": "Photo deleted"}
    except Ticket.DoesNotExist as e:
        data = {"error": "Ticket does not exists"}
        response_status = status.HTTP_404_NOT_FOUND
    except Attachment.DoesNotExist as e:
        data = {"error": "Photo does not exists"}
        response_status = status.HTTP_404_NOT_FOUND

    return Response(data=data, status=response_status)

def store(request, id: int = None):
    try:
        data = save_ticket(request.data, id)
        items = processAttachments(request.FILES)
        for item in items:
            add_attachment(data, item)

        return Response(data, status=status.HTTP_200_OK)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def processAttachments(files):
    items = []
    if len(files) == 0:
        return items
    images = files.getlist('images')
    for file in images:
        ext = file.name.split(".").pop()
        filepath = os.path.join(settings.ATTACHMENTS_DIR, str(uuid4())+"."+ext)
        with open(filepath, 'wb+') as dest:
            for chunk in file.chunks():
                dest.write(chunk)
        if os.path.isfile(filepath):
            items.append({"file_name": file.name, "unique_file_name": os.path.basename(filepath)})
    return items