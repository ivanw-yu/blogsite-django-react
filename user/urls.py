from django.urls import path, include
from .views import ( RegistrationAPIView,
                     LoginAPIView,
                     UserRetrieveUpdateAPIView )

urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('<int:pk>/', UserRetrieveUpdateAPIView.as_view()),
    path('', RegistrationAPIView.as_view()),
]
