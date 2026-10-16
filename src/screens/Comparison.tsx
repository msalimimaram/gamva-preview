import { ArrowLeft, Check, Plus, Scale, X } from "lucide-react"
import GlassCard from "../components/GlassCard"
import {
  Button,
  DemoNotice,
  EmptyState,
  IconButton,
  PageHeader,
} from "../components/UI"
import { formatCurrency, getProduct } from "../data/products"

interface ComparisonProps {
  productIds: string[]
  onAddToCart: (id: string) => void
  onBack: () => void
}

export default function Comparison({
  productIds,
  onAddToCart,
  onBack,
}: ComparisonProps) {
  const compared = productIds
    .map(getProduct)
    .filter((product) => product !== undefined)
    .slice(0, 3)
  const specKeys = [
    ...new Set(compared.flatMap((product) => Object.keys(product.specs))),
  ]

  return (
    <div className="screen">
      <PageHeader
        eyebrow="SIDE BY SIDE"
        title="Product comparison"
        description="Specifications come from the same shared catalog as Explore and Cart."
        actions={
          <IconButton label="Back to cart" onClick={onBack}>
            <ArrowLeft size={18} />
          </IconButton>
        }
      />
      <div className="screen-scroll">
        <div className="mb-4">
          <DemoNotice>
            All specifications are demo data and require seller verification.
          </DemoNotice>
        </div>
        {compared.length < 2 ? (
          <EmptyState
            icon={<Scale size={30} />}
            title="Add at least two products"
            description="Your comparison is generated from unique products currently in the cart."
            action={<Button onClick={onBack}>Return to cart</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <div
              className="grid gap-3 min-w-[680px]"
              style={{
                gridTemplateColumns: `140px repeat(${compared.length}, minmax(170px, 1fr))`,
              }}
            >
              <div />
              {compared.map((product) => (
                <GlassCard key={product.id} className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="aspect-[4/3] w-full object-cover opacity-75"
                  />
                  <div className="p-4">
                    <h2 className="font-[Outfit] font-bold">{product.name}</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.brand}
                    </p>
                    <strong className="block mt-3">
                      {formatCurrency(product.price)}
                    </strong>
                    <Button
                      className="w-full mt-3 !min-h-9 text-xs"
                      onClick={() => onAddToCart(product.id)}
                    >
                      <Plus size={14} /> Add another
                    </Button>
                  </div>
                </GlassCard>
              ))}
              <ComparisonRow
                label="Category"
                values={compared.map((product) => product.category)}
              />
              <ComparisonRow
                label="Options"
                values={compared.map((product) => product.options.join(", "))}
              />
              {specKeys.map((key) => (
                <ComparisonRow
                  key={key}
                  label={key}
                  values={compared.map((product) => product.specs[key] ?? "—")}
                />
              ))}
              <ComparisonRow
                label="Verified"
                values={compared.map((product) =>
                  product.specs.Verification === "Verified" ? "Yes" : "No",
                )}
                boolean
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ComparisonRow({
  label,
  values,
  boolean,
}: {
  label: string
  values: string[]
  boolean?: boolean
}) {
  return (
    <>
      <div className="py-4 text-xs font-semibold text-muted-foreground border-b border-border">
        {label}
      </div>
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="py-4 text-sm border-b border-border"
        >
          {boolean ? (
            value === "Yes" ? (
              <Check size={17} className="text-[#45E3BD]" />
            ) : (
              <X size={17} className="text-muted-foreground" />
            )
          ) : (
            value
          )}
        </div>
      ))}
    </>
  )
}
