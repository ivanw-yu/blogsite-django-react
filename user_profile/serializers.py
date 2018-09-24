from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):

    image = Base64ImageField(required=False)

    class Meta:
        model = UserProfile
        fields = ('id',
                  'image',
                  'bio',
                  'user')

        read_only_fields = ('id',
                            'user')
