from rest_framework import (permissions,
                            authentication)


class OwnObjectOrReadOnlyPermission(permissions.BasePermission):
    """ Determines if the object (model instance) is owned by
        a user. If so, the user will have permission to edit, delete, etc.
        the object. Ultimately, this permission will be used to
        determine whether or not a user can manipulate a resource.
        GET, HEAD and OPTIONS requests (requests included in
        permissions.SAFE_METHOD) are permitted without checking id.
    """

    def has_object_permission(self, request, view, object):
        """ Gets the user data from the request.
            By the time permission is checked, the MyJWTAuthentication
            has passed the user data on to this permission check.
            Returns False if user is not passed on from request via
            MyJWTAuthentication or if the object's foreign key id doesn't
            match the user's.

            Object should be passed using the view's
            self.check_object_permission(request, model_instance)
            as the 2nd argument.
        """

        # check if GET, HEAD or OPTION request, if so, permit.
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user is None:
            return False

        # grab the user from the request.
        id = request.user.id

        # check if user has permission to manipulate resource by comparing
        # the object model instance's user id to the user id from the request.
        id = object.user
        return object.user == user.id


class OwnSelfOrReadOnlyPermission(permissions.BasePermission):
    """ Determines whether the User resource being accessed/manipulated
        is that of the user making the request.
    """

    message = "You do not have access to this user account."

    def has_object_permission(self, request, view, object):
        """ Gets user data from request.
            By the time this method is called, user is passed on to
            request.user.id from the MyJWTAuthentication.
        """

        # check if GET, HEAD or OPTION request, if so, permit.
        if request.method in permissions.SAFE_METHODS:
            return True

        try:
            # grab id and check it against the object.id, which is the User
            # model instance being manipulated.
            id = request.user.id
            return object.id == id
        except:
            # if there's exception in accessing requet.user.id,
            # this means the user wasn't authenticated, return False.
            return False
