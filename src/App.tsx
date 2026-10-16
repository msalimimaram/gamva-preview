import { useEffect, useMemo, useState } from "react"
import BottomNav from "./components/BottomNav"
import Splash from "./screens/Splash"
import Onboarding from "./screens/Onboarding"
import Auth from "./screens/Auth"
import Octolife from "./screens/Octolife"
import Social from "./screens/Social"
import ContentHub from "./screens/ContentHub"
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

const NAV_SCREENS: Screen[] = ["dashboard", "social", "content", "profile"]

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      return localStorage.getItem("gamva-theme") === "light" ? "light" : "dark"
    } catch {
      return "dark"
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem("gamva-theme", theme)
    } catch {
      // Theme still works for this session if storage is unavailable.
    }
  }, [theme])
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
  const [moodOpen, setMoodOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

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

  const showNav = !["splash", "onboarding", "auth"].includes(screen)

  const activeTab = NAV_SCREENS.includes(screen) ? screen : ""

  return (
    <main className="app-shell" data-theme={theme}>
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
            <Octolife onNavigate={navigate} cartCount={cartCount} />
          )}

          {screen === "social" && <Social onNavigate={navigate} />}

          {screen === "content" && <ContentHub onNavigate={navigate} />}

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

          {screen === "loyalty" && <Loyalty onBack={() => navigate("dashboard")} />}

          {screen === "profile" && (
            <Profile
              role={role}
              onRoleChange={setRole}
              onLogout={() => navigate("auth")}
              onNavigate={navigate}
              theme={theme}
              onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            />
          )}
        </div>

        {showNav && (
          <BottomNav
            active={activeTab}
            cartCount={cartCount}
            onNavigate={(id) => navigate(id as Screen)}
            onMood={() => setMoodOpen(true)}
          />
        )}
        {moodOpen && (
          <div className="mood-overlay" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setMoodOpen(false) }}>
            <section className="mood-dialog" role="dialog" aria-modal="true" aria-labelledby="mood-title">
              <button type="button" className="mood-close" onClick={() => setMoodOpen(false)} aria-label="Close mood check-in">×</button>
              <p className="octo-eyebrow">A MOMENT FOR YOU</p>
              <h2 id="mood-title">How are you, really?</h2>
              <p className="mood-description">No right answer. This is a check-in, not a score.</p>
              <div className="mood-options">
                {[
                  { id: "great", emoji: "✨", label: "Great" },
                  { id: "good", emoji: "🙂", label: "Good" },
                  { id: "okay", emoji: "😐", label: "Okay" },
                  { id: "low", emoji: "🌧️", label: "Low" },
                  { id: "hard", emoji: "🫶", label: "Hard day" },
                ].map((item) => (
                  <button key={item.id} type="button" className={selectedMood === item.id ? "is-selected" : ""} onClick={() => setSelectedMood(item.id)} aria-pressed={selectedMood === item.id}>
                    <span>{item.emoji}</span><small>{item.label}</small>
                  </button>
                ))}
              </div>
              <p className="mood-kind-note">You matter, even on the days that don't go to plan.</p>
              <button type="button" className="mood-save" disabled={!selectedMood} onClick={() => { try { localStorage.setItem("gamva-last-mood", selectedMood || "") } catch { /* optional */ } setMoodOpen(false); notify("Mood check-in saved in this preview.") }}>Save check-in</button>
            </section>
          </div>
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
