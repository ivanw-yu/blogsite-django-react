# The urlpatterns correspond to '/api/blogs/' as specified in blog-project.urls

from .views import BlogViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', BlogViewSet, base_name='')

urlpatterns = router.urls
