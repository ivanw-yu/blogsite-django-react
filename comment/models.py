from django.db import models
from user.models import User
from blog.models import Blog

# Create your models here.
class Comment(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_id = models.ForeignKey(Blog, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
