import { useMemo, useState } from "react"
import {
  ArrowLeft,
  BarChart3,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react"
import GlassCard from "../components/GlassCard"
import {
  Button,
  DemoNotice,
  EmptyState,
  Field,
  IconButton,
  PageHeader,
} from "../components/UI"
import { formatCurrency, getProduct } from "../data/products"
import type { CartItem, Screen } from "../types"

interface CartProps {
  items: CartItem[]
  onUpdate: (productId: string, option: string, quantity: number) => void
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

export default function Cart({
  items,
  onUpdate,
  onBack,
  onNavigate,
}: CartProps) {
  const [promoInput, setPromoInput] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")
  const [showCheckoutNote, setShowCheckoutNote] = useState(false)

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProduct(item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0),
    [items],
  )
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = items.length === 0 ? 0 : subtotal - discount >= 75 ? 0 : 6.5
  const total = subtotal - discount + shipping

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() !== "GAMVA10") {
      setPromoApplied(false)
      setPromoError("Demo code not recognized. Try GAMVA10.")
      return
    }
    setPromoError("")
    setPromoApplied(true)
  }

  return (
    <div className="screen">
      <PageHeader
        eyebrow="COMMERCE DEMO"
        title="Your cart"
        description={`${items.reduce((sum, item) => sum + item.quantity, 0)} items`}
        actions={
          <IconButton label="Back" onClick={onBack}>
            <ArrowLeft size={18} />
          </IconButton>
        }
      />
      <div className="screen-scroll">
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag size={30} />}
            title="Your cart is empty"
            description="Browse the shared product catalog and add an option to continue."
            action={
              <Button onClick={() => onNavigate("explore")}>
                Explore products
              </Button>
            }
          />
        ) : (
          <div className="content-grid">
            <div className="space-y-3">
              {items.map((item) => {
                const product = getProduct(item.productId)
                if (!product) return null
                return (
                  <GlassCard
                    key={`${item.productId}-${item.option}`}
                    className="p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="h-20 w-20 rounded-xl object-cover opacity-80"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {product.brand}
                        </p>
                        <h2 className="font-[Outfit] font-bold truncate">
                          {product.name}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.option}
                        </p>
                        <div className="flex justify-between items-center gap-3 mt-3">
                          <div className="flex items-center gap-2">
                            <IconButton
                              label={
                                item.quantity === 1
                                  ? "Remove item"
                                  : "Decrease quantity"
                              }
                              className="!h-8 !w-8"
                              onClick={() =>
                                onUpdate(
                                  item.productId,
                                  item.option,
                                  item.quantity - 1,
                                )
                              }
                            >
                              {item.quantity === 1 ? (
                                <Trash2 size={13} />
                              ) : (
                                <Minus size={13} />
                              )}
                            </IconButton>
                            <span className="font-mono text-sm min-w-5 text-center">
                              {item.quantity}
                            </span>
                            <IconButton
                              label="Increase quantity"
                              className="!h-8 !w-8"
                              onClick={() =>
                                onUpdate(
                                  item.productId,
                                  item.option,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus size={13} />
                            </IconButton>
                          </div>
                          <strong className="font-[Outfit]">
                            {formatCurrency(product.price * item.quantity)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
              <Button
                variant="secondary"
                onClick={() => onNavigate("comparison")}
              >
                <BarChart3 size={17} /> Compare cart products
              </Button>
            </div>

            <aside className="space-y-4">
              <GlassCard className="p-5">
                <h2 className="font-[Outfit] font-bold text-lg mb-4">
                  Order summary
                </h2>
                <div className="space-y-3 text-sm">
                  <Summary label="Subtotal" value={formatCurrency(subtotal)} />
                  {promoApplied && (
                    <Summary
                      label="Demo discount (10%)"
                      value={`−${formatCurrency(discount)}`}
                      accent
                    />
                  )}
                  <Summary
                    label="Shipping"
                    value={shipping === 0 ? "Free" : formatCurrency(shipping)}
                  />
                  <div className="border-t border-border pt-3">
                    <Summary
                      label="Total"
                      value={formatCurrency(total)}
                      strong
                    />
                  </div>
                </div>
                <div className="grid gap-3 mt-5">
                  <Field
                    label="Promo code"
                    icon={<Tag size={16} />}
                    value={promoInput}
                    onChange={(event) => setPromoInput(event.target.value)}
                    error={promoError}
                    placeholder="Try GAMVA10"
                  />
                  <Button variant="secondary" onClick={applyPromo}>
                    {promoApplied ? "Code applied" : "Apply code"}
                  </Button>
                  <Button onClick={() => setShowCheckoutNote(true)}>
                    Review demo checkout
                  </Button>
                </div>
              </GlassCard>
              {showCheckoutNote && (
                <DemoNotice>
                  Checkout stopped safely: no payment provider or order backend
                  is connected.
                </DemoNotice>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

function Summary({
  label,
  value,
  strong,
  accent,
}: {
  label: string
  value: string
  strong?: boolean
  accent?: boolean
}) {
  return (
    <div
      className={`flex justify-between gap-4 ${
        strong ? "text-lg font-bold" : ""
      }`}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-accent" : ""}>{value}</span>
    </div>
  )
}
