from decimal import Decimal
from django.db import transaction
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, CartItem, WishlistItem, Order, OrderItem, CommunityPost, CommunityComment, CommunityLike, Collaboration, Profile


def product_data(p):
    return {"id": p.id, "name": p.name, "category": p.category, "price": str(p.price), "seller": p.seller,
            "location": p.location, "material": p.material, "rating": f"{p.rating:.1f}", "image": p.image,
            "badge": p.badge, "description": p.description, "stock": p.stock}


class ProductListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    def get_queryset(self):
        qs = Product.objects.all().order_by("-created_at")
        q = self.request.query_params.get("q")
        category = self.request.query_params.get("category")
        location = self.request.query_params.get("location")
        material = self.request.query_params.get("material")
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")
        if q: qs = qs.filter(Q(name__icontains=q) | Q(category__icontains=q) | Q(seller__icontains=q) | Q(material__icontains=q))
        if category and category != "All": qs = qs.filter(category=category)
        if location and location != "All locations": qs = qs.filter(location=location)
        if material and material != "All materials": qs = qs.filter(material=material)
        if min_price: qs = qs.filter(price__gte=min_price)
        if max_price: qs = qs.filter(price__lte=max_price)
        return qs
    def list(self, request, *args, **kwargs):
        return Response([product_data(p) for p in self.get_queryset()])
    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not hasattr(request.user, "profile") or request.user.profile.role != "seller":
            return Response({"detail": "Seller account required."}, status=403)
        data = request.data
        p = Product.objects.create(name=data.get("name",""), category=data.get("category",""), price=data.get("price",0),
            seller=request.user.profile.shop_name or request.user.first_name, seller_user=request.user,
            location=data.get("location",""), material=data.get("material",""), image=data.get("image",""),
            badge=data.get("badge",""), description=data.get("description",""), stock=data.get("stock",0))
        return Response(product_data(p), status=201)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Product.objects.all()
    def retrieve(self, request, *args, **kwargs): return Response(product_data(self.get_object()))
    def update(self, request, *args, **kwargs):
        p = self.get_object()
        if not request.user.is_authenticated or p.seller_user_id != request.user.id:
            return Response({"detail": "Only the product owner can edit this product."}, status=403)
        for field in ("name","category","price","location","material","image","badge","description","stock"):
            if field in request.data: setattr(p, field, request.data[field])
        p.save(); return Response(product_data(p))
    def destroy(self, request, *args, **kwargs):
        p = self.get_object()
        if not request.user.is_authenticated or p.seller_user_id != request.user.id:
            return Response({"detail": "Only the product owner can delete this product."}, status=403)
        p.delete(); return Response(status=204)


class CartView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): return Response(self.data(request.user))
    def post(self, request):
        try: product = Product.objects.get(pk=request.data.get("product_id"))
        except Product.DoesNotExist: return Response({"detail":"Product not found."}, status=404)
        qty = max(int(request.data.get("quantity", 1)), 1)
        if product.stock < qty: return Response({"detail":"Not enough stock."}, status=400)
        item, created = CartItem.objects.get_or_create(user=request.user, product=product)
        item.quantity = qty if created else min(item.quantity + qty, product.stock); item.save()
        return Response(self.data(request.user), status=201)
    def patch(self, request):
        try: item = CartItem.objects.get(user=request.user, product_id=request.data.get("product_id"))
        except CartItem.DoesNotExist: return Response({"detail":"Cart item not found."}, status=404)
        item.quantity = max(1, int(request.data.get("quantity", 1))); item.save()
        return Response(self.data(request.user))
    def delete(self, request):
        CartItem.objects.filter(user=request.user, product_id=request.data.get("product_id")).delete()
        return Response(self.data(request.user))
    def data(self, user):
        items=[]; total=Decimal("0")
        for item in CartItem.objects.select_related("product").filter(user=user):
            line=item.product.price*item.quantity; total+=line
            items.append({"id":item.product.id,"name":item.product.name,"price":str(item.product.price),"seller":item.product.seller,
                          "image":item.product.image,"quantity":item.quantity,"line_total":str(line)})
        return {"items":items,"total":str(total)}


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): return Response([product_data(x.product) for x in WishlistItem.objects.select_related("product").filter(user=request.user)])
    def post(self, request):
        try: p=Product.objects.get(pk=request.data.get("product_id"))
        except Product.DoesNotExist: return Response({"detail":"Product not found."},status=404)
        item, created=WishlistItem.objects.get_or_create(user=request.user, product=p)
        if not created: item.delete()
        return Response({"saved":created})


