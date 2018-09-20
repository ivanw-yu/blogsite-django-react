from rest_framework import serializers
from .models import Blog

from blog_image.serializers import BlogImageSerializer

class BlogSerializer(serializers.ModelSerializer):

    # many=True allows the image field to be returned as an array
    # containing all BlogImage field belonging to the specific blog.
    # required=False means that validation of this field will not take place
    # when the Blog object is being validated using this serializer.
    image = BlogImageSerializer(many=True,
                                required=False)

    class Meta:
        model = Blog
        fields = ('title',
                  'content',
                  'user',
                  'id',
                  'created',
                  'edited',
                  'image',
                  'view_count')

        read_only_fields = ('created', 'edited')
        # extra_kwargs = { 'image': {'blank': True}}
