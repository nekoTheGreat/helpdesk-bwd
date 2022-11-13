from django.urls import path
from . import views

urlpatterns = [
  path('<int:id>/', views.get_user, name="user"),
  path('', views.index, name="index"),
]