from django.db import models

from user.models import User
from django.core.validators import MinValueValidator

# Create your models here.
class Blog(models.Model):
    title = models.CharField(db_index=True,
                             max_length=300,
                             blank=False)
    content = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,
                                on_delete=models.CASCADE
                                )
    view_count = models.BigIntegerField(default=0,
                                        validators=[MinValueValidator(0)])

    def average_rating(self):
        if self.ratings.count() == 0:
            return 0
        ratings = self.ratings.all()
        sum = 0
        for rating in ratings:
            sum += rating.rating
        return sum / self.ratings.count()


    def __str__(self):
        return "{0}\n{1}".format(self.title, self.content)

    # def _capitalization_on_title(self, title):
    #     split_title = title.split(" ")
    #     capitalized_split_title = [word.capitalize() for word in split_title]
    #     return " ".join(capitalized_split_title)
    #
