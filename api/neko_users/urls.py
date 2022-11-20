from django.urls import path
from .views import UserListCreateView, UserRUDView

urlpatterns = [
  path('<int:id>/', UserRUDView.as_view(), name="user_rud"),
  path('', UserListCreateView.as_view(), name="user_lc"),
]