from django.db import models
from blog.models import Blog

def create_file_name(instance, file_name):
    print("\n\n\n instance:{0} | {1}\n\n\n".format(instance.blog.id, instance.id))
    extension= file_name.split(".")[-1]
    return "images/blog{0}pic{1}.{2}".format( instance.blog.id,instance.id, extension)

# Create your models here.
class BlogImage(models.Model):
    image = models.ImageField(upload_to=create_file_name)
    blog = models.ForeignKey(Blog,
                            on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.id is None:
            saved_image = self.image
            self.image = None
            super(BlogImage, self).save(*args, **kwargs)
            self.image = saved_image
            #kwargs.pop('force_insert')

        super(BlogImage, self).save(*args, **kwargs)
