from rest_framework import serializers
from .models import BlogImage
#from blog.serializers import BlogSerializer

class BlogImageSerializer(serializers.ModelSerializer):

    #blog = BlogSerializer()

    class Meta:
        model = BlogImage
        fields = '__all__'
