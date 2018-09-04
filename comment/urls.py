from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import CommentViewSet

router = DefaultRouter()
router.register('', CommentViewSet, base_name='')

urlpatterns = router.urls
