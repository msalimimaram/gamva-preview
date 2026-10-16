import {
  Home,
  Compass,
  Dumbbell,
  ChartNoAxesCombined,
  UserRound,
  ShoppingBag,
} from "lucide-react"

const tabs = [
  { id: "dashboard", icon: Home, label: "Home" },
  { id: "explore", icon: Compass, label: "Explore" },
  { id: "coaching", icon: Dumbbell, label: "Coaching" },
  { id: "insights", icon: ChartNoAxesCombined, label: "Insights" },
  { id: "profile", icon: UserRound, label: "Profile" },
]

interface BottomNavProps {
  active: string
  onNavigate: (id: string) => void
  cartCount?: number
}

export default function BottomNav({
  active,
  onNavigate,
  cartCount = 0,
}: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      <div className="bottom-nav__inner">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`bottom-nav__item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </button>
          )
        })}
        <button
          type="button"
          className="bottom-nav__cart"
          onClick={() => onNavigate("cart")}
          aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
        >
          <ShoppingBag size={19} aria-hidden="true" />
          {cartCount > 0 && <span aria-hidden="true">{cartCount > 99 ? "99+" : cartCount}</span>}
        </button>
      </div>
    </nav>
  )
}
