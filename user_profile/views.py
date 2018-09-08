from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (AllowAny, IsAuthenticated)

from .models import UserProfile
from .serializers import UserProfileSerializer
from user.permissions import OwnObjectOrReadOnlyPermission
from user.authentications import MyJWTAuthentication

# Create your views here.
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [MyJWTAuthentication]

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        if self.action in ['partial_update', 'update', 'delete']:
            permission_classes = [OwnObjectOrReadOnlyPermission]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    # def partial_update(self, request, *args, **kwargs)
    #
