from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from .models import Product
from .serializers import ProductSerializer


def health(request):
    return JsonResponse({
        "status": "ok",
        "service": "ProjectJ Django API",
        "database": "sqlite3",
    })


class ProductListView(ListAPIView):
    queryset = Product.objects.all().order_by("id")
    serializer_class = ProductSerializer
