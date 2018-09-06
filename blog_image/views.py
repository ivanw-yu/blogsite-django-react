from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BlogImageSerializer
from .models import BlogImage
# Create your views here.
class BlogImageViewSet(viewsets.ModelViewSet):
    queryset = BlogImage.objects.all()
    serializer_class = BlogImageSerializer
