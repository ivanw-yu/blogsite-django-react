from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (AllowAny, IsAuthenticated)
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
import base64, os

from .models import UserProfile
from .serializers import UserProfileSerializer
from user.permissions import OwnObjectOrReadOnlyPermission
from user.authentications import MyJWTAuthentication

# Create your views here.
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [MyJWTAuthentication]
    permission_classes = ( OwnObjectOrReadOnlyPermission,
                           IsAuthenticated,
                           AllowAny )
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('user', 'id')

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        if self.action in ['partial_update', 'update', 'delete']:
            permission_classes = [OwnObjectOrReadOnlyPermission]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def partial_update(self, request, *args, **kwargs):
        profile = self.get_object()
        image = request.data.get('image')

        if image is not None and image != profile.image.url:

            # remove the previous image
            print("IMAGE:", image)
            prevImage = profile.image
            os.remove('frontend/public' + prevImage.url)

            #create the new image
            format, image_string = image.split(';base64,')
            extension = format.split('/')[-1]

            # decode the base64 image string, make filepath and set the image.
            decoded_image_string = base64.b64decode(image_string)
            file_path = 'profile_pictures/user{0}.{1}'.format(profile.user.id,
                                                                  extension)
            profile.image = ContentFile(decoded_image_string,
                                            name=file_path)

        bio = request.data.get('bio')
        if bio is not None:
            profile.bio = bio

        profile.save()


        # prepare data to send back.
        data = {}
        data['bio'] = profile.bio
        data['user'] = profile.user
        data['id'] = profile.id

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            return Response(serializer.data,
                            status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    # def retrieve(self, request, *args, **kwargs):
    #     serializer = self.serializer_class(data=self.get_object(),
    #                                        many=False)
    #     return Response(serializer.data, status = status.HTTP_200_OK)

    # def partial_update(self, request, *args, **kwargs):
    #
    #     profile = self.get_object()
    #
    #     if request.data.image is not None:
    #         profile.image = request.data.image
    #
    #     if request.data.bio is not None:
    #         profile.bio = request.data.bio
    #
    #     serializer = self.serializer_class(data=profile)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
