from django.conf import settings
from django.db import models


class Profile(models.Model):
    ROLE_CHOICES = [("buyer", "Buyer"), ("seller", "Seller")]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="buyer")
    shop_name = models.CharField(max_length=150, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.email or self.user.username


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.CharField(max_length=150)
    seller_user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="products")
    location = models.CharField(max_length=100)
    material = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    image = models.URLField(max_length=1000)
    badge = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    stock = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["user", "product"], name="unique_user_product_cart")]


class WishlistItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wishlist_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["user", "product"], name="unique_user_product_wishlist")]


class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"), ("confirmed", "Confirmed"), ("shipped", "Shipped"),
        ("delivered", "Delivered"), ("cancelled", "Cancelled"),
    ]
    PAYMENT_CHOICES = [("cod", "Cash on Delivery"), ("razorpay", "Razorpay")]
    PAYMENT_STATUS = [("pending", "Pending"), ("paid", "Paid"), ("failed", "Failed")]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default="cod")
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default="pending")
    payment_reference = models.CharField(max_length=200, blank=True)
    shipping_name = models.CharField(max_length=150, blank=True)
    shipping_phone = models.CharField(max_length=30, blank=True)
    shipping_address = models.TextField(blank=True)

    def __str__(self):
        return f"Order #{self.pk}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)


class CommunityPost(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="community_posts")
    body = models.TextField()
    image = models.URLField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class CommunityComment(models.Model):
    post = models.ForeignKey(CommunityPost, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class CommunityLike(models.Model):
    post = models.ForeignKey(CommunityPost, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["post", "user"], name="unique_post_like")]


class Collaboration(models.Model):
    STATUS_CHOICES = [("pending", "Pending"), ("accepted", "Accepted"), ("declined", "Declined")]
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_collaborations")
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="received_collaborations")
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
