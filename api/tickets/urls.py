from django.urls import path
from . import views

urlpatterns = [
  path('<int:id>/', views.get_ticket, name="ticket"),
  path('', views.index, name="index"),
]