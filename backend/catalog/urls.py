from django.urls import path
from .views import health
from .api_views import ProductListView, ProductDetailView, CartView, WishlistView, CheckoutView, OrdersView, SellerOrdersView, CommunityView, CommunityActionView, CollaborationView
from .auth_views import RegisterView, LoginView, MeView, ProfileView

urlpatterns = [
    path("health/", health),
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginView.as_view()),
    path("auth/me/", MeView.as_view()),
    path("auth/profile/", ProfileView.as_view()),
    path("products/", ProductListView.as_view()),
    path("products/<int:pk>/", ProductDetailView.as_view()),
    path("cart/", CartView.as_view()),
    path("wishlist/", WishlistView.as_view()),
    path("checkout/", CheckoutView.as_view()),
    path("orders/", OrdersView.as_view()),
    path("seller/orders/", SellerOrdersView.as_view()),
    path("community/", CommunityView.as_view()),
    path("community/<int:pk>/", CommunityActionView.as_view()),
    path("collaborations/", CollaborationView.as_view()),
]
