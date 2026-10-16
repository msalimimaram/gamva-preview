import { useState } from "react"
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Check,
  Clock3,
  Compass,
  Headphones,
  Play,
  Search,
  Sparkles,
  Video,
} from "lucide-react"
import GlassCard from "../components/GlassCard"
import { DemoNotice } from "../components/UI"
import type { Screen } from "../types"

interface ContentHubProps {
  onNavigate: (screen: Screen) => void
}

const categories = [
  { id: "all", label: "For you" },
  { id: "health", label: "Health" },
  { id: "learning", label: "Learning" },
  { id: "growth", label: "Personal growth" },
  { id: "mind", label: "Mind & wellbeing" },
  { id: "career", label: "Career" },
]

const resources = [
  { id: "reset", type: "GUIDE", category: "mind", title: "A gentle reset for a busy mind", summary: "A short, practical pause to help you step out of autopilot.", duration: "4 min read", icon: BookOpen, color: "#8B7CFF", level: "START HERE" },
  { id: "movement", type: "VIDEO", category: "health", title: "Movement that meets you where you are", summary: "Build a realistic movement routine without all-or-nothing thinking.", duration: "8 min watch", icon: Video, color: "#00E5FF", level: "WELLNESS" },
  { id: "learning", type: "AUDIO", category: "learning", title: "Make learning stick", summary: "Use active recall and small repetition loops to remember more.", duration: "6 min listen", icon: Headphones, color: "#FF9B62", level: "LEARNING" },
  { id: "growth", type: "GUIDE", category: "growth", title: "Progress without self-criticism", summary: "A kinder way to review your week and choose what comes next.", duration: "5 min read", icon: BookOpen, color: "#FF79B0", level: "PERSONAL GROWTH" },
  { id: "career", type: "PLAYBOOK", category: "career", title: "Your next meaningful career step", summary: "Turn a broad ambition into one action you can take this week.", duration: "7 min read", icon: Compass, color: "#72A7FF", level: "CAREER" },
]

export default function ContentHub({ onNavigate }: ContentHubProps) {
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [saved, setSaved] = useState<string[]>([])
  const [opened, setOpened] = useState<string | null>(null)
  const [status, setStatus] = useState("")
  const filtered = resources.filter((item) => (category === "all" || item.category === category) && `${item.title} ${item.summary} ${item.level}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="screen content-hub-screen">
      <header className="content-hub-header">
        <div>
          <p className="content-hub-eyebrow"><Sparkles size={14} /> KNOWLEDGE THAT MOVES YOU</p>
          <h1>Ideas into <span>action.</span></h1>
          <p>Thoughtful guides, useful skills, and small lessons for every dimension of your life.</p>
        </div>
        <div className="content-hub-orb"><BookOpen size={30} /><span /><i /></div>
      </header>
      <div className="content-hub-scroll">
        <DemoNotice>Editorial cards are sample content for the product preview, not a connected publishing library.</DemoNotice>
        <div className="content-hub-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides, topics, and skills" aria-label="Search content" /><kbd>/</kbd></div>
        <div className="content-hub-categories" aria-label="Filter content categories">{categories.map((item) => <button type="button" key={item.id} className={category === item.id ? "is-active" : ""} onClick={() => setCategory(item.id)}>{item.label}</button>)}</div>

        <section className="content-hub-feature">
          <div className="content-feature-art"><div className="content-feature-grid" /><span className="content-feature-orbit orbit-one" /><span className="content-feature-orbit orbit-two" /><div className="content-feature-icon"><Sparkles size={32} /></div><span className="content-feature-label">GAMVA FIELD NOTES · 01</span></div>
          <div className="content-feature-copy"><p className="content-hub-eyebrow">FEATURED THIS WEEK</p><h2>Consistency is a skill you can learn.</h2><p>Make the next step small enough to start, meaningful enough to matter, and kind enough to repeat.</p><button type="button" onClick={() => setOpened(opened === "field-notes" ? null : "field-notes")}>{opened === "field-notes" ? "Close field notes" : "Read field notes"} <ArrowUpRight size={16} /></button></div>
        </section>
        {opened === "field-notes" && <div className="content-hub-expanded"><h3>Make consistency easier</h3><ol><li>Choose one action that takes less than ten minutes.</li><li>Attach it to a moment that already happens in your day.</li><li>Track showing up, not being perfect.</li><li>When life gets in the way, restart gently—your previous effort still counts.</li></ol></div>}

        <div className="content-hub-section-heading"><div><p className="content-hub-eyebrow">CURATED FOR YOUR JOURNEY</p><h2>Find your next small win.</h2></div><span>{filtered.length} resources</span></div>
        <div className="content-hub-grid">{filtered.map((item) => { const Icon = item.icon; return <GlassCard key={item.id} className="content-resource-card"><div className="content-resource-art" style={{ "--resource-color": item.color } as React.CSSProperties}><Icon size={26} /><span>{item.type}</span></div><div className="content-resource-body"><div className="content-resource-meta"><span>{item.level}</span><button type="button" onClick={() => setSaved((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])} aria-label={saved.includes(item.id) ? "Remove bookmark" : "Save resource"} className={saved.includes(item.id) ? "is-saved" : ""}><Bookmark size={16} fill={saved.includes(item.id) ? "currentColor" : "none"} /></button></div><h3>{item.title}</h3><p>{item.summary}</p><div className="content-resource-footer"><span><Clock3 size={13} /> {item.duration}</span><button type="button" onClick={() => setOpened(opened === item.id ? null : item.id)}>{opened === item.id ? "Close" : "Explore"} <ArrowUpRight size={14} /></button></div>{opened === item.id && <div className="content-resource-expanded"><p><b>Your takeaway</b><br />Start with one small experiment today. Notice what feels helpful, adjust what does not, and keep the version that fits your real life.</p><button type="button" onClick={() => { setStatus(`“${item.title}” added to your next-step list in this preview.`); setOpened(null) }}><Check size={14} /> Save as next step</button></div>}</div></GlassCard>})}</div>
        {filtered.length === 0 && <div className="content-hub-empty"><Search size={22} /><h3>No matches yet</h3><p>Try a different search or choose another life dimension.</p><button type="button" onClick={() => { setQuery(""); setCategory("all") }}>Clear filters</button></div>}
        {status && <p className="content-hub-status" role="status">{status}</p>}
        <div className="content-hub-bottom"><div><span><Play size={18} /></span><div><b>Want more personal guidance?</b><p>Explore a coach or build your own learning routine.</p></div></div><button type="button" onClick={() => onNavigate("coaching")}>Find a coach <ArrowUpRight size={15} /></button><button type="button" onClick={() => onNavigate("explore")}>Explore tools <ArrowUpRight size={15} /></button></div>
      </div>
    </div>
  )
}
