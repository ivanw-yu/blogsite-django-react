from rest_framework import serializers

from .models import Rating
from user.serializers import UserSerializer
from blog.serializers import BlogSerializer

class RatingSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    blog = BlogSerializer()

    class Meta:
        model = Rating
        fields = ( 'rating',
                   'blog',
                   'user',
                   'created',
                   'edited' )
        read_only_fields = ('created', 'edited')
