from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = ('title',
                  'content',
                  'user',
                  'id',
                  'created',
                  'edited',
                  'view_count')

        read_only_fields = ('created', 'edited')
