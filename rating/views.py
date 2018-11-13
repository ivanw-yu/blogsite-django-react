from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated,
                                        AllowAny)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import Rating
from .serializers import RatingSerializer
from user.authentications import MyJWTAuthentication
from user.permissions import OwnObjectOrReadOnlyPermission
from .paginations import RatingsPagination

class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    authentication_classes = (MyJWTAuthentication,)
    pagination_class = RatingsPagination
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter,
                       filters.OrderingFilter)
    ordering_fields = ('created',)
    ordering = ('created',)
    queryset = Rating.objects.all()

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes.append(IsAuthenticated)
        elif self.action in ['update', 'partial_update']:
            permission_classes.append(OwnObjectOrReadOnlyPermission)
        elif self.action in ['retrieve', 'list']:
            permission_classes.append(AllowAny)

        return [permission() for permission in permission_classes]

    # @action( details = False,
    #          methods = ['GET'])
    # def blogs(self, request, **kwargs):
    #     id = request.data.query_params.get('id')
