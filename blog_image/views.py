from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import (IsAuthenticated,
                                           AllowAny)

from .serializers import BlogImageSerializer
from .models import BlogImage
from user.permissions import OwnObjectOrReadOnlyPermission
from user.authentications import MyJWTAuthentication
from .forms import ImageUploadForm

from django.core.files.base import ContentFile
import base64


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

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.user.id
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
