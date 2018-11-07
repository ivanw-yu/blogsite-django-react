from rest_framework.routers import DefaultRouter

from .views import RatingViewSet

router = DefaultRouter()
router.register('', RatingViewSet, base_name = '')

urlpatterns = router.urls
