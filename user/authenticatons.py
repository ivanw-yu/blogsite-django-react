import jwt

from rest_framework import exceptions, authentication

from django.conf import settings
from .models import User

class MyJWTAuthentication(authentication.BaseAuthentication):
    """ Responsible for decoding the token from the request,
        and verifying the token.
    """
    def authenticate(self, request):
        """ Returns (user, token) if token verified properly,
            and raises AuthenticationFail exception if token
            is not valid.
        """

        # Get the token from the request under the X-AUTH header,
        # it is acquired as HTTP_X_AUTH in the Python backend side
        # in request.META.
        token = request.META.get("HTTP_X_AUTH")

        # If there's no token, pass this authentication by returning None to
        # delegate authentication logic to the next authentication class, if any.
        if token is None:
            return None


        # Decode the token to get the payload which contains the user id.
        # Then, determine if the id corresponds to an existing user that
        # is active. If not, raise an AuthenticationFailed exception.
        # If authentication passes, the user and the token will be
        # returned as a tuple.
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            id = payload.get('id')
            user = User.objects.get(pk=id, is_active=True)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("""User does not exist or
                is deactivated.""")
        except:
            raise exceptions.AuthenticationFailed("Token invalid")
        else:
            return (user, token)
