from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegistrationSerializer

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
             as application/json from the client side.
         """

         data = request.data.get('user', {})

         # pass data to the serializer. If there are any missing data
         # or invalid datas (based on the model serializer fields) the
         # is_valid() will be false.

         serializer = serializer_class(data=data)
         if serializer.is_valid():
             # if all fields check out, save the User into the database
             # and return the User in a 201 Response. The user returned
             # will contain email and name only, and not the password field
             serializer.save()
             return Response(serializer.data, status=status.HTTP_201_CREATED)
         else:
             return Response({'message': 'HTTP 400 BAD REQUEST.'},
                             status=status.HTTP_400_BAD_REQUEST)
