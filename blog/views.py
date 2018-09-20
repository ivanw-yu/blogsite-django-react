from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import (IsAuthenticated,
                                        AllowAny)
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import BlogSerializer
from user.authentications import MyJWTAuthentication
from user.permissions import OwnObjectOrReadOnlyPermission
from .models import Blog
from .paginations import CustomPagination

# Create your views here.
class BlogViewSet(viewsets.ModelViewSet):

    serializer_class = BlogSerializer
    authentication_classes = (MyJWTAuthentication,)
    pagination_class = CustomPagination

    # The following filter backends assignment will allow the endpoints:
    # /api/blogs/?fieldname=_  - due to DjangoFilterBackend
    #
    # /api/blogs/?search=_     - due to SeachFilter, and
    #                            this is searched via search_fields property
    #
    # /api/blogs/?ordering=_   - due to OrderingFilter. ordering_fields
    #                            will specify which fields can be used to sort.
    #                            orderings field is default ordering if not
    #                            specified in query string.
    #                            Puttng "-" in front of the value for "ordering"
    #                            on the query string will sort descending
    #                            order. Ex: /api/blogs/?ordering=-title
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter,
                       filters.OrderingFilter)
    filter_fields = ('user',)
    # /api/blogs/?search=_ where _ is the value used to search
    # title, content and user's name in a partial case insensitive match
    search_fields = ('title', 'content', 'user__name')

    # /api/blogs/?ordering=_ where _ is the field used for sorting.
    # add "-" infront of field name on the query string to sort descendingly.
    # ordering field is the default field to sort with; putting "-" in front of
    # field name on url means descending order. In this case, it is view_count.
    # /api/blogs/?ordering=title,view  will sort in title,
    # then sort in number of views.
    ordering_fields = ('title', 'content','view_count', 'created')
    ordering = ('view_count')


    # All requests use the queryset to retrieve data from etc.
    # alternatively, use get_queryset() to apply more logic to the queryset.
    queryset = Blog.objects.all()


    def get_permissions(self):
        """ Used to apply different permissions per methods in viewset.
            GET requests - AllowAny
            POST - IsAuthenticated
            DELETE, PUT, PATCH - OwnObjectOrReadOnlyPermission
        """

        if self.action == 'create':
            permission_classes = [IsAuthenticated]

        if self.action in ['create','update', 'partial_update', 'destroy']:
            print("\n\n OwnObject\n\n")
            permission_classes = [OwnObjectOrReadOnlyPermission]

        if self.action in ['list', 'retrieve', 'view_count']:
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
        data['user'] = request.user.id
        #data['user'] = id
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


    # detail=True means match /api/blogs/<pk>/view_count/
    # with the primary key id included in url.
    @action(detail=True,
            methods=['PATCH'])
    def view_count(self, request, **kwargs):
        """ PATCH /api/blogs/<pk>/view_count
            Increments the view_count of the Blog object.
        """
        blog = self.get_object()
        blog.view_count += 1
        blog.save()
        serializer = self.serializer_class(blog)
        return Response(serializer.data)


    # @action(detail=False,
    #         methods=['POST', 'GET'],
    #         permission_classes=[OwnObjectOrReadOnlyPermission])
    # def comments(self, request, **kwargs):
    #
    #     if request.method == 'POST':
    #         serializer = CommentSerializer(data=request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             # default status is HTTP_200_OK, so don't need to add kwarg
    #             return Response(serializer.data)
    #         else:
    #             return Response(serializer.error,
    #                             status=HTTP_400_BAD_REQUEST)
    #
    #     elif request.method == 'GET':
    #         comments = Comment.objects.all()
    #         serializer = CommentSerializer(comments, many=True)
    #         return Response(serializer.data)
