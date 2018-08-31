from django.db import models
from django.contrib.auth.models import AbstractBaseUser,
                                       PermissionsMixin,
                                       BaseUserManager
from django.db import models
from django.conf import settings

from datetime import datetime, timedelta
import jwt


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):

    #make email a unique field. The USERNAME_FIELD, which will be email,
    #required that the field specified has 'unqiue=True'
    #name will contain 'FirstName LastName' syntax
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)

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
        return self._create_token()

    # _create_token should be treated as a private method,
    # called only within the User clas
    def _create_token(self):
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
