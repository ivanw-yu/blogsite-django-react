from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import (IsAuthenticated,
                                        AllowAny)
from rest_framework import status

from .serializers import BlogSerializer
from user.authentications import MyJWTAuthentication
from user.permissions import OwnObjectOrReadOnlyPermission
from .models import Blog

# Create your views here.
class BlogViewSet(viewsets.ModelViewSet):

    serializer_class = BlogSerializer
    authentication_classes = (MyJWTAuthentication,)

     # All requests use the queryset to retrieve data from etc.
     # alternatively, use get_queryset() to apply more logic to the queryset.
    queryset = Blog.objects.all()
    blogs_per_page = 10

    def get_permissions(self):
        """ Used to apply different permissions per methods in viewset.
            GET requests - AllowAny
            POST - IsAuthenticated
            DELETE, PUT, PATCH - OwnObjectOrReadOnlyPermission
        """

        if self.action == 'create':
            permission_classes = [IsAuthenticated]

        if self.action in ['update', 'partial_update', 'destroy']:
            print("\n\n OwnObject\n\n")
            permission_classes = [OwnObjectOrReadOnlyPermission]

        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    # def get_queryset(self):
    #     """ For every requests, get_queryset() will get executed FIRST,
    #         then, whatever database operations that proceed will only use
    #         the returned result of this method.
    #     """
    #
    #     return Blog.objects.all()

    def retrieve(self, request, *args, **kwargs):
        """ GET /api/blogs/<pk>
        """

        # self.get_object() automatically gets Blog whose primary key
        # is the pk specified in url.
        blog = self.get_object()
        print("\n\nblog:", blog,"\n\n")
        if blog is None:
            return Response({"error" : "No user found"},
                            status=status.HTTP_404_NOT_FOUND)

        # Pass Blog object to serializer so only fields
        # specified in serializer are returned.
        serializer = self.serializer_class(blog)
        return Response(serializer.data,
                        status=status.HTTP_200_OK)




    def create(self, request):
        data = request.data
        id = request.user.id
        data['user'] = id
        serializer = BlogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self, request, **kwargs):
        """ PATCH /api/users/<pk>/
        """

        # self.get_object() is the blog whose primary key is specified
        # in the URL
        blog = self.get_object()

        # Content and title are either the value provided in the request,
        # or the current value (if new value isn't supplied in the request)
        blog.content = request.data.get('content', blog.content)
        blog.title = request.data.get('title', blog.title)
        blog.save()

        serializer = self.serializer_class(blog)
        return Response(serializer.data,
                        status=status.HTTP_200_OK)

    def destroy(self, request, **kwargs):
        """ DELETE /api/users/<pk>/
        """

        # The blog whose primary key is <pk> in the url
        blog = self.get_object()

        if blog is None:
            return Response({"error": "Blog does note exist"},
                             status=status.HTTP_404_NOT_FOUND)

        # Delete and return the deleted blog as response.
        blog.delete()
        serializer = self.serializer_class(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)
