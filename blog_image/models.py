from django.db import models
from django.core.validators import MinValueValidator

from blog.models import Blog
from user.models import User

def create_file_name(instance, file_name):
    print("\n\n\n instance:{0} | {1}\n\n\n".format(instance.blog.id, instance.id))
    extension= file_name.split(".")[-1]
    return "images/blog{0}pic{1}.{2}".format( instance.blog.id,instance.id, extension)

# Create your models here.
class BlogImage(models.Model):
    image = models.ImageField(upload_to=create_file_name)
    blog = models.ForeignKey(Blog,
                            on_delete=models.CASCADE)
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
            self.image = saved_image

        super().save(*args, **kwargs)
