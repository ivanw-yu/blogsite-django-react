from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated,
                                           AllowAny)
from .serializers import BlogImageSerializer
from .models import BlogImage
from user.permissions import OwnObjectOrReadOnlyPermission
from user.authentications import MyJWTAuthentication

# Create your views here.
class BlogImageViewSet(viewsets.ModelViewSet):
    queryset = BlogImage.objects.all()
    serializer_class = BlogImageSerializer
    authentication_classes = [MyJWTAuthentication]
    permission_classes = [OwnObjectOrReadOnlyPermission]

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        if self.action in ['partial_update', 'update', 'destroy']:
            permission_classes = [OwnObjectOrReadOnlyPermission]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