class CheckoutView(APIView):
    permission_classes=[IsAuthenticated]
    @transaction.atomic
    def post(self, request):
        items=list(CartItem.objects.select_related("product").filter(user=request.user))
        if not items: return Response({"detail":"Your cart is empty."},status=400)
        for item in items:
            if item.product.stock < item.quantity: return Response({"detail":f"Insufficient stock for {item.product.name}."},status=400)
        total=sum((i.product.price*i.quantity for i in items), Decimal("0"))
        method=request.data.get("payment_method","cod")
        order=Order.objects.create(user=request.user,total=total,payment_method=method,
            shipping_name=request.data.get("shipping_name",""),shipping_phone=request.data.get("shipping_phone",""),
            shipping_address=request.data.get("shipping_address",""))
        for item in items:
            OrderItem.objects.create(order=order,product=item.product,quantity=item.quantity,price=item.product.price)
            item.product.stock-=item.quantity; item.product.save(update_fields=["stock"])
        CartItem.objects.filter(user=request.user).delete()
        return Response({"id":order.id,"status":order.status,"payment_status":order.payment_status,"total":str(order.total)},status=201)


class OrdersView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        qs=Order.objects.filter(user=request.user).prefetch_related("items__product").order_by("-created_at")
        return Response([{"id":o.id,"status":o.status,"payment_method":o.payment_method,"payment_status":o.payment_status,
                         "total":str(o.total),"created_at":o.created_at,
                         "items":[{"name":i.product.name,"quantity":i.quantity,"price":str(i.price),"image":i.product.image} for i in o.items.all()]} for o in qs])


class SellerOrdersView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        if request.user.profile.role!="seller": return Response({"detail":"Seller account required."},status=403)
        orders=Order.objects.filter(items__product__seller_user=request.user).distinct().prefetch_related("items__product")
        return Response([{"id":o.id,"status":o.status,"total":str(o.total),"created_at":o.created_at,
                         "items":[{"name":i.product.name,"quantity":i.quantity,"price":str(i.price)} for i in o.items.all() if i.product.seller_user_id==request.user.id]} for o in orders])


class CommunityView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        posts=CommunityPost.objects.select_related("author").prefetch_related("comments__author","likes").order_by("-created_at")
        return Response([{"id":p.id,"author":p.author.first_name or p.author.username,"body":p.body,"image":p.image,
                         "created_at":p.created_at,"likes":p.likes.count(),"liked":p.likes.filter(user=request.user).exists(),
                         "comments":[{"id":c.id,"author":c.author.first_name or c.author.username,"body":c.body} for c in p.comments.all()]} for p in posts])
    def post(self, request):
        p=CommunityPost.objects.create(author=request.user,body=request.data.get("body",""),image=request.data.get("image",""))
        return Response({"id":p.id},status=201)


class CommunityActionView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request, pk):
        p=CommunityPost.objects.get(pk=pk); like,_=CommunityLike.objects.get_or_create(post=p,user=request.user)
        if not like.created: like.delete()
        return Response({"liked":like.created})
    def patch(self, request, pk):
        p=CommunityPost.objects.get(pk=pk); c=CommunityComment.objects.create(post=p,author=request.user,body=request.data.get("body",""))
        return Response({"id":c.id},status=201)


class CollaborationView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        qs=Collaboration.objects.filter(Q(sender=request.user)|Q(recipient=request.user)).select_related("sender","recipient").order_by("-created_at")
        return Response([{"id":c.id,"sender":c.sender.first_name or c.sender.username,"recipient":c.recipient.first_name or c.recipient.username,
                         "message":c.message,"status":c.status,"created_at":c.created_at} for c in qs])
    def post(self, request):
        recipient_id=request.data.get("recipient_id")
        try: recipient=Profile.objects.select_related("user").get(user_id=recipient_id).user
        except Profile.DoesNotExist: return Response({"detail":"Recipient not found."},status=404)
        c=Collaboration.objects.create(sender=request.user,recipient=recipient,message=request.data.get("message",""))
        return Response({"id":c.id,"status":c.status},status=201)
