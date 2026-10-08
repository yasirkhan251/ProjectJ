from django.contrib.auth import authenticate, get_user_model
from django.db import transaction
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CartItem, Order, OrderItem, Product

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get("name", "").strip()
        email = request.data.get("email", "").strip().lower()
        password = request.data.get("password", "")
        role = request.data.get("role", "buyer")

        if not name or not email or len(password) < 8:
            return Response({"detail": "Name, email and an 8+ character password are required."}, status=400)
        if User.objects.filter(username=email).exists():
            return Response({"detail": "An account with this email already exists."}, status=400)

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
        )
        user.profile_role = role if role in {"buyer", "seller"} else "buyer"
        user.save(update_fields=["profile_role"] if hasattr(user, "profile_role") else None)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": {"id": user.id, "name": user.first_name, "email": user.email, "role": role}}, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        password = request.data.get("password", "")
        user = authenticate(username=email, password=password)
        if not user:
            return Response({"detail": "Invalid email or password."}, status=400)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": {"id": user.id, "name": user.first_name, "email": user.email, "role": getattr(user, "profile_role", "buyer")}})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"id": user.id, "name": user.first_name, "email": user.email, "role": getattr(user, "profile_role", "buyer")})


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(self._data(request.user))

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=404)
        item, created = CartItem.objects.get_or_create(user=request.user, product=product)
        item.quantity = item.quantity + quantity if not created else max(quantity, 1)
        item.save()
        return Response(self._data(request.user), status=201)

    def delete(self, request):
        product_id = request.data.get("product_id")
        CartItem.objects.filter(user=request.user, product_id=product_id).delete()
        return Response(self._data(request.user))

    def _data(self, user):
        items = []
        total = 0
        for item in CartItem.objects.select_related("product").filter(user=user):
            line_total = item.product.price * item.quantity
            total += line_total
            items.append({
                "id": item.product.id,
                "name": item.product.name,
                "price": str(item.product.price),
                "seller": item.product.seller,
                "image": item.product.image,
                "quantity": item.quantity,
                "line_total": str(line_total),
            })
        return {"items": items, "total": str(total)}


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        cart_items = list(CartItem.objects.select_related("product").filter(user=request.user))
        if not cart_items:
            return Response({"detail": "Your cart is empty."}, status=400)

        order = Order.objects.create(user=request.user)
        total = 0
        for item in cart_items:
            price = item.product.price
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, price=price)
            total += price * item.quantity
        order.total = total
        order.save(update_fields=["total"])
        CartItem.objects.filter(user=request.user).delete()

        return Response({
            "id": order.id,
            "status": order.status,
            "total": str(order.total),
        }, status=201)


class OrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by("-created_at")
        return Response([
            {"id": order.id, "status": order.status, "total": str(order.total), "created_at": order.created_at}
            for order in orders
        ])
