from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.mixins import status
from rest_framework import generics, exceptions
from .serializers import TicketSerializer
from .models import Ticket
from .services import save_ticket, add_attachment, remove_attachment
from neko_commons.models import Attachment
from .permissions import TicketOwnerPermission
from uuid import uuid4
import os
from django.conf import settings


class TicketListView(generics.ListCreateAPIView):
    permission_classes = [TicketOwnerPermission]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if request.auth == None:
            queryset = queryset.filter(publish_status="published")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy().dict()
        if user:
            data['user'] = user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        items = processAttachments(self.request.FILES)
        for item in items:
            add_attachment(serializer.data, item)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class TicketRUDView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [TicketOwnerPermission]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_update(self, serializer):
        data = save_ticket(self.request.data, self.kwargs.get(self.lookup_field))
        items = processAttachments(self.request.FILES)
        for item in items:
            add_attachment(data, item)

    def perform_destroy(self, instance):
        ticket = self.get_object()
        if len(ticket.photos) > 0:
            for photo in ticket.photos:
                remove_attachment(ticket.__dict__, photo.id)
        return super().perform_destroy(instance)

class TicketPhotoDeleteView(generics.DestroyAPIView):
    permission_classes = [TicketOwnerPermission]
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
        if file.size > settings.ATTACHMENT_MAX_SIZE:
            raise exceptions.ValidationError({"images": "The maximum attachment size is 5mb"})
        ext = file.name.split(".").pop()
        filepath = os.path.join(settings.ATTACHMENTS_DIR, str(uuid4())+"."+ext)
        with open(filepath, 'wb+') as dest:
            for chunk in file.chunks():
                dest.write(chunk)
        if os.path.isfile(filepath):
            items.append({"file_name": file.name, "unique_file_name": os.path.basename(filepath), "file_path": filepath})
    return items