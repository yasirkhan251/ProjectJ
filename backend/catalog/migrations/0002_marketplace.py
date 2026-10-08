from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("catalog", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("role", models.CharField(choices=[("buyer", "Buyer"), ("seller", "Seller")], default="buyer", max_length=10)),
                ("shop_name", models.CharField(blank=True, max_length=150)),
                ("bio", models.TextField(blank=True)),
                ("location", models.CharField(blank=True, max_length=100)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="profile", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="CartItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("quantity", models.PositiveIntegerField(default=1)),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="catalog.product")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="cart_items", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="WishlistItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="catalog.product")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="wishlist_items", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("status", models.CharField(choices=[("pending","Pending"),("confirmed","Confirmed"),("shipped","Shipped"),("delivered","Delivered"),("cancelled","Cancelled")], default="pending", max_length=20)),
                ("total", models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ("payment_method", models.CharField(choices=[("cod","Cash on Delivery"),("razorpay","Razorpay")], default="cod", max_length=20)),
                ("payment_status", models.CharField(choices=[("pending","Pending"),("paid","Paid"),("failed","Failed")], default="pending", max_length=20)),
                ("payment_reference", models.CharField(blank=True, max_length=200)),
                ("shipping_name", models.CharField(blank=True, max_length=150)),
                ("shipping_phone", models.CharField(blank=True, max_length=30)),
                ("shipping_address", models.TextField(blank=True)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="orders", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="OrderItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("quantity", models.PositiveIntegerField(default=1)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("order", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="catalog.order")),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="catalog.product")),
            ],
        ),
        migrations.CreateModel(
            name="CommunityPost",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("body", models.TextField()),
                ("image", models.URLField(blank=True, max_length=1000)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("author", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="community_posts", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="CommunityComment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("body", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("author", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ("post", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="comments", to="catalog.communitypost")),
            ],
        ),
        migrations.CreateModel(
            name="CommunityLike",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("post", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="likes", to="catalog.communitypost")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="Collaboration",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("message", models.TextField()),
                ("status", models.CharField(choices=[("pending","Pending"),("accepted","Accepted"),("declined","Declined")], default="pending", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("recipient", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="received_collaborations", to=settings.AUTH_USER_MODEL)),
                ("sender", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="sent_collaborations", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(model_name="product", name="description", field=models.TextField(blank=True)),
        migrations.AddField(model_name="product", name="seller_user", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="products", to=settings.AUTH_USER_MODEL)),
        migrations.AddField(model_name="product", name="stock", field=models.PositiveIntegerField(default=10)),
        migrations.AddField(model_name="product", name="created_at", field=models.DateTimeField(auto_now_add=True)),
        migrations.AddConstraint(model_name="cartitem", constraint=models.UniqueConstraint(fields=("user","product"), name="unique_user_product_cart")),
        migrations.AddConstraint(model_name="wishlistitem", constraint=models.UniqueConstraint(fields=("user","product"), name="unique_user_product_wishlist")),
        migrations.AddConstraint(model_name="communitylike", constraint=models.UniqueConstraint(fields=("post","user"), name="unique_post_like")),
    ]
