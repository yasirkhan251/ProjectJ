import { useEffect, useState } from "react"

type Page = "home" | "marketplace" | "product" | "shop" | "community" | "collaborations" | "dashboard" | "login" | "register"
type Product = {
  id: number
  name: string
  category: string
  price: number
  seller: string
  location: string
  material: string
  rating: string
  image: string
  badge?: string
}

const img = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const images = {
  hero: img("photo-1493106641515-6b5631de4bb9", 1300),
  pottery: img("photo-1715260746966-d87824ef73de", 850),
  textile: img("photo-1507434745378-235a6297156b", 850),
  painting: img("photo-1605721911519-3dfeb3be25e7", 850),
  wood: img("photo-1765120827286-5bf71b7c50e0", 850),
  jewelry: img("photo-1677144197448-b22fbe45c226", 850),
  leather: img("photo-1473188588951-666fce8e7c68", 850),
  vase: img("photo-1784901391803-09c02839a838", 850),
  bowls: img("photo-1784921305660-51269e12e68f", 850),
  studio: img("photo-1507022787381-b30170b5ebf4", 1200),
  maker: img("photo-1715845779797-ee1e42374925", 900),
  weaving: img("photo-1672302255324-28009cc288b2", 900),
  carving: img("photo-1721508490084-1b1de5b230d4", 900),
  reels: img("photo-1613833684971-9411a2b00970", 900),
}

const products: Product[] = [
  {
    id: 1,
    name: "The Earthstone Vase",
    category: "Pottery",
    price: 1890,
    seller: "Mitti & Form",
    location: "Jaipur",
    material: "Ceramic",
    rating: "4.9",
    image: images.vase,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Handwoven Cotton Throw",
    category: "Textiles",
    price: 2450,
    seller: "The Loom Room",
    location: "Kutch",
    material: "Cotton",
    rating: "4.8",
    image: images.textile,
    badge: "New",
  },
  {
    id: 3,
    name: "Golden Hour Abstract",
    category: "Paintings",
    price: 4200,
    seller: "Aditi Menon",
    location: "Kochi",
    material: "Canvas",
    rating: "5.0",
    image: images.painting,
  },
  {
    id: 4,
    name: "Carved Wooden Bowls",
    category: "Woodwork",
    price: 1650,
    seller: "Grain & Grain",
    location: "Saharanpur",
    material: "Wood",
    rating: "4.9",
    image: images.wood,
  },
  {
    id: 5,
    name: "Everyday Brass Ring",
    category: "Jewellery",
    price: 990,
    seller: "Studio Sona",
    location: "Delhi",
    material: "Brass",
    rating: "4.7",
    image: images.jewelry,
    badge: "New",
  },
  {
    id: 6,
    name: "Ceramic Serving Bowls",
    category: "Pottery",
    price: 2290,
    seller: "Mitti & Form",
    location: "Jaipur",
    material: "Ceramic",
    rating: "4.9",
    image: images.bowls,
  },
  {
    id: 7,
    name: "Artisan Leather Tote",
    category: "Leatherwork",
    price: 3490,
    seller: "Karigar Co.",
    location: "Mumbai",
    material: "Leather",
    rating: "4.8",
    image: images.leather,
  },
  {
    id: 8,
    name: "Woven Wall Hanging",
    category: "Textiles",
    price: 1980,
    seller: "The Loom Room",
    location: "Kutch",
    material: "Cotton",
    rating: "4.8",
    image: images.weaving,
  },
]

const categories = [
  { name: "Pottery", image: images.pottery },
  { name: "Paintings", image: images.painting },
  { name: "Woodwork", image: images.wood },
  { name: "Textiles", image: images.textile },
  { name: "Jewellery", image: images.jewelry },
  { name: "Leatherwork", image: images.leather },
]

