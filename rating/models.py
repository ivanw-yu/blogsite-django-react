from django.db import models

from blog.models import Blog
from user.models import User
# Create your models here.
class Rating(models.Model):

    # related_name will allow all Rating instances related to
    # a Blog instance to be refered to as a ratings property
    # of that instance.
    blog = models.ForeignKey( Blog,
                              on_delete=models.CASCADE,
                              related_name='ratings' )

    user = models.ForeignKey( User, on_delete=models.CASCADE )
    comment = models.TextField()
    created = models.DateTimeField( auto_now_add=True )
    edited = models.DateTimeField( auto_now=True, blank=True )

    RATING_CHOICES = [ (i, i) for i in range(0, 6) ]
    rating = models.IntegerField( choices = RATING_CHOICES )
    class Meta:
        unique_together = (("blog", "user"),)
