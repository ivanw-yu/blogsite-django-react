from django.db import models
from django.core.validators import MinValueValidator

from blog.models import Blog
from user.models import User

def create_file_name(instance, file_name):
    extension= file_name.split(".")[-1]
    return "images/blog{0}pic{1}.{2}".format( instance.blog.id,instance.id, extension)

class BlogImage(models.Model):
    image = models.ImageField(upload_to=create_file_name,
                              blank=True)
    blog = models.ForeignKey(Blog,
                            on_delete=models.CASCADE,
                            related_name="image")
    order = models.IntegerField(validators = [MinValueValidator(0)],
                                default=0)
    user = models.ForeignKey(User,
                                on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        """ save method is overriden for the purpose of getting the id of the
            BlogImage (after the first save), and then using that id to
            name the file.
        """
        # if self.id is None, need to save first so that it can be accessible.
        if self.id is None:
            saved_image = self.image
            self.image = None
            super().save(*args, **kwargs)

            # then, save the image,
            # use self.save() instead of super().save()
            # in order to update the newly created blog image.
            self.image = saved_image
            self.save()
            # This will cause integrity error: super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)
