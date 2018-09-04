from .models import Comment
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = (
            'user',
            'blog_id',
            'content',
            'created',
            'id'
        )

        read_only_fields = ('created','id')
