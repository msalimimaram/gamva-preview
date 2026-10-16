import {
  Home,
  Compass,
  Dumbbell,
  BarChart2,
  User,
  ShoppingBag,
} from "lucide-react"

const tabs = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "explore", icon: Compass, label: "Explore" },
  { id: "coaching", icon: Dumbbell, label: "Coaching" },
  { id: "insights", icon: BarChart2, label: "Insights" },
  { id: "profile", icon: User, label: "Profile" },
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
              onClick={() => onNavigate(id)}
              className={`bottom-nav__item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          )
        })}
        <button
          className="bottom-nav__cart"
          onClick={() => onNavigate("cart")}
          aria-label={`Cart, ${cartCount} items`}
        >
          <ShoppingBag size={19} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
      </div>
    </nav>
  )
}
