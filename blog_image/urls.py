from rest_framework.routers import DefaultRouter
from .views import BlogImageViewSet

router = DefaultRouter()
router.register('', BlogImageViewSet, base_name='')

urlpatterns = router.urls
