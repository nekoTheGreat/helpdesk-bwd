from django.urls import path
from . import views
from .views import TicketListView

urlpatterns = [
  path('<int:id>/', views.get_ticket, name="ticket"),
  path('<int:ticket_id>/photos/<int:photo_id>', views.delete_ticket_photo, name="ticket_photo_delete"),
  path('', TicketListView.as_view(), name="list_create"),
]