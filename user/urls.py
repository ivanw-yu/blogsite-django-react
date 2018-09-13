from django.urls import path, include
from .views import ( RegistrationAPIView,
                     LoginAPIView,
                     UserRetrieveUpdateAPIView,
                     UserListAPIView )

urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('<int:pk>/', UserRetrieveUpdateAPIView.as_view()),
    path('register/', RegistrationAPIView.as_view()),
    path('', UserListAPIView.as_view()),
]
