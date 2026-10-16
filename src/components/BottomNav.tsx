import { BookOpen, Dumbbell, House, ShoppingBag, UserRound } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const tabs: { id: string; icon: LucideIcon; label: string }[] = [
  { id: "dashboard", icon: House, label: "Home" },
  { id: "explore", icon: ShoppingBag, label: "Shop" },
  { id: "coaching", icon: Dumbbell, label: "Coaches" },
  { id: "content", icon: BookOpen, label: "Media" },
  { id: "profile", icon: UserRound, label: "Profile" },
]

interface BottomNavProps {
  active: string
  onNavigate: (id: string) => void
  cartCount: number
}

export default function BottomNav({ active, onNavigate, cartCount }: BottomNavProps) {
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
              aria-label={id === "explore" && cartCount > 0 ? `Shop, ${cartCount} items in cart` : label}
            >
              <span className="bottom-nav__icon-wrap">
                <Icon size={20} aria-hidden="true" />
                {id === "explore" && cartCount > 0 && <i className="bottom-nav__badge">{cartCount > 99 ? "99+" : cartCount}</i>}
              </span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
