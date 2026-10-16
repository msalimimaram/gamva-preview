import { useMemo, useState } from "react"
import {
  Heart,
  Search,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Star,
} from "lucide-react"
import GlassCard, { Badge } from "../components/GlassCard"
import {
  Button,
  DemoNotice,
  EmptyState,
  Field,
  PageHeader,
  Select,
} from "../components/UI"
import { formatCurrency, products } from "../data/products"
import type { Screen } from "../types"

type Sort = "featured" | "price-low" | "price-high" | "rating"

interface ExploreProps {
  cartCount: number
  favorites: Set<string>
  onToggleFavorite: (id: string) => void
  onAddToCart: (id: string) => void
  onNavigate: (screen: Screen, data?: { productId?: string }) => void
}

export default function Explore({
  cartCount,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onNavigate,
}: ExploreProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState<Sort>("featured")
  const [showFilters, setShowFilters] = useState(false)

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products
      .filter(
        (product) =>
          (category === "All" || product.category === category) &&
          (!normalizedQuery ||
            `${product.name} ${product.brand} ${product.category}`
              .toLowerCase()
              .includes(normalizedQuery)),
      )
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price
        if (sort === "price-high") return b.price - a.price
        if (sort === "rating") return (b.demoRating ?? 0) - (a.demoRating ?? 0)
        return products.indexOf(a) - products.indexOf(b)
      })
  }, [category, query, sort])

  return (
    <div className="screen">
      <PageHeader
        eyebrow="CURATED MARKETPLACE"
        title="Explore"
        description="Search the demo catalog and build your training setup."
        actions={
          <Button variant="secondary" onClick={() => onNavigate("cart")}>
            <ShoppingBag size={17} /> Cart {cartCount > 0 && `(${cartCount})`}
          </Button>
        }
      />

      <div className="screen-scroll">
        <div className="mb-4">
          <DemoNotice>
            Product imagery, prices, ratings, and reviews are sample content for
            product development.
          </DemoNotice>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto] mb-4">
          <Field
            label="Search catalog"
            icon={<Search size={17} />}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Product, brand, or category"
          />
          <Button
            variant={showFilters ? "primary" : "secondary"}
            onClick={() => setShowFilters((value) => !value)}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal size={17} /> Filters
          </Button>
        </div>

        {showFilters && (
          <GlassCard className="p-4 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {["All", "Supplements", "Equipment", "Recovery"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <Select
                label="Sort by"
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Demo rating</option>
              </Select>
            </div>
          </GlassCard>
        )}

        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="font-[Outfit] text-lg font-bold">Products</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {visibleProducts.length} result
              {visibleProducts.length === 1 ? "" : "s"}
            </p>
          </div>
          {(query || category !== "All") && (
            <Button
              variant="ghost"
              onClick={() => {
                setQuery("")
                setCategory("All")
              }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {visibleProducts.length === 0 ? (
          <EmptyState
            icon={<Search size={28} />}
            title="No matches found"
            description="Try a broader search or clear your category filter."
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery("")
                  setCategory("All")
                }}
              >
                Reset search
              </Button>
            }
          />
        ) : (
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const isFavorite = favorites.has(product.id)
              return (
                <GlassCard key={product.id} className="group">
                  <button
                    className="block w-full text-left bg-transparent border-0 cursor-pointer"
                    onClick={() =>
                      onNavigate("product", { productId: product.id })
                    }
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover opacity-75 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-2 top-2">
                        <Badge color="muted" size="xs">
                          {product.tag}
                        </Badge>
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {product.brand}
                      </p>
                      <h3 className="font-[Outfit] font-bold text-sm mt-1 min-h-9">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <strong className="font-[Outfit]">
                          {formatCurrency(product.price)}
                        </strong>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Star size={11} className="text-[#FFD700]" />
                          {product.demoRating}
                        </span>
                      </div>
                    </div>
                  </button>
                  <div className="flex gap-2 px-3 pb-3">
                    <Button
                      className="flex-1 !min-h-9 !px-2 text-xs"
                      onClick={() => onAddToCart(product.id)}
                    >
                      <ShoppingCart size={14} /> Add
                    </Button>
                    <button
                      className="ui-icon-button !h-9 !w-9"
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      onClick={() => onToggleFavorite(product.id)}
                    >
                      <Heart
                        size={15}
                        className={
                          isFavorite ? "text-[#FF5C8A] fill-[#FF5C8A]" : ""
                        }
                      />
                    </button>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
