from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import User
from user_profile.models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):

    # check if the save is due to creation, then if it is,
    # create the profile.
    if kwargs.get('created', None):
        user = kwargs.get('instance', None)
        if user and user.id:
            print("CREATING user_profile")
            user_profile=UserProfile(user=user)
            user_profile.save()
