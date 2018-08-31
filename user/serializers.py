from rest_framework import serializers
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
