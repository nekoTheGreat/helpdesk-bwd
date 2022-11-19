from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import status
from .serializers import TicketSerializer
from .models import Ticket
from .services import save_ticket, add_attachment
from neko_commons.models import Attachment
from uuid import uuid4
import os
from django.conf import settings

class TicketListView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketCUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_update(self, serializer):
        data = save_ticket(self.request.data, self.kwargs.get(self.lookup_field))
        items = processAttachments(self.request.FILES)
        for item in items:
            add_attachment(data, item)

class TicketPhotoDeleteView(generics.DestroyAPIView):
    queryset = Ticket.objects.all()
    lookup_url_kwarg = 'ticket_id'

    def perform_destroy(self, instance):
        try:
            attachment = Attachment.objects.get(identifier=instance.id, pk=self.kwargs.get('photo_id'))
            self.check_object_permissions(self.request, attachment)
        except Attachment.DoesNotExist:
            raise Attachment.DoesNotExist("Ticket's photo does not exist")

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