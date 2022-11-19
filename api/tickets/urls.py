from django.urls import path
from . import views
from .views import TicketListView, TicketCUDView

urlpatterns = [
  path('<int:pk>/', TicketCUDView.as_view(), name="ticket_cud"),
  path('<int:ticket_id>/photos/<int:photo_id>', views.delete_ticket_photo, name="ticket_photo_delete"),
  path('', TicketListView.as_view(), name="list_create"),
]