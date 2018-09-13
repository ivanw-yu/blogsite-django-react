from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (AllowAny,
                                        IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.generics import ( RetrieveUpdateAPIView,
                                      ListAPIView )
from rest_framework import status

from .serializers import ( RegistrationSerializer,
                           LoginSerializer,
                           UserSerializer)
from .models import User
from .authentications import MyJWTAuthentication
from .permissions import (OwnObjectOrReadOnlyPermission,
                          OwnSelfOrReadOnlyPermission)

# Create your views here.
class RegistrationAPIView(APIView):
     """ Handles logic for registering user using
        the RegistrationSerializer to create, validate and save
        User objects.
     """
     serializer_class = RegistrationSerializer
     permission_classes = (AllowAny,)

     def post(self, request):
         """ Handles POST requests. The user data used for registration
             is contained in request.user. The request body is sent
             as application/json from the client side, and should have
             email, name and password.
         """

         # First, check if the 2 password matches.
         password = request.data.get('password', None)
         confirmPassword = request.data.get('confirmPassword', None)

         if password != confirmPassword:
             return Response({'password' :
                    ['Please make sure you confirm password properly.']
            }, status=status.HTTP_400_BAD_REQUEST)

         # pass data to the serializer. If there are any missing data
         # or invalid datas (based on the model serializer fields) the
         # is_valid() will be false.

         print('about to save', request.data)

         serializer = self.serializer_class(data=request.data)
         if serializer.is_valid():
             # if all fields check out, save the User into the database
             # and return the User in a 201 Response. The user returned
             # will contain email and name only, and not the password field
             serializer.save()
             return Response(serializer.data, status=status.HTTP_201_CREATED)
         else:
             return Response(serializer.errors,
                            #{'message': 'HTTP 400 BAD REQUEST.'},
                             status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    """ Handles POST /api/login requests.
        Email and password fields are taken from requests and are
        used to authenticate the user. Authenticated users are given
        a json web token.
    """
    serializer_class = LoginSerializer

    def post(self, request):
        """ POST /api/login endpoint.
            request is expected to have an application/json body
            with fields: 1) email
                         2) password
            The request.data containing the email and password is passed
            to the LoginSerializer which contains logic for verifying
            valid email and password combination.
        """

        # pass request.data dictionary containing email and password
        # to LoginSerializer.
        serializer = self.serializer_class(data=request.data)

        # check if the data sent in request.data has all fields required
        # and the email and password combination is valid.
        # If so, serializer.data will contain a user dictionary (with email and
        # name fields), and the token.
        if serializer.is_valid():
            return Response(serializer.validated_data,
                            status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """ Handles PUT or PATCH /api/users/id
        and GET /api/users/id
    """
    query_set = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (MyJWTAuthentication,)
    permission_classes= (OwnSelfOrReadOnlyPermission,)
    lookup_field = "id"

    def retrieve(self, request, *args, **kwargs):
        """ Gets a user, this will match
            GET /api/usrers/<pk> requests, as specified in urls.py
        """
        try:
            # get the id, and use it to find the active user.
            id = kwargs.get('pk')

            if id:
                user = User.objects.get(pk=id, is_active=True)
            else:
                user = User.objects.all()
            #profile = user.profile
            #print("PROFILE:", profile,"\n\n")
            # Only fields specified in the serializer class are returned
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "The user you are locating does not exist."},
                              status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        """ Handles PUT/PATCH /api/users/<pk>/
            Updates a user based on request application/json data and
            primary key id which is a part of the url.
        """

        # Get the pk id in from the url, and use it to get the User from
        # the database.
        id = kwargs.get('pk', None)
        user = User.objects.get(pk=id, is_active=True)

        self.check_object_permissions(request, user)

        # This will trigger the overridden update() method of the UserSerializer
        # Pass in the retrieved user from the database so that it gets saved
        # inside the model serializer's update() method.
        serializer = self.serializer_class(user, data=request.data, partial=True)

        # if serializer is valid, return the serializer.data
        # use serializer.data instead of serializer.validated_data because
        # the latter will only contain provided fields, not all of them.
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListAPIView(ListAPIView):
    """ UserList APIView will be used to get a list of users only,
        not single users.
    """
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):

        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)

        if users.count() > 0:
            return Response(serializer.data,
                            status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_404_NOT_FOUND)
