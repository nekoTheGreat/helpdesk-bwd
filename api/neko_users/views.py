from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from .services import save_user


@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'POST':
        return store(request)
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def get_user(request, id: int):
    if request.method == 'PUT':
        return store(request, id)
    try:
        data = None
        user = User.objects.get(pk=id)
        if request.method == 'DELETE':
            user.delete()
        else:
            serializer = UserSerializer(user)
            data = serializer.data
        response_status = status.HTTP_200_OK
    except User.DoesNotExist:
        response_status = status.HTTP_404_NOT_FOUND
    return Response(data=data, status=response_status)


def store(request, id: int = None):
    try:
        data = save_user(request.data, id)
        return Response(data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
