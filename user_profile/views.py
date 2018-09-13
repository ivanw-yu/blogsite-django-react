from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (AllowAny, IsAuthenticated)
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action

from .models import UserProfile
from .serializers import UserProfileSerializer
from user.permissions import OwnObjectOrReadOnlyPermission
from user.authentications import MyJWTAuthentication

# Create your views here.
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [MyJWTAuthentication]
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('user',)

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        if self.action in ['partial_update', 'update', 'delete']:
            permission_classes = [OwnObjectOrReadOnlyPermission]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
