from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile

User = get_user_model()


def user_data(user):
    profile, _ = Profile.objects.get_or_create(user=user)
    return {"id": user.id, "name": user.first_name or user.username, "email": user.email,
            "role": profile.role, "shop_name": profile.shop_name, "bio": profile.bio, "location": profile.location}


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        name = request.data.get("name", "").strip()
        email = request.data.get("email", "").strip().lower()
        password = request.data.get("password", "")
        role = request.data.get("role", "buyer")
        shop_name = request.data.get("shop_name", "").strip()
        if not name or not email or len(password) < 8:
            return Response({"detail": "Name, email and an 8+ character password are required."}, status=400)
        if User.objects.filter(username=email).exists():
            return Response({"detail": "An account with this email already exists."}, status=400)
        user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
        Profile.objects.create(user=user, role=role if role in {"buyer", "seller"} else "buyer", shop_name=shop_name)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": user_data(user)}, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        user = authenticate(username=email, password=request.data.get("password", ""))
        if not user:
            return Response({"detail": "Invalid email or password."}, status=400)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": user_data(user)})


class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(user_data(request.user))


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user)
        request.user.first_name = request.data.get("name", request.user.first_name)
        request.user.email = request.data.get("email", request.user.email)
        request.user.save(update_fields=["first_name", "email"])
        for field in ("bio", "location", "shop_name"):
            if field in request.data:
                setattr(profile, field, request.data[field])
        profile.save()
        return Response(user_data(request.user))
