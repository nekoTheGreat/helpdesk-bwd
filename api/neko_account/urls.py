from django.urls import path
from . import views

urlpatterns = [
  path('<int:id>/', views.get_account_user, name="account_user"),
  path('', views.index, name="index"),
]