from rest_framework.pagination import PageNumberPagination

class RatingsPagination(PageNumberPagination):
    page_size = 2
    page_size_query_name = "page_size"
    maximum_page_size = 30
