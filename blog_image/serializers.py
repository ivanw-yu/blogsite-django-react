from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from .models import BlogImage
#from blog.serializers import BlogSerializer

class BlogImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = BlogImage
        fields = ( 'user',
                   'blog',
                   'image',
                   'order' )
