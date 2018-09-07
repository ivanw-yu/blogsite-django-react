from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import User
from user_profile.models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    print("\n\nHERE\n\n")
    print("\n\nIn create_user_profile kwargs:{0}\n\nsender:{1}\n\n".format(kwargs,sender))
    user = kwargs.get('instance', None)
    if user and user.id:
        print("CREATING user_profile")
        user_profile=UserProfile(user=user)
        user_profile.save()
