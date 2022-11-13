from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def doPasswordHash(self, password):
        if password != None and len(password) > 0:
            return make_password(password)
        return None

    def prepareDataBeforeSave(self, validated_data):
        password = validated_data.get('password')
        updates = {}
        if password != None and len(password) > 0:
            updates['password'] = make_password(password)
        return updates

    def create(self, validated_data):
        validated_data = {**validate_data, **self.prepareDataBeforeSave(validated_data)}
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        partials = self.prepareDataBeforeSave(validated_data)
        for prop in partials:
            setattr(instance, prop, partials[prop])
        instance.save()
        return instance