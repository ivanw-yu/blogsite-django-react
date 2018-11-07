from django.db import models

from user.models import User

class Subscription(models.Model):
    author = models.ForeignKey(User,
                                    on_delete=models.CASCADE,
                                    related_name="authors")
    user = models.ForeignKey(User,
                                        on_delete=models.CASCADE,
                                        related_name="subscribers")
    since = models.DateTimeField(auto_now_add=True)
    subscribed = models.BooleanField(default=True)

    class Meta:
        unique_together = ('author', 'user')