function Icon({
  name,
  size = 20,
  stroke = 1.8,
}: {
  name: string
  size?: number
  stroke?: number
}) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h16m-7-7 7 7-7 7" />
      </>
    ),
    upRight: (
      <>
        <path d="M5 19 19 5M8 5h11v11" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    left: <path d="m15 18-6-6 6-6" />,
    heart: (
      <path d="M20.8 8.6c0 4.1-8.8 10.3-8.8 10.3S3.2 12.7 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" />
    ),
    star: (
      <path d="m12 2 3 6.5 7 .9-5.1 4.8 1.3 7-6.2-3.4-6.2 3.4 1.3-7L2 9.4l7-.9L12 2Z" />
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M5 5 19 19M19 5 5 19" />,
    filter: (
      <>
        <path d="M4 7h16M7 12h10m-7 5h4" />
        <circle cx="8" cy="7" r="1" />
        <circle cx="15" cy="12" r="1" />
      </>
    ),
    message: (
      <path d="M20 11a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L4 20l1.2-4A8 8 0 1 1 20 11Z" />
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7" />
        <path d="M10 11v5m4-5v5" />
      </>
    ),
    edit: (
      <>
        <path d="m4 16 11-11 4 4-11 11-5 1 1-5Z" />
        <path d="m13 7 4 4" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    box: (
      <>
        <path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z" />
        <path d="m3 7 9 4 9-4M12 11v10" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [selected, setSelected] = useState<Product>(products[0])
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("Featured")
  const [location, setLocation] = useState("All locations")
  const [material, setMaterial] = useState("All materials")
  const [price, setPrice] = useState("Any price")
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopTab, setShopTab] = useState("Products")
  const [dashboardTab, setDashboardTab] = useState("Dashboard")
  const [shopProducts, setShopProducts] = useState<Product[]>(
    products.filter((p) => p.seller === "Mitti & Form"),
  )
  const [liked, setLiked] = useState<number[]>([])
  const [followed, setFollowed] = useState(false)
  const [toast, setToast] = useState("")
  const [authRole, setAuthRole] = useState<"buyer" | "seller">("buyer")
  const [galleryImage, setGalleryImage] = useState("")
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "offline">("checking")
  const [user, setUser] = useState<{id:number; name:string; email:string; role:string} | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl}/health/`).then((response) => {
        if (!response.ok) throw new Error("Backend unavailable")
        return response.json()
      }),
      fetch(`${apiUrl}/products/`).then((response) => {
        if (!response.ok) throw new Error("Products API unavailable")
        return response.json()
      }),
    ])
      .then(([, productData]) => {
        const savedUser = localStorage.getItem("projectj_user")
        if (savedUser) setUser(JSON.parse(savedUser))
        const apiProducts = Array.isArray(productData) ? productData : productData.results
        if (Array.isArray(apiProducts) && apiProducts.length) {
          setShopProducts(apiProducts.filter((product: Product) => product.seller === "Mitti & Form"))
        }
        setBackendStatus("connected")
      })
      .catch(() => setBackendStatus("offline"))
  }, [])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(""), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const navigate = (next: Page) => {
    setPage(next)
    setMenuOpen(false)
    setCartOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openProduct = (p: Product) => {
    setSelected(p)
    setGalleryImage(p.image)
    navigate("product")
  }
  const browse = (cat = "All") => {
    setCategory(cat)
    navigate("marketplace")
  }
  const addCart = async (p: Product) => {
    const savedToken = localStorage.getItem("projectj_token")
    if (!savedToken) { setToast("Please sign in before adding items to your bag."); navigate("login"); return }
    try {
      const response = await fetch(`${apiUrl}/cart/`, { method: "POST", headers: { Authorization: `Token ${savedToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ product_id: p.id, quantity: 1 }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || "Unable to add item")
      const mapped: Product[] = data.items.flatMap((item: any) => Array.from({ length: item.quantity }, () => products.find(x => x.id === item.id) || item))
      setCart(mapped); setToast(`${p.name} added to your bag`)
    } catch (error) { setToast(error instanceof Error ? error.message : "Could not add this item.") }
  }
  const search = (e: React.FormEvent) => {
    e.preventDefault()
    browse()
  }
  const visibleProducts = products
    .filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!query ||
          `${p.name} ${p.category} ${p.seller} ${p.location} ${p.material}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (location === "All locations" || p.location === location) &&
        (material === "All materials" || p.material === material) &&
        (price === "Any price" ||
          (price === "Under ₹2,000"
            ? p.price < 2000
            : price === "₹2,000–₹3,000"
              ? p.price >= 2000 && p.price <= 3000
              : p.price > 3000)),
    )
    .sort((a, b) =>
      sort === "Price: low to high"
        ? a.price - b.price
        : sort === "Price: high to low"
          ? b.price - a.price
          : sort === "Newest"
            ? b.id - a.id
            : a.id - b.id,
    )

  const ProductCard = ({ product }: { product: Product }) => (
    <article className="product-card">
      <div
        className="product-image-wrap"
        onClick={() => openProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openProduct(product)}
        aria-label={`View ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <button
          className="quick-add"
          onClick={(e) => {
            e.stopPropagation()
            addCart(product)
          }}
          aria-label={`Add ${product.name} to bag`}
        >
          <Icon name="plus" size={19} />
        </button>
      </div>
      <div className="product-meta">
        <span>{product.category}</span>
        <span className="rating">
          <Icon name="star" size={13} /> {product.rating}
        </span>
      </div>
      <button className="product-name" onClick={() => openProduct(product)}>
        {product.name}
      </button>
      <div className="product-bottom">
        <span>by {product.seller}</span>
        <strong>{money(product.price)}</strong>
      </div>
    </article>
  )

  const SectionHeading = ({
    eyebrow,
    title,
    description,
    action,
    onAction,
  }: {
    eyebrow: string
    title: string
    description?: string
    action?: string
    onAction?: () => void
  }) => (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && (
        <button className="text-link" onClick={onAction}>
          {action} <Icon name="arrow" size={18} />
        </button>
      )}
    </div>
  )

  const Header = () => (
    <>
      <div className="announcement">
        Made with hands. Made with heart.{" "}
        <span className="announcement-message">Discover India's independent makers</span>{" "}
        <span className="announcement-spark">✳</span>
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <button
            className="brand"
            onClick={() => navigate("home")}
            aria-label="Aangan home"
          >
            <span className="brand-symbol">✳</span>
            <span className="header-brand-word">
              Company Name<span className="brand-dot">.</span>
              <small>THE MAKER MARKETPLACE</small>
            </span>
          </button>
          <form className="header-search" onSubmit={search}>
            <Icon name="search" size={19} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for something special..."
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">
              <Icon name="arrow" size={18} />
            </button>
          </form>
          <div className="header-actions">
            <button
              className="icon-action account-action"
              onClick={() => navigate(user ? "dashboard" : "login")}
              aria-label="Login"
            >
              <Icon name="user" size={22} />
              <span>{user ? user.name : "Account"}</span>
            </button>
            <button
              className="icon-action cart-action"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag with ${cart.length} items`}
            >
              <Icon name="bag" size={22} />
              <span>Bag</span>
              {cart.length > 0 && <b>{cart.length}</b>}
            </button>
            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={25} />
            </button>
          </div>
        </div>
        <nav
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <div className="container nav-inner">
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => navigate("home")}
            >
              Home
            </button>
            <button
              className={
                page === "marketplace" || page === "product" ? "active" : ""
              }
              onClick={() => browse()}
            >
              Shop all
            </button>
            <button onClick={() => browse("Pottery")}>Pottery</button>
            <button onClick={() => browse("Textiles")}>Textiles</button>
            <button onClick={() => browse("Jewellery")}>Jewellery</button>
            <button
              className={page === "community" ? "active" : ""}
              onClick={() => navigate("community")}
            >
              Community
            </button>
            <button
              className={page === "collaborations" ? "active" : ""}
              onClick={() => navigate("collaborations")}
            >
              Collaborations
            </button>
            <button
              className="nav-seller"
              onClick={() => {
                setAuthRole("seller")
                navigate("register")
              }}
            >
              Become a seller <Icon name="upRight" size={15} />
            </button>
          </div>
        </nav>
      </header>
    </>
  )

  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-intro">
            <button
              className="brand footer-brand"
              onClick={() => navigate("home")}
            >
              <span className="brand-symbol">✳</span>
              <span>
                aangan<span className="brand-dot">.</span>
                <small>THE MAKER MARKETPLACE</small>
              </span>
            </button>
            <p>
              A home for beautiful things and the hands that make them.
              Thoughtfully made, joyfully found.
            </p>
            <div className="socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                Pinterest ↗
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <button onClick={() => browse()}>Shop all</button>
              <button onClick={() => navigate("shop")}>Meet the makers</button>
              <button onClick={() => navigate("community")}>Community</button>
              <button onClick={() => navigate("collaborations")}>
                Collaborations
              </button>
            </div>
            <div>
              <h4>Information</h4>
              <button
                onClick={() =>
                  setToast(
                    "About Aangan: a place to celebrate independent Indian craft.",
                  )
                }
              >
                About us
              </button>
              <a href="mailto:hello@aangan.example">Contact</a>
              <button
                onClick={() =>
                  setToast("Need help? Email hello@aangan.example")
                }
              >
                Help & FAQs
              </button>
              <button
                onClick={() =>
                  setToast("Seller guidelines will be available at launch.")
                }
              >
                Seller guidelines
              </button>
            </div>
            <div>
              <h4>For makers</h4>
              <button
                onClick={() => {
                  setAuthRole("seller")
                  navigate("register")
                }}
              >
                Start your shop
              </button>
              <button onClick={() => navigate("dashboard")}>
                Seller dashboard
              </button>
              <button onClick={() => navigate("collaborations")}>
                Find collaborators
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aangan. Made for the makers of India.</span>
          <span>Handmade with heart, from India.</span>
        </div>
      </div>
    </footer>
  )

  const Home = () => (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" /> THE HOME OF HANDMADE
            </span>
            <h1>
              Discover <em>Handmade.</em>
              <br />
              Support Independent <em>Artists.</em>
            </h1>
            <p>
              One-of-a-kind creations, meaningful stories, and the makers behind
              them. Find something that feels like you.
            </p>
            <form className="hero-search" onSubmit={search}>
              <Icon name="search" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search crafts, materials, makers or places"
                aria-label="Search crafts, materials, makers or places"
              />
              <button type="submit" aria-label="Search marketplace">
                <Icon name="arrow" size={18} />
              </button>
            </form>
            <div className="hero-buttons">
              <button className="btn btn-dark" onClick={() => browse()}>
                Explore the marketplace <Icon name="arrow" size={19} />
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("shop")}
              >
                Meet our makers
              </button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <img src={images.maker} alt="" />
                <img src={images.weaving} alt="" />
                <img src={images.carving} alt="" />
              </div>
              <div>
                <strong>Made by real people</strong>
                <span>Celebrating craft across India</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-main-image">
              <img
                src={images.hero}
                alt="Artisan shaping clay on a pottery wheel"
              />
            </div>
            <div className="hero-small-image">
              <img src={images.textile} alt="Colorful artisan textiles" />
            </div>
            <div className="hero-note">
              <span className="note-flower">✳</span>
              <div>
                <strong>Crafted with care</strong>
                <small>Not mass-produced. Made to matter.</small>
              </div>
            </div>
            <span className="hero-vertical">
              A LITTLE MORE HUMAN, A LOT MORE BEAUTIFUL
            </span>
          </div>
        </div>
      </section>
      <div className="benefits">
        <div className="container benefits-inner">
          <div>
            <span>✳</span> Curated handmade finds
          </div>
          <div>
            <span>✳</span> Direct from independent makers
          </div>
          <div>
            <span>✳</span> Every purchase tells a story
          </div>
        </div>
      </div>
      <section className="section categories-section container">
        <SectionHeading
          eyebrow="EXPLORE BY CRAFT"
          title="Find your kind of beautiful."
          description="From clay to canvas, discover the craft that speaks to you."
          action="Explore all crafts"
          onAction={() => browse()}
        />
        <div className="category-grid">
          {categories.map((cat) => (
            <button
              className="category-card"
              key={cat.name}
              onClick={() => browse(cat.name)}
            >
              <div className="category-image">
                <img src={cat.image} alt={`${cat.name} craft`} loading="lazy" />
              </div>
              <span>
                {cat.name} <Icon name="upRight" size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <SectionHeading
            eyebrow="THE GOOD STUFF"
            title="Made to be treasured."
            description="Thoughtful finds with a little bit of soul, picked just for you."
            action="Shop all products"
            onAction={() => browse()}
          />
          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="section makers-section container">
        <SectionHeading
          eyebrow="PEOPLE BEHIND THE PIECES"
          title="Meet the makers."
          description="Beautiful work starts with a person and a story worth sharing."
          action="Discover all shops"
          onAction={() => navigate("shop")}
        />
        <div className="maker-grid">
          <button
            className="maker-card maker-card-large"
            onClick={() => navigate("shop")}
          >
            <img
              src={images.studio}
              alt="Potter at work in their studio"
              loading="lazy"
            />
            <div className="maker-card-shade" />
            <div className="maker-content">
              <span>01 / ARTISAN SPOTLIGHT</span>
              <h3>Mitti & Form</h3>
              <p>Clay, curiosity, and slow afternoons in Jaipur.</p>
              <span className="maker-link">
                Visit the shop <Icon name="arrow" size={18} />
              </span>
            </div>
          </button>
          <button className="maker-card" onClick={() => navigate("shop")}>
            <img
              src={images.weaving}
              alt="Artisan working with textiles"
              loading="lazy"
            />
            <div className="maker-card-shade" />
            <div className="maker-content">
              <span>02 / MAKER STORY</span>
              <h3>The Loom Room</h3>
              <p>Woven stories from the heart of Kutch.</p>
              <span className="maker-link">
                Meet the maker <Icon name="arrow" size={18} />
              </span>
            </div>
          </button>
        </div>
      </section>
      <section className="community-banner">
        <div className="container community-banner-grid">
          <div className="community-image">
            <img
              src={images.maker}
              alt="Artist working on handmade pottery"
              loading="lazy"
            />
            <div className="community-image-label">
              GOOD THINGS GROW TOGETHER ✳
            </div>
          </div>
          <div className="community-copy">
            <span className="eyebrow">MORE THAN A MARKETPLACE</span>
            <h2>
              Good things happen <em>when makers meet.</em>
            </h2>
            <p>
              A space to share your process, swap ideas, find inspiration, and
              cheer each other on. Because creativity is even better together.
            </p>
            <div className="community-stats">
              <div>
                <strong>1.2k+</strong>
                <span>Creative minds</span>
              </div>
              <div>
                <strong>28</strong>
                <span>States represented</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>Ideas to share</span>
              </div>
            </div>
            <button
              className="btn btn-dark"
              onClick={() => navigate("community")}
            >
              Explore the community <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </section>
      <section className="section collaborations-preview container">
        <SectionHeading
          eyebrow="BETTER TOGETHER"
          title="Different crafts. New possibilities."
          description="See what happens when creative minds come together."
          action="Explore collaborations"
          onAction={() => navigate("collaborations")}
        />
        <div className="collab-preview-grid">
          <div className="collab-preview-photo">
            <img
              src={images.bowls}
              alt="Painted handmade ceramics"
              loading="lazy"
            />
          </div>
          <div className="collab-preview-copy">
            <span className="pill">FEATURED COLLABORATION</span>
            <h3>Where clay meets canvas</h3>
            <p>
              A potter and a painter reimagine everyday ceramics as little
              pieces of art. Two different practices, one beautiful idea.
            </p>
            <div className="collab-credits">
              <span>MF</span>
              <span>AM</span>
              <p>
                Mitti & Form <b>×</b> Aditi Menon
              </p>
            </div>
            <button
              className="text-link"
              onClick={() => navigate("collaborations")}
            >
              Read the story <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </section>
      <section className="section reels-section">
        <div className="container">
          <SectionHeading
            eyebrow="BEHIND THE SCENES"
            title="The beauty is in the making."
            description="A little peek into the processes, places, and people behind the pieces."
          />
          <div className="reels-grid">
            {[
              {
                image: images.reels,
                title: "A day at the pottery wheel",
                by: "Mitti & Form",
              },
              {
                image: images.weaving,
                title: "Threads that tell stories",
                by: "The Loom Room",
              },
              {
                image: images.carving,
                title: "The art of working with wood",
                by: "Grain & Grain",
              },
            ].map((reel) => (
              <button
                className="reel-card"
                key={reel.title}
                onClick={() => setToast("Maker videos are coming soon.")}
              >
                <img src={reel.image} alt={reel.title} loading="lazy" />
                <span className="play-button">
                  <Icon name="play" size={21} />
                </span>
                <span className="reel-caption">
                  <strong>{reel.title}</strong>
                  <small>{reel.by}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="seller-cta">
        <div className="container seller-cta-inner">
          <div>
            <span className="eyebrow">TO THE MAKERS & DREAMERS</span>
            <h2>
              Your craft deserves <em>to be seen.</em>
            </h2>
            <p>
              Turn your passion into a shop of your own. We'll make the journey
              feel right at home.
            </p>
            <button
              className="btn btn-cream"
              onClick={() => {
                setAuthRole("seller")
                navigate("register")
              }}
            >
              Start your shop <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="cta-decoration" aria-hidden="true">
            ✳
          </div>
        </div>
      </section>
    </main>
  )

  const Marketplace = () => (
    <main className="page-main container">
      <div className="breadcrumbs">
        <button onClick={() => navigate("home")}>Home</button>
        <span>/</span> Marketplace
      </div>
      <div className="listing-heading">
        <div>
          <span className="eyebrow">THE MAKER MARKETPLACE</span>
          <h1>
            Find something <em>wonderful.</em>
          </h1>
          <p>Handmade pieces with a story to tell, from makers across India.</p>
        </div>
        <span className="result-count">
          {visibleProducts.length} thoughtful finds
        </span>
      </div>
      <div className="market-layout">
        <aside className="filters">
          <div className="filter-title">
            <h3>Filters</h3>
            <Icon name="filter" size={19} />
          </div>
          <div className="filter-group">
            <h4>Category</h4>
            {["All", ...categories.map((c) => c.name)].map((c) => (
              <button
                key={c}
                className={`filter-option ${category === c ? "selected" : ""}`}
                onClick={() => setCategory(c)}
              >
                <span>{c === "All" ? "All crafts" : c}</span>
                <span>
                  {c === "All"
                    ? products.length
                    : products.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
          <div className="filter-group">
            <h4>Price range</h4>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              aria-label="Filter by price"
            >
              {[
                "Any price",
                "Under ₹2,000",
                "₹2,000–₹3,000",
                "Over ₹3,000",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <h4>Location</h4>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Filter by location"
            >
              {[
                "All locations",
                ...new Set(products.map((p) => p.location)),
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <h4>Material</h4>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              aria-label="Filter by material"
            >
              {[
                "All materials",
                ...new Set(products.map((p) => p.material)),
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <button
            className="clear-filters"
            onClick={() => {
              setCategory("All")
              setPrice("Any price")
              setLocation("All locations")
              setMaterial("All materials")
              setQuery("")
            }}
          >
            Clear all filters
          </button>
        </aside>
        <div className="market-content">
          <div className="market-toolbar">
            <span>Showing {visibleProducts.length} results</span>
            <label>
              Sort by{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {[
                  "Featured",
                  "Newest",
                  "Price: low to high",
                  "Price: high to low",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
          {visibleProducts.length ? (
            <div className="product-grid market-products">
              {visibleProducts.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                  <button className="card-add-btn" onClick={() => addCart(p)}>
                    Add to bag <Icon name="plus" size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No pieces found</h3>
              <p>Try a different search or clear a filter to discover more.</p>
              <button
                className="btn btn-dark"
                onClick={() => {
                  setQuery("")
                  setCategory("All")
                  setPrice("Any price")
                  setLocation("All locations")
                  setMaterial("All materials")
                }}
              >
                See all products
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )

  const ProductDetail = () => (
    <main className="page-main container">
      <div className="breadcrumbs">
        <button onClick={() => navigate("home")}>Home</button>
        <span>/</span>
        <button onClick={() => browse(selected.category)}>
          {selected.category}
        </button>
        <span>/</span>
        {selected.name}
      </div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image">
            <img src={galleryImage || selected.image} alt={selected.name} />
          </div>
          <div className="detail-thumbs">
            {[
              selected.image,
              selected.category === "Pottery" ? images.bowls : images.studio,
              images.maker,
            ].map((image, i) => (
              <button
                key={i}
                className={
                  (galleryImage || selected.image) === image ? "selected" : ""
                }
                onClick={() => setGalleryImage(image)}
                aria-label={`View product photo ${i + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">
            HANDMADE IN {selected.location.toUpperCase()}
          </span>
          <h1>{selected.name}</h1>
          <div className="detail-review">
            <span className="stars">★★★★★</span> {selected.rating}{" "}
            <span className="muted">(24 reviews)</span>
          </div>
          <div className="detail-price">{money(selected.price)}</div>
          <p className="detail-description">
            Made slowly and thoughtfully, this one-of-a-kind{" "}
            {selected.category.toLowerCase()} piece celebrates the beauty of
            traditional craft. Every detail carries the touch of the maker's
            hand, making it a special addition to your everyday.
          </p>
          <div className="detail-maker">
            <span className="maker-avatar">
              {selected.seller
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <small>CREATED BY</small>
              <strong>{selected.seller}</strong>
              <span>
                <Icon name="pin" size={13} /> {selected.location}, India
              </span>
            </div>
            <button className="text-link" onClick={() => navigate("shop")}>
              View shop <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="detail-actions">
            <button className="btn btn-dark" onClick={() => addCart(selected)}>
              Add to bag <Icon name="bag" size={18} />
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                addCart(selected)
                setCartOpen(true)
              }}
            >
              Buy now <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="detail-accordions">
            <details open>
              <summary>Details & materials</summary>
              <p>
                Handcrafted from {selected.material.toLowerCase()}. Each piece
                is individually made and may have slight variations that make it
                uniquely yours.
              </p>
            </details>
            <details>
              <summary>Shipping & returns</summary>
              <p>
                Ships from {selected.location}, India. Usually dispatched within
                3–5 working days. Contact the maker if you have any questions.
              </p>
            </details>
            <details>
              <summary>Customer reviews</summary>
              <p>
                ★★★★★ “Beautiful craftsmanship and even lovelier in person!” —
                Priya S.
              </p>
            </details>
          </div>
        </div>
      </div>
      <section className="section related-section">
        <SectionHeading
          eyebrow="YOU MIGHT ALSO LOVE"
          title="More to discover."
          action="Shop all"
          onAction={() => browse()}
        />
        <div className="product-grid">
          {products
            .filter((p) => p.id !== selected.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </main>
  )

  const Shop = () => (
    <main>
      <div className="shop-cover">
        <img src={images.studio} alt="Inside a pottery studio" />
        <div className="shop-cover-overlay" />
      </div>
      <div className="container shop-content">
        <div className="shop-profile">
          <div className="shop-profile-avatar">
            M<span>✳</span>
          </div>
          <div className="shop-profile-info">
            <span className="eyebrow">ARTISAN SHOP · JAIPUR, RAJASTHAN</span>
            <h1>Mitti & Form</h1>
            <p>Everyday objects, made to be anything but ordinary.</p>
            <div className="shop-profile-stats">
              <span>★ 4.9 (128 reviews)</span>
              <span>•</span>
              <span>42 creations</span>
              <span>•</span>
              <span>Since 2021</span>
            </div>
          </div>
          <div className="shop-actions">
            <button
              className="btn btn-outline"
              onClick={() => {
                setFollowed(!followed)
                setToast(
                  followed
                    ? "Unfollowed Mitti & Form"
                    : "Following Mitti & Form",
                )
              }}
            >
              {followed ? "Following" : "Follow"}{" "}
              <Icon name={followed ? "check" : "plus"} size={17} />
            </button>
            <button
              className="btn btn-dark"
              onClick={() =>
                setToast("Contact the maker at hello@aangan.example")
              }
            >
              Contact maker <Icon name="message" size={17} />
            </button>
          </div>
        </div>
        <div className="shop-tabs">
          {["Products", "About", "Videos", "Reviews"].map((tab) => (
            <button
              className={shopTab === tab ? "active" : ""}
              key={tab}
              onClick={() => setShopTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {shopTab === "Products" && (
          <section className="section shop-tab-content">
            <SectionHeading
              eyebrow="FROM THE STUDIO"
              title="Made by Mitti & Form."
            />
            <div className="product-grid">
              {products
                .filter((p) => p.category === "Pottery")
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </section>
        )}
        {shopTab === "About" && (
          <section className="shop-about shop-tab-content">
            <img src={images.maker} alt="Potter shaping clay" />
            <div>
              <span className="eyebrow">THE MAKER STORY</span>
              <h2>Objects that feel like home.</h2>
              <p>
                From our little studio in Jaipur, we make ceramics for slow
                mornings, long conversations, and the everyday moments in
                between. Each piece is shaped by hand, with love for the
                material and respect for the process.
              </p>
              <p>
                Our work draws on generations of Indian pottery traditions while
                finding its own contemporary voice. No two pieces are quite the
                same — and we like it that way.
              </p>
              <div className="about-award">
                ✳ &nbsp; Featured maker · Handmade India 2025
              </div>
            </div>
          </section>
        )}
        {shopTab === "Videos" && (
          <section className="shop-tab-content">
            <h2>From the studio</h2>
            <div className="reels-grid shop-reels">
              {[
                { image: images.reels, title: "The making of a vessel" },
                { image: images.hero, title: "A morning at the wheel" },
              ].map((x) => (
                <button
                  className="reel-card"
                  key={x.title}
                  onClick={() => setToast("Maker videos are coming soon.")}
                >
                  <img src={x.image} alt={x.title} />
                  <span className="play-button">
                    <Icon name="play" />
                  </span>
                  <span className="reel-caption">
                    <strong>{x.title}</strong>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
        {shopTab === "Reviews" && (
          <section className="shop-tab-content reviews-list">
            <h2>Kind words from customers</h2>
            {[
              "The craftsmanship is incredible. It feels so special knowing someone made this by hand.",
              "Beautiful piece, carefully packaged, and exactly as pictured. Thank you!",
              "My new favorite thing in our home. The details are lovely.",
            ].map((review, i) => (
              <div className="review" key={review}>
                <span className="stars">★★★★★</span>
                <p>“{review}”</p>
                <small>
                  {["Priya S.", "Ananya R.", "Meera K."][i]} · Verified buyer
                </small>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  )

  const Community = () => (
    <main className="page-main container">
      <div className="editorial-heading">
        <span className="eyebrow">THE CREATIVE CORNER</span>
        <h1>
          Made to <em>connect.</em>
        </h1>
        <p>
          Come for the craft. Stay for the people. Share what you're making,
          find your people, and get inspired along the way.
        </p>
      </div>
      <div className="community-layout">
        <div className="feed">
          <div className="create-post">
            <span className="post-avatar">You</span>
            <button
              onClick={() =>
                setToast(
                  "Posting will be available when accounts are connected.",
                )
              }
            >
              What are you working on today?
            </button>
            <button
              className="post-plus"
              onClick={() =>
                setToast(
                  "Posting will be available when accounts are connected.",
                )
              }
            >
              <Icon name="plus" />
            </button>
          </div>
          {[
            {
              id: 1,
              name: "Aditi Menon",
              handle: "Painter · Kochi",
              initials: "AM",
              image: images.painting,
              caption:
                "A little color study from this morning. Finding so much inspiration in the warm hues of the coast lately. What colors are you drawn to these days?",
              likes: 128,
              comments: 18,
              time: "2 hours ago",
            },
            {
              id: 2,
              name: "Mitti & Form",
              handle: "Ceramic artist · Jaipur",
              initials: "MF",
              image: images.hero,
              caption:
                "The quiet moments at the wheel are always my favorite. A fresh batch of vessels is slowly taking shape in the studio.",
              likes: 94,
              comments: 12,
              time: "Yesterday",
            },
            {
              id: 3,
              name: "The Loom Room",
              handle: "Textile artist · Kutch",
              initials: "TL",
              image: images.weaving,
              caption:
                "Every thread has a story. Here is a peek into the process behind our newest handwoven collection.",
              likes: 76,
              comments: 9,
              time: "2 days ago",
            },
          ].map((post) => (
            <article className="feed-post" key={post.id}>
              <div className="post-header">
                <span className="post-avatar">{post.initials}</span>
                <div>
                  <strong>{post.name}</strong>
                  <small>
                    {post.handle} · {post.time}
                  </small>
                </div>
                <button
                  onClick={() => setToast("More post options coming soon.")}
                >
                  ···
                </button>
              </div>
              <p>{post.caption}</p>
              <img
                className="post-image"
                src={post.image}
                alt={`Creative work shared by ${post.name}`}
              />
              <div className="post-engagement">
                <button
                  className={liked.includes(post.id) ? "liked" : ""}
                  onClick={() =>
                    setLiked((current) =>
                      current.includes(post.id)
                        ? current.filter((id) => id !== post.id)
                        : [...current, post.id],
                    )
                  }
                >
                  <Icon name="heart" size={19} />{" "}
                  {post.likes + (liked.includes(post.id) ? 1 : 0)} likes
                </button>
                <button
                  onClick={() =>
                    setToast(
                      "Comments will be available when accounts are connected.",
                    )
                  }
                >
                  <Icon name="message" size={19} /> {post.comments} comments
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="community-aside">
          <div className="aside-card">
            <span className="eyebrow">YOUR CREATIVE SPACE</span>
            <h3>There is room for your story here.</h3>
            <p>
              Join a community that celebrates the process as much as the
              finished piece.
            </p>
            <button
              className="btn btn-dark"
              onClick={() => navigate("register")}
            >
              Join the community <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="aside-card">
            <h3>Discover creators</h3>
            {[
              { initials: "AM", name: "Aditi Menon", craft: "Painter · Kochi" },
              {
                initials: "MF",
                name: "Mitti & Form",
                craft: "Ceramics · Jaipur",
              },
              {
                initials: "TL",
                name: "The Loom Room",
                craft: "Textiles · Kutch",
              },
            ].map((c) => (
              <div className="creator-row" key={c.name}>
                <span className="post-avatar">{c.initials}</span>
                <div>
                  <strong>{c.name}</strong>
                  <small>{c.craft}</small>
                </div>
                <button onClick={() => navigate("shop")}>
                  <Icon name="upRight" size={17} />
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )

  const Collaborations = () => (
    <main className="page-main container">
      <div className="collab-page-hero">
        <div>
          <span className="eyebrow">CREATE SOMETHING TOGETHER</span>
          <h1>
            Magic happens <em>in the meeting.</em>
          </h1>
          <p>
            Find your creative counterpart. Mix mediums, exchange ideas, and
            make something neither of you could have imagined alone.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-dark"
              onClick={() =>
                setToast(
                  "Creator matching will be available when accounts are connected.",
                )
              }
            >
              Find collaborators <Icon name="arrow" size={18} />
            </button>
            <button
              className="btn btn-outline"
              onClick={() =>
                setToast(
                  "Create a collaboration will be available when accounts are connected.",
                )
              }
            >
              Create collaboration <Icon name="plus" size={18} />
            </button>
          </div>
        </div>
        <img
          src={images.bowls}
          alt="Handcrafted ceramics ready for collaboration"
        />
      </div>
      <section className="section">
        <SectionHeading
          eyebrow="CREATIVE CONNECTIONS"
          title="Projects in the making."
          description="Meet the makers turning shared ideas into something extraordinary."
        />
        <div className="collab-card-grid">
          {[
            {
              image: images.bowls,
              title: "Where clay meets canvas",
              desc: "Hand-thrown ceramics become tiny canvases for expressive, one-of-a-kind artwork.",
              makers: "Mitti & Form × Aditi Menon",
              status: "In progress",
              crafts: "POTTERY + PAINTING",
            },
            {
              image: images.textile,
              title: "Woven in color",
              desc: "Traditional weaving meets contemporary illustration in a new collection of textiles.",
              makers: "The Loom Room × Studio Sona",
              status: "Looking for collaborators",
              crafts: "TEXTILES + ILLUSTRATION",
            },
            {
              image: images.wood,
              title: "Grain & geometry",
              desc: "A conversation between natural wood grain and bold geometric design.",
              makers: "Grain & Grain × Aditi Menon",
              status: "Completed",
              crafts: "WOODWORK + DESIGN",
            },
          ].map((card) => (
            <article className="collab-card" key={card.title}>
              <div className="collab-card-image">
                <img src={card.image} alt={card.title} />
                <span>{card.status}</span>
              </div>
              <div className="collab-card-body">
                <small>{card.crafts}</small>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="collab-card-footer">
                  <span>By {card.makers}</span>
                  <button
                    aria-label={`Explore ${card.title}`}
                    onClick={() =>
                      setToast(`${card.title}: project details coming soon.`)
                    }
                  >
                    <Icon name="upRight" size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )

  const Dashboard = () => (
    <main className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <span className="eyebrow">YOUR WORKSPACE</span>
        <h2>Mitti & Form</h2>
        <div className="dashboard-nav">
          {[
            { name: "Dashboard", icon: "grid" },
            { name: "Products", icon: "box" },
            { name: "Orders", icon: "bag" },
            { name: "Shop Profile", icon: "user" },
            { name: "Promotions", icon: "star" },
            { name: "Settings", icon: "settings" },
          ].map((item) => (
            <button
              className={dashboardTab === item.name ? "active" : ""}
              key={item.name}
              onClick={() => setDashboardTab(item.name)}
            >
              <Icon name={item.icon} size={18} />
              {item.name}
            </button>
          ))}
        </div>
        <div className="dashboard-help">
          Need a hand?<p>We're here to help you grow.</p>
          <a href="mailto:hello@aangan.example">
            Contact support <Icon name="arrow" size={15} />
          </a>
        </div>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-top">
          <div>
            <span className="eyebrow">SELLER STUDIO</span>
            <h1>
              {dashboardTab === "Dashboard"
                ? "Good morning, maker."
                : dashboardTab}
            </h1>
            <p>
              {dashboardTab === "Dashboard"
                ? "Here is what is happening with your shop today."
                : "Manage your creative business in one place."}
            </p>
          </div>
          <button className="btn btn-dark" onClick={() => navigate("shop")}>
            View your shop <Icon name="upRight" size={17} />
          </button>
        </div>
        {dashboardTab === "Dashboard" && (
          <>
            <div className="summary-grid">
              <div className="summary-card">
                <small>TOTAL SALES</small>
                <strong>₹48,520</strong>
                <span>↗ 12.4% from last month</span>
              </div>
              <div className="summary-card">
                <small>NEW ORDERS</small>
                <strong>18</strong>
                <span>5 waiting to be shipped</span>
              </div>
              <div className="summary-card">
                <small>ACTIVE PRODUCTS</small>
                <strong>{shopProducts.length}</strong>
                <span>Beautiful things in your shop</span>
              </div>
            </div>
            <div className="dashboard-panel">
              <div className="panel-heading">
                <h2>Recent orders</h2>
                <button
                  className="text-link"
                  onClick={() => setDashboardTab("Orders")}
                >
                  View all <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "#AG-1042",
                        "Priya Sharma",
                        "The Earthstone Vase",
                        "₹1,890",
                        "To ship",
                      ],
                      [
                        "#AG-1041",
                        "Rohan Mehta",
                        "Ceramic Serving Bowls",
                        "₹2,290",
                        "Delivered",
                      ],
                      [
                        "#AG-1040",
                        "Neha Kapoor",
                        "The Earthstone Vase",
                        "₹1,890",
                        "In transit",
                      ],
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((value, i) => (
                          <td key={i}>
                            {i === 4 ? (
                              <span
                                className={`status ${
                                  value === "Delivered" ? "status-done" : ""
                                }`}
                              >
                                {value}
                              </span>
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {dashboardTab === "Products" && (
          <div className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Your products</h2>
                <p>Manage the pieces in your shop.</p>
              </div>
              <button
                className="btn btn-dark"
                onClick={() =>
                  setToast(
                    "Product creation will be available when your shop is connected.",
                  )
                }
              >
                Add product <Icon name="plus" size={17} />
              </button>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shopProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="table-product">
                          <img src={p.image} alt="" />
                          {p.name}
                        </div>
                      </td>
                      <td>{money(p.price)}</td>
                      <td>
                        <span className="status status-done">Active</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            aria-label={`Edit ${p.name}`}
                            onClick={() =>
                              setToast(
                                "Product editing will be available when your shop is connected.",
                              )
                            }
                          >
                            <Icon name="edit" size={17} />
                          </button>
                          <button
                            aria-label={`Delete ${p.name}`}
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Remove ${p.name} from your shop?`,
                                )
                              )
                                setShopProducts((current) =>
                                  current.filter((item) => item.id !== p.id),
                                )
                            }}
                          >
                            <Icon name="trash" size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {dashboardTab === "Orders" && (
          <div className="dashboard-panel">
            <div className="panel-heading">
              <h2>Orders</h2>
              <span>Keep track of every handmade delivery.</span>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "#AG-1042",
                      "Priya Sharma",
                      "The Earthstone Vase",
                      "₹1,890",
                      "To ship",
                    ],
                    [
                      "#AG-1041",
                      "Rohan Mehta",
                      "Ceramic Serving Bowls",
                      "₹2,290",
                      "Delivered",
                    ],
                    [
                      "#AG-1040",
                      "Neha Kapoor",
                      "The Earthstone Vase",
                      "₹1,890",
                      "In transit",
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((value, i) => (
                        <td key={i}>
                          {i === 4 ? (
                            <span
                              className={`status ${
                                value === "Delivered" ? "status-done" : ""
                              }`}
                            >
                              {value}
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {["Shop Profile", "Promotions", "Settings"].includes(dashboardTab) && (
          <div className="dashboard-panel dashboard-placeholder">
            <span className="brand-symbol">✳</span>
            <h2>
              {dashboardTab === "Shop Profile"
                ? "Your shop, your story."
                : dashboardTab === "Promotions"
                  ? "Make your work shine."
                  : "Make this space yours."}
            </h2>
            <p>
              {dashboardTab === "Shop Profile"
                ? "Your public shop profile is ready for visitors to discover."
                : "This part of your seller workspace will be ready when your shop is connected."}
            </p>
            {dashboardTab === "Shop Profile" && (
              <button className="btn btn-dark" onClick={() => navigate("shop")}>
                Visit shop <Icon name="arrow" size={17} />
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )

  const Auth = () => (
    <main className="auth-page">
      <div className="auth-image">
        <img src={images.studio} alt="Artisan creating pottery" />
        <div>
          <span className="eyebrow">A PLACE FOR MAKERS & FINDERS</span>
          <h2>There's something special about something made by hand.</h2>
          <p>Come on in. You belong here.</p>
        </div>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-form">
          <span className="eyebrow">WELCOME TO AANGAN</span>
          <h1>{page === "login" ? "Welcome back." : "Let's get started."}</h1>
          <p>
            {page === "login"
              ? "Good to have you here again. Sign in to continue."
              : "Join a community that believes in the beauty of handmade."}
          </p>
          {page === "register" && (
            <div className="role-choice">
              <button
                className={authRole === "buyer" ? "active" : ""}
                onClick={() => setAuthRole("buyer")}
              >
                <Icon name="bag" size={21} />
                <strong>I'm here to shop</strong>
                <small>Discover handmade treasures</small>
              </button>
              <button
                className={authRole === "seller" ? "active" : ""}
                onClick={() => setAuthRole("seller")}
              >
                <Icon name="star" size={21} />
                <strong>I'm a maker</strong>
                <small>Share and sell your craft</small>
              </button>
            </div>
          )}
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const form = new FormData(e.currentTarget)
              const payload = { name: form.get("name"), email: form.get("email"), password: form.get("password"), role: authRole, shop_name: form.get("shop_name") }
              const endpoint = page === "login" ? "auth/login/" : "auth/register/"
              try {
                const response = await fetch(`${apiUrl}/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
                const data = await response.json()
                if (!response.ok) throw new Error(data.detail || "Authentication failed")
                localStorage.setItem("projectj_token", data.token)
                localStorage.setItem("projectj_user", JSON.stringify(data.user))
                setUser(data.user)
                setToast(page === "login" ? "Welcome back!" : "Account created successfully!")
                navigate(data.user.role === "seller" ? "dashboard" : "home")
              } catch (error) { setToast(error instanceof Error ? error.message : "Authentication failed") }
            }}
          >
            {page === "register" && (
              <label>
                Full name
                <input type="text" placeholder="Your full name" required />
              </label>
            )}
            {page === "register" && authRole === "seller" && (
              <label>
                Shop name
                <input
                  type="text"
                  placeholder="What do you call your shop?"
                  required
                />
              </label>
            )}
            <label>
              Email address
              <input type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="At least 8 characters"
                minLength={8}
                required
              />
            </label>
            <button className="btn btn-dark auth-submit" type="submit">
              {page === "login"
                ? "Sign in"
                : authRole === "seller"
                  ? "Start your shop"
                  : "Create account"}{" "}
              <Icon name="arrow" size={18} />
            </button>
          </form>
          <div className="auth-switch">
            {page === "login" ? "New around here?" : "Already have an account?"}{" "}
            <button
              onClick={() => navigate(page === "login" ? "register" : "login")}
            >
              {page === "login" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )

  return (
    <>
      <div className={`backend-status backend-status-${backendStatus}`} title="Django API connection">
        <span />
        {backendStatus === "connected" ? "Django connected" : backendStatus === "checking" ? "Connecting to Django…" : "Django offline"}
      </div>
      {Header()}
      {page === "home"
        ? Home()
        : page === "marketplace"
          ? Marketplace()
          : page === "product"
            ? ProductDetail()
            : page === "shop"
              ? Shop()
              : page === "community"
                ? Community()
                : page === "collaborations"
                  ? Collaborations()
                  : page === "dashboard"
                    ? Dashboard()
                    : Auth()}
      {page !== "dashboard" &&
        page !== "login" &&
        page !== "register" &&
        Footer()}
      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>
                Your bag <span>({cart.length})</span>
              </h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag">
                <Icon name="close" />
              </button>
            </div>
            {cart.length ? (
              <>
                <div className="cart-items">
                  {cart.map((p, i) => (
                    <div className="cart-item" key={`${p.id}-${i}`}>
                      <img src={p.image} alt={p.name} />
                      <div>
                        <strong>{p.name}</strong>
                        <small>by {p.seller}</small>
                        <b>{money(p.price)}</b>
                        <button
                          onClick={() =>
                            setCart((items) =>
                              items.filter((_, index) => index !== i),
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      {money(cart.reduce((sum, p) => sum + p.price, 0))}
                    </strong>
                  </div>
                  <p>Shipping calculated at checkout.</p>
                  <button
                    className="btn btn-dark"
                    onClick={() =>
                      setToast(
                        "Checkout will be available when the store is connected.",
                      )
                    }
                  >
                    Continue to checkout <Icon name="arrow" size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <Icon name="bag" size={42} />
                <h3>Your bag is waiting.</h3>
                <p>Fill it with things made with heart.</p>
                <button className="btn btn-dark" onClick={() => browse()}>
                  Explore the marketplace
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Icon name="check" size={17} />
          {toast}
          <button onClick={() => setToast("")} aria-label="Dismiss message">
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
    </>
  )
}
