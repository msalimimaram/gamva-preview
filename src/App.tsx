import { useMemo, useState } from "react"
import BottomNav from "./components/BottomNav"
import Splash from "./screens/Splash"
import Onboarding from "./screens/Onboarding"
import Auth from "./screens/Auth"
import Dashboard from "./screens/Dashboard"
import Explore from "./screens/Explore"
import ProductDetail from "./screens/ProductDetail"
import Cart from "./screens/Cart"
import Comparison from "./screens/Comparison"
import Coaching from "./screens/Coaching"
import Insights from "./screens/Insights"
import ReportBuilder from "./screens/ReportBuilder"
import Loyalty from "./screens/Loyalty"
import Profile from "./screens/Profile"
import type { CartItem, LoyaltyState, Role, Screen } from "./types"
import { getProduct } from "./data/products"

const NAV_SCREENS: Screen[] = [
  "dashboard",
  "explore",
  "coaching",
  "insights",
  "profile",
]

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [role, setRole] = useState<Role>("student")
  const [selectedProductId, setSelectedProductId] = useState("creatine-core")
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loyalty] = useState<LoyaltyState>({
    points: 2850,
    completedSessions: 18,
    referrals: 3,
  })
  const [toast, setToast] = useState<string | null>(null)

  const navigate = (next: Screen, data?: { productId?: string }) => {
    if (data?.productId) setSelectedProductId(data.productId)
    setScreen(next)
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2400)
  }

  const addToCart = (productId: string, option: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.productId === productId && item.option === option,
      )
      if (existing) {
        return current.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...current, { productId, option, quantity }]
    })
    notify("Added to your demo cart.")
  }

  const updateCart = (productId: string, option: string, quantity: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId && item.option === option
            ? { ...item, quantity }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((current) => {
      const next = new Set(current)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const showNav = NAV_SCREENS.includes(screen)

  const activeTab = NAV_SCREENS.includes(screen) ? screen : "dashboard"

  return (
    <main className="app-shell">
      <section className="app-frame">
        <div className="app-content">
          {screen === "splash" && (
            <Splash onNext={() => navigate("onboarding")} />
          )}

          {screen === "onboarding" && (
            <Onboarding
              onSelectRole={(r) => {
                setRole(r as Role)
                navigate("auth")
              }}
            />
          )}

          {screen === "auth" && (
            <Auth
              onBack={() => navigate("onboarding")}
              onAuth={() => navigate("dashboard")}
            />
          )}

          {screen === "dashboard" && (
            <Dashboard role={role} onNavigate={navigate} />
          )}

          {screen === "explore" && (
            <Explore
              cartCount={cartCount}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={(id) => {
                const product = getProduct(id)
                if (product) addToCart(id, product.options[0])
              }}
              onNavigate={navigate}
            />
          )}

          {screen === "product" && (
            <ProductDetail
              productId={selectedProductId}
              favorite={favorites.has(selectedProductId)}
              onToggleFavorite={() => toggleFavorite(selectedProductId)}
              onAddToCart={addToCart}
              onBack={() => navigate("explore")}
              onNavigate={navigate}
            />
          )}

          {screen === "cart" && (
            <Cart
              items={cart}
              onUpdate={updateCart}
              onBack={() => navigate("explore")}
              onNavigate={navigate}
            />
          )}

          {screen === "comparison" && (
            <Comparison
              productIds={[...new Set(cart.map((item) => item.productId))]}
              onAddToCart={(id) => {
                const product = getProduct(id)
                if (product) addToCart(id, product.options[0])
              }}
              onBack={() => navigate("cart")}
            />
          )}

          {screen === "coaching" && <Coaching onNavigate={navigate} />}

          {screen === "insights" && <Insights onNavigate={navigate} />}

          {screen === "report" && (
            <ReportBuilder onBack={() => navigate("insights")} />
          )}

          {screen === "loyalty" && <Loyalty />}

          {screen === "profile" && (
            <Profile
              role={role}
              onRoleChange={setRole}
              onLogout={() => navigate("auth")}
              onNavigate={navigate}
            />
          )}
        </div>

        {showNav && (
          <BottomNav
            active={activeTab}
            cartCount={cartCount}
            onNavigate={(id) => navigate(id as Screen)}
          />
        )}
        {toast && (
          <div className="app-toast" role="status">
            {toast}
          </div>
        )}
        <span className="sr-only">
          Loyalty points {loyalty.points}; completed sessions{" "}
          {loyalty.completedSessions}
        </span>
      </section>
    </main>
  )
}
