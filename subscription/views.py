from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import Subscription
from .serializers import SubscriptionSerializer
from user.permissions import (OwnObjectOrReadOnlyPermission, )
from user.authentications import (MyJWTAuthentication)


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    authentication_classes = (MyJWTAuthentication,)
    serializer_class = SubscriptionSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated()]
        elif self.action in ['destroy', 'unsubscribe']:
            return [OwnObjectOrReadOnlyPermission()]
        elif self.action in ['list', 'retrieve']:
            return [AllowAny()]
        else:
            return []


    def create(self, request, *args, **kwargs):

        data = request.data #should contain 'author' id
        data['user'] = request.user.id

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            try:
                serializer.save()
            except:
                return self.subscribe(data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return self.subscribe(data)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action( detail=True,
             methods=['PATCH'])
    def unsubscribe(self, request, *args, **kwargs):
        """ /api/subscriptions/pk/
            X-AUTH header must contain the token.
            Instead of deleting the row, the row is reused and the
            subscribed column is changed to true instead.
        """

        subscription = self.get_object()
        subscription.subscribed = False
        subscription.save()
        serializer = self.serializer_class(subscription)
        serializer.data['message'] = 'You have unsubscribed successfully'
        return Response(serializer.data, status=status.HTTP_200_OK)

    def subscribe(self, data):
        """
            subscribe() is a helper function used when a user is resubscribing to
            a previously unsubscribed author. Rows are reused in such case, and unsubscribing
            doesn't delete the row.
        """
        try:
            print('data dasdda',data, data['author'])
            subscription = Subscription.objects.get( author=data['author'],
                                                     user=data['user'])
            subscription.subscribed = True
            subscription.save()

            serializer = self.serializer_class(subscription)
            serializer.data["message"] = "You have successfully subscribed."
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Subscription.DoesNotExist:
            return Response( {"message": "404 Not Found, subscription does not exist."},
                             status=status.HTTP_400_BAD_REQUEST)
