from django.db import models
from django.contrib.auth.models import (AbstractBaseUser,
                                       PermissionsMixin,
                                       BaseUserManager)
from django.db import models
from django.conf import settings

from datetime import datetime, timedelta
import jwt


class UserManager(BaseUserManager):
    """ UserManager has logic for creating logic for a User. Django requires
        custom User models to have a Manager class which has overridden
        create_user method which contains the logic for saving a User object
        to the database.
    """

    def create_user(self, email, name, password):
        """ Creates user assigning it an email, name and encrypted password. """

        if email is None:
            raise TypeError('The User must have an email.')
        if name is None:
            raise TypeError('The User must have a name.')
        if password is None:
            raise TypeError('The User must have a password.')

        # make email all lowercase
        email = email.lower()

        user = self.model(email=email, name=name)
        user.set_password(password)
        user.is_active = True
        user.save()

        return user



# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):

    #make email a unique field. The USERNAME_FIELD, which will be email,
    #required that the field specified has 'unqiue=True'
    #name will contain 'FirstName LastName' syntax
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)

    # set the username field used to log in as email,
    # and make name field a required fieldself.
    # Note that USERNAME_FIELD and password field are implicitly required
    # and should not be contained in the REQUIRED_FIELDS property
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name',]

    # UserManager will have logic for creating the user
    objects = UserManager()

    # This will allow token to be accessed as user.token
    @property
    def token(self):
        """ Uses helper method _create_token() to generate token,
            which can be accessed as user.token.
        """
        return self._create_token()

    # _create_token should be treated as a private method,
    # called only within the User clas
    def _create_token(self):
        """ Creates a token which expires 10 days from the date and time
            of creation. The user's primary key id is used to create the token.
        """

        # This will contain the date and time in integer milliseconds
        # The expiration date will be 10 days from now
        # datetime.datetime object's timestamp() turns the datetime into float
        date_and_time = datetime.now() + timedelta(days=10)
        expiration_date = round(date_and_time.timestamp())

        # create token based on the user's primary key id (pk)
        token = jwt.encode({'id': self.pk,
                            'exp': expiration_date},
                            settings.SECRET_KEY, algorithm='HS256')
        return token

    # returns the string representation of a User instance as 'Name (Email)'
    def __str__(self):
        return '{0} ({1})'.format(self.name, self.email)
