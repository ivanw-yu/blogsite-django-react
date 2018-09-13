from django.db import models

from user.models import User

# Create your models here.
def create_file_name(instance, file_name):
    file, extension = file_name.split('.')
    return "profile_pictures/user{0}.{1}".format(file, extension)


class UserProfile(models.Model):
    image = models.ImageField(upload_to=create_file_name,
                              blank=True)
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                related_name='profile')
    bio = models.CharField(max_length=600)
    #
    # def save(self, *args, **kwargs):
    #     if (self.id is None) and self.image:
    #         temp_image = self.image
    #         self.image = None
    #         super().save(*args, **kwargs)
    #         self.image = temp_image
    #
    #         super().save(*args, **kwargs)
