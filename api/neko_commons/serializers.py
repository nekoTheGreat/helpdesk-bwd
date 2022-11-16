from rest_framework import serializers
from .models import Attachment

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'

    url = serializers.StringRelatedField()
    def get_url(self, instance):
        return instance.url()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        fields = ['id', 'file_name', 'unique_file_name', 'url']
        return { key:value for key, value in data.items() if key in fields }