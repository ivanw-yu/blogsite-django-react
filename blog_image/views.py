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

from django.core.files.base import ContentFile
from blog_project.settings import MEDIA_ROOT
import os, base64


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

    def partial_update(self, request, *args, **kwargs):

        try:
          print("1st try")
          new_image = request.data.get('image')
          print("adter getting new image from request")
          if new_image is not None:
            blog_image = self.get_object()

            # if an image already exist, remove the image from the frontend/pubic/media/images
            # directory. Note that each image file comes with the /media/images prefixed.
            if len(blog_image.image) > 0:
                os.remove('frontend/public' + blog_image.image.url)

            # Get the file path and the image string without the base64 part
            format, image_string = new_image.split(';base64,')
            extension = format.split('/')[-1]
            file_path = "images/blog{0}pic{1}.{2}".format(blog_image.blog.id,
                                                          blog_image.id,
                                                          extension)
            print("About to save")
            # set the image and save.
            base64DecodedImage = base64.b64decode(image_string)
            blog_image.image = ContentFile(base64DecodedImage,
                                           name=file_path)
            blog_image.save()
            print("Saved")
            # prepare data to be sent back in the Response
            data = {}
            data['id'] = blog_image.id
            data['user'] = blog_image.user.id
            data['blog'] = blog_image.blog.id
            data['order'] = blog_image.order
            data['image'] = new_image#base64DecodedImage#blog_image.image

            serializer = self.serializer_class(data = data)

            if serializer.is_valid():
              return Response(serializer.data, status=status.HTTP_200_OK)
            else:
              print("ERROR", serializer.errors)
              return Response(serializer.errors,
                              status=status.HTTP_400_BAD_REQUEST)

        except OSError:
          print("OS ERROR")
          print(str(OSError))
          return Response({'message': 'Internal 500 error, replacing image file failed. Please try again later'},
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)
