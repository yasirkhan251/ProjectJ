from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "name", "category", "price", "seller", "location",
            "material", "rating", "image", "badge",
        ]

    def get_rating(self, obj):
        return f"{obj.rating:.1f}"
