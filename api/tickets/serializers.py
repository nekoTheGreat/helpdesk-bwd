from rest_framework import serializers
from .models import Ticket
from neko_commons.models import Attachment
from neko_commons.serializers import AttachmentSerializer

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    photos = serializers.SerializerMethodField()
    def get_photos(self, instance):
        return AttachmentSerializer(instance.photos, many=True).data