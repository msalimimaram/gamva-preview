import { useState } from "react"
import {
  ArrowLeft,
  Heart,
  Info,
  ShoppingBag,
  ShoppingCart,
  Star,
} from "lucide-react"
import GlassCard, { Badge } from "../components/GlassCard"
import {
  Button,
  DemoNotice,
  IconButton,
  PageHeader,
  Select,
} from "../components/UI"
import { formatCurrency, getProduct } from "../data/products"
import type { Screen } from "../types"

interface ProductDetailProps {
  productId: string
  favorite: boolean
  onToggleFavorite: () => void
  onAddToCart: (productId: string, option: string, quantity?: number) => void
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

export default function ProductDetail({
  productId,
  favorite,
  onToggleFavorite,
  onAddToCart,
  onBack,
  onNavigate,
}: ProductDetailProps) {
  const product = getProduct(productId)
  const [option, setOption] = useState(product?.options[0] ?? "")

  if (!product) {
    return (
      <div className="screen">
        <PageHeader title="Product unavailable" />
        <div className="screen-scroll">
          <Button onClick={onBack}>
            <ArrowLeft size={17} /> Back to Explore
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <PageHeader
        eyebrow={product.category.toUpperCase()}
        title={product.name}
        description={`Demo listing by ${product.brand}`}
        actions={
          <>
            <IconButton label="Back" onClick={onBack}>
              <ArrowLeft size={18} />
            </IconButton>
            <IconButton
              label={favorite ? "Remove from favorites" : "Add to favorites"}
              onClick={onToggleFavorite}
            >
              <Heart
                size={18}
                className={favorite ? "fill-[#FF5C8A] text-[#FF5C8A]" : ""}
              />
            </IconButton>
          </>
        }
      />

      <div className="screen-scroll">
        <div className="content-grid">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted aspect-[16/10]">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="h-full w-full object-cover opacity-80"
              />
              <span className="absolute left-4 top-4">
                <Badge color="cyan" size="sm">
                  Sample imagery
                </Badge>
              </span>
            </div>
            <GlassCard className="p-5 mt-4">
              <h2 className="font-[Outfit] font-bold text-lg mb-2">
                About this listing
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-muted p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-sm font-medium mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <aside className="space-y-4">
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Star size={15} className="text-[#FFD700]" />
                <span className="text-sm">{product.demoRating}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.demoReviews} demo reviews)
                </span>
              </div>
              <div className="flex items-end gap-2 mb-5">
                <strong className="font-[Outfit] text-3xl">
                  {formatCurrency(product.price)}
                </strong>
                {product.compareAtPrice && (
                  <del className="text-sm text-muted-foreground pb-1">
                    {formatCurrency(product.compareAtPrice)}
                  </del>
                )}
              </div>
              <Select
                label="Product option"
                value={option}
                onChange={(event) => setOption(event.target.value)}
              >
                {product.options.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <div className="grid gap-2 mt-4">
                <Button onClick={() => onAddToCart(product.id, option)}>
                  <ShoppingCart size={17} /> Add to demo cart
                </Button>
                <Button variant="secondary" onClick={() => onNavigate("cart")}>
                  <ShoppingBag size={17} /> View cart
                </Button>
              </div>
            </GlassCard>

            <DemoNotice>
              Price, composition, availability, rating, and product claims are
              not verified.
            </DemoNotice>

            <GlassCard className="p-4">
              <div className="flex gap-3">
                <Info size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-[Outfit] font-bold text-sm">
                    Verification status
                  </h3>
                  <p className="text-xs text-muted-foreground leading-5 mt-1">
                    Seller verification and fulfillment are not connected in
                    this prototype.
                  </p>
                </div>
              </div>
            </GlassCard>
          </aside>
        </div>
      </div>
    </div>
  )
}
