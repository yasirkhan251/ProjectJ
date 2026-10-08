from .models import Product

PRODUCTS = [
    ("The Earthstone Vase", "Pottery", 1890, "Mitti & Form", "Jaipur", "Ceramic", "4.9", "https://images.unsplash.com/photo-1784901391803-09c02839a838?auto=format&fit=crop&w=850&q=85", "Bestseller"),
    ("Handwoven Cotton Throw", "Textiles", 2450, "The Loom Room", "Kutch", "Cotton", "4.8", "https://images.unsplash.com/photo-1507434745378-235a6297156b?auto=format&fit=crop&w=850&q=85", "New"),
    ("Golden Hour Abstract", "Paintings", 4200, "Aditi Menon", "Kochi", "Canvas", "5.0", "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=850&q=85", ""),
    ("Carved Wooden Bowls", "Woodwork", 1650, "Grain & Grain", "Saharanpur", "Wood", "4.9", "https://images.unsplash.com/photo-1765120827286-5bf71b7c50e0?auto=format&fit=crop&w=850&q=85", ""),
    ("Everyday Brass Ring", "Jewellery", 990, "Studio Sona", "Delhi", "Brass", "4.7", "https://images.unsplash.com/photo-1677144197448-b22fbe45c226?auto=format&fit=crop&w=850&q=85", "New"),
    ("Ceramic Serving Bowls", "Pottery", 2290, "Mitti & Form", "Jaipur", "Ceramic", "4.9", "https://images.unsplash.com/photo-1784921305660-51269e12e68f?auto=format&fit=crop&w=850&q=85", ""),
    ("Artisan Leather Tote", "Leatherwork", 3490, "Karigar Co.", "Mumbai", "Leather", "4.8", "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?auto=format&fit=crop&w=850&q=85", ""),
    ("Woven Wall Hanging", "Textiles", 1980, "The Loom Room", "Kutch", "Cotton", "4.8", "https://images.unsplash.com/photo-1672302255324-28009cc288b2?auto=format&fit=crop&w=850&q=85", ""),
]


def run():
    for item in PRODUCTS:
        Product.objects.update_or_create(name=item[0], defaults={
            "category": item[1], "price": item[2], "seller": item[3],
            "location": item[4], "material": item[5], "rating": item[6],
            "image": item[7], "badge": item[8],
        })
    print(f"Seeded {len(PRODUCTS)} products.")
