from django.urls import path, include
from .views import ( RegistrationAPIView,
                     LoginAPIView )

urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('', RegistrationAPIView.as_view())
]
