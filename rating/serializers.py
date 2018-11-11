from rest_framework import serializers

from .models import Rating
from user.serializers import UserSerializer
from blog.serializers import BlogSerializer

class RatingSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    #blog = BlogSerializer()
    blog = serializers.SerializerMethodField()

    class Meta:
        model = Rating
        fields = ( 'rating',
                   'id',
                   'blog',
                   'user',
                   'created',
                   'edited',
                   'comment' )
        read_only_fields = ('created', 'edited')

    def get_blog(self, obj):
        # obj is the blog object.
        return obj.blog_header()
