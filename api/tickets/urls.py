from django.urls import path
from .views import TicketListView, TicketCUDView, TicketPhotoDeleteView

urlpatterns = [
  path('<int:pk>/', TicketCUDView.as_view(), name="ticket_cud"),
  path('<int:ticket_id>/photos/<int:photo_id>', TicketPhotoDeleteView.as_view(), name="ticket_photo_delete"),
  path('', TicketListView.as_view(), name="list_create"),
]