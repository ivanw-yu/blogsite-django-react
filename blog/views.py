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
            permission_classes = [OwnObjectOrReadOnlyPermission]

        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """ Matches GET /api/blogs/ and GET /api/blogs/?page=_
        """
        page = self.request.query_params.get('page')
        offset = 0 if page is None else ((int(page)-1) * self.blogs_per_page)
        query = """SELECT * FROM blog_blog
                   ORDER BY created
                   LIMIT {0} OFFSET {1}""".format(self.blogs_per_page,
                                                  offset)
        blogs = Blog.objects.raw(query)
        return blogs


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


    def partial_update(self, request, *args, **kwargs):
        try:
            pk= kwargs.get('pk')
            print('pk:',pk)
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({"message": "404 Not Found."},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(blog, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)



    # def retrieve(self, request, pk=None):
    #     pass
