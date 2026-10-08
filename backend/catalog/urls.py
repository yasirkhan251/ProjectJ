from django.urls import path
from .views import health, ProductListView

urlpatterns = [
    path("health/", health, name="health"),
    path("products/", ProductListView.as_view(), name="products"),
]
