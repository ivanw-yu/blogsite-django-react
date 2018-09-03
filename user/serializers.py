from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class RegistrationSerializer(serializers.ModelSerializer):
    """ RegistrationSerializer is used to validate user data
        such as password, name, email and token. It uses
        UserManager's create_user method to create and save
        User in the database.
    """
    # make sure password is between 5 to 50 characters, and
    # can only be written and not read.
    password = serializers.CharField(min_length = 5,
                                     max_length = 50,
                                     write_only = True)

    # make sure token is read only.
    token = serializers.CharField(max_length=300,
                                  read_only=True)

    class Meta:
        """ Meta inner class specifies the model to be used
            by the ModelSerializer, and table columns or
            class properties used (in the fields property).
            The field property causes name, email and token fields
            to be in serializer.data if data passed to serializer is valid.
            In such case, password will not be in serializer.data because
            it is write_only.
        """
        model = User
        fields = ['name', 'email', 'password', 'token']

    def create(self, user):
        """ Creates and stores the User using the create_user method
            of UserManager.
        """
        return User.objects.create_user(**user)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=300)
    password = serializers.CharField(min_length=5,
                                     max_length=50,
                                     write_only=True)

    token = serializers.CharField(max_length=300,
                                  read_only=True)

    def validate(self, data):

        email = data.get('email')
        password = data.get('password')

        if email is None:
            raise serializers.ValidationError(
                'Email is required.'
            )

        if password is None:
            raise serializers.ValidationError(
                'Password is required.'
            )

        # authenticate returns user if the username and password
        # checks out, and None otherwise
        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'Email and password combination invalid.'
            )

        return {
            'user': {'email': user.email,
                     'name': user.name,
                     'id': user.id},
            'token': user.token
        }

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ Responsible for updating user fields and
        retrieving a single user.
    """

    # give the model serializer a password field, so it
    # would not be refering to the required password field of the model
    # therefore update() will not require password field.
    password = serializers.CharField(min_length=8,
                                     max_length=128,
                                     write_only=True)
    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'name',
                  'password',
                  'token')
        read_only_fields = ('token','id','email',)

    def update(self, instance, validated_data):
        """ Provides logic for updating/partially updating the user.
            Instance refers to the user being updated.
            Example use:
            user = User.objects.get(pk=id)
            serializer = UserSerializer(user, data=request.data, partial=True)
            .... serializer.save() after validation
        """

        # Remove and retrieve password from validated_data dictionary
        # pop() returns None if the password is not set
        password = validated_data.pop('password', None)

        # if password is provided in the validated data,
        # set the encrypted password
        if password is not None:
            instance.set_password(password)

        # set all other properties provided for the user
        # setattr(instance, key, value) works the same way as instance.key=value
        # where the key is the name of the property of the instance.
        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        # save changes to the database's table for the User model.
        instance.save()
        return instance
