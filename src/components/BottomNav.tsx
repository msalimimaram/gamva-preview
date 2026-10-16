import {
  Orbit,
  UsersRound,
  BookOpen,
  UserRound,
  HeartPulse,
} from "lucide-react"

const tabs = [
  { id: "dashboard", icon: Orbit, label: "Octolife" },
  { id: "social", icon: UsersRound, label: "Social" },
  { id: "content", icon: BookOpen, label: "Content" },
  { id: "profile", icon: UserRound, label: "Profile" },
]

interface BottomNavProps {
  active: string
  onNavigate: (id: string) => void
  onMood: () => void
}

export default function BottomNav({ active, onNavigate, onMood }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      <div className="bottom-nav__inner">
        {tabs.slice(0, 2).map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <button key={id} type="button" onClick={() => onNavigate(id)} className={`bottom-nav__item ${isActive ? "is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </button>
          )
        })}
        <button type="button" className="bottom-nav__mood" onClick={onMood} aria-label="Open mood check-in">
          <span><HeartPulse size={22} aria-hidden="true" /></span>
          <small>Mood</small>
        </button>
        {tabs.slice(2).map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <button key={id} type="button" onClick={() => onNavigate(id)} className={`bottom-nav__item ${isActive ? "is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
