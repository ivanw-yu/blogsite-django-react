from django.db import models

from user.models import User

# Create your models here.
def create_file_name(instance, file_name):
    extension = file_name.split('.')[-1]
    return "profile_pictures/user{0}.{1}".format(instance.user.id, extension)


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

    # def save(self, *args, **kwargs):
    #     """ save method is overriden for the purpose of getting the id of the
    #         BlogImage (after the first save), and then using that id to
    #         name the file.
    #     """
    #     # if self.id is None, need to save first so that it can be accessible.
    #     if self.id is None:
    #         saved_image = self.image
    #         self.image = None
    #         super().save(*args, **kwargs)
    #
    #         # then, save the image,
    #         # use self.save() instead of super().save()
    #         # in order to update the newly created blog image.
    #         self.image = saved_image
    #         self.save()
    #         # This will cause integrity error: super().save(*args, **kwargs)
    #     else:
    #         super().save(*args, **kwargs)
