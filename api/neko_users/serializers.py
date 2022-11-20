from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

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
        validated_data = {**validated_data, **self.prepareDataBeforeSave(validated_data)}
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        updates = {**validated_data, **self.prepareDataBeforeSave(validated_data)}
        print(updates)
        for prop in updates:
            if prop in ['groups', 'user_permissions']:
                continue
            setattr(instance, prop, updates[prop])
        instance.save()
        return instance

class AuthTokenSerializer(serializers.Serializer):
    '''serializer for the user authentication object'''
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password
        )
        
        if not user:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs