from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import CommentSerializer
from .models import Comment
from user.permissions import OwnObjectOrReadOnlyPermission


class CommentViewSet(viewsets.ModelViewSet):

    # queryset is used by all requests.
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):

        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        if self.action == 'destroy':
            permission_classes = [OwnObjectOrReadOnlyPermission]
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def retieve(self, request, **kwargs):
        """ GET /api/comments/<pk>/
        """
        comment = self.get_object()
        serializer = self.serializer_class(comment)

        # By default, status is HTTP_200_OK, so don't need to specify here.
        return Response(serializer.data)

    def list(self, request, **kwargs):
        """ GET /api/comments/?blog_id=_&page=_
            - query string has blog_id
            - NEED TO IMPLEMENT PAGINATION HERE
        """
        blog_id = kwargs.get('blog_id', None)

        if blog_id is None:
            comments = Comment.objects.all()
        else:
            comments = Comment.objects.get(blog_id=blog_id)
        serializer = self.serializer_class(comments, many=True)
        return Response(serializer.data)

    def create(self, request, **kwargs):
        """ POST /api/comments/
        """

        # MyJWTAuthentication will pass on the user data containing its id.
        data = request.data
        data['user'] = request.user.id

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, **kwargs):
        """ DELETE /api/comments/<pk>/
        """
        comment = self.get_object()
        comment.delete()
        serializer = self.serializer_class(comment)
        return Response(serializer.data)
