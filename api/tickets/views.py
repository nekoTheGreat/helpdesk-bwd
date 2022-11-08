from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TicketSerializer
from .models import Ticket


@api_view(['GET'])
def index(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)