import { useState } from "react"
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  HeartHandshake,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import GlassCard from "../components/GlassCard"
import { DemoNotice } from "../components/UI"
import type { Screen } from "../types"

interface SocialProps {
  onNavigate: (screen: Screen) => void
}

const challenges = [
  { id: "water", title: "Hydration, one glass at a time", category: "HEALTH", members: "2.4k", days: "7 days", color: "#00E5FF", icon: "💧", description: "Build a gentle hydration rhythm, without perfection." },
  { id: "read", title: "15 minutes of learning", category: "LEARNING", members: "1.8k", days: "14 days", color: "#8B7CFF", icon: "📚", description: "Make a little room for curiosity every day." },
  { id: "brave", title: "One brave thing", category: "COURAGE", members: "960", days: "5 days", color: "#72A7FF", icon: "✦", description: "Take one manageable step toward something you've avoided." },
]

const posts = [
  { id: 1, name: "Alex Morgan", initials: "AM", role: "Community member", time: "18 min ago", color: "#8B7CFF", tag: "PERSONAL GROWTH", text: "I used to think a routine only counted if I completed every part. Today I did ten minutes instead of thirty, and I’m choosing to count that as showing up.", likes: 128, comments: 16 },
  { id: 2, name: "Taylor Chen", initials: "TC", role: "Verified coach", time: "1 hr ago", color: "#00E5FF", tag: "MIND & WELLBEING", text: "A reminder for this week: rest is a practice too. If your plan needs to adapt to your life, that isn’t failure. That’s a plan working.", likes: 94, comments: 11 },
]

export default function Social({ onNavigate }: SocialProps) {
  const [feed, setFeed] = useState<"community" | "following" | "challenges">("community")
  const [liked, setLiked] = useState<number[]>([])
  const [joined, setJoined] = useState<string[]>([])
  const [supported, setSupported] = useState<number[]>([])
  const [showIntent, setShowIntent] = useState(false)
  const [intent, setIntent] = useState("")
  const [publishedIntent, setPublishedIntent] = useState<string | null>(null)
  const [status, setStatus] = useState("")

  const toggle = (items: string[] | number[], id: string | number, setter: (value: any) => void) => {
    setter(items.includes(id as never) ? items.filter((item) => item !== id) : [...items, id])
  }

  return (
    <div className="screen community-screen">
      <header className="community-header">
        <div>
          <p className="community-eyebrow"><Users size={13} /> THE HUMAN SIDE OF PROGRESS</p>
          <h1>Better, <span>together.</span></h1>
          <p>Find your people. Share the small wins. Make room for everyone’s journey.</p>
        </div>
        <button type="button" className="community-create-button" onClick={() => setShowIntent(true)}><Plus size={17} /> Share a good intention</button>
      </header>
      <div className="community-scroll">
        <DemoNotice>Community activity and challenge participation shown here are sample preview data.</DemoNotice>
        <div className="community-hero">
          <div className="community-hero-art"><div className="community-orbit orbit-a" /><div className="community-orbit orbit-b" /><div className="community-hero-symbol"><HeartHandshake size={34} /></div><span className="community-star star-a">✦</span><span className="community-star star-b">✧</span></div>
          <div className="community-hero-copy"><span className="community-kicker">THE GAMVA PROMISE</span><h2>Progress is personal.<br /><span>Support is universal.</span></h2><p>A kinder kind of community—built around encouragement, not comparison.</p><div className="community-hero-stats"><span><b>8</b> life dimensions</span><span><b>1</b> shared purpose</span><span><b>∞</b> ways to grow</span></div></div>
        </div>

        <div className="community-feature-grid">
          <button type="button" className="community-feature-card" onClick={() => setFeed("following")}><span className="community-feature-icon cyan"><Users size={20} /></span><span><b>Your circle</b><small>Encouragement from people you follow</small></span><ChevronRight size={17} /></button>
          <button type="button" className="community-feature-card" onClick={() => setFeed("challenges")}><span className="community-feature-icon purple"><Zap size={20} /></span><span><b>Public challenges</b><small>Small commitments, shared momentum</small></span><ChevronRight size={17} /></button>
          <button type="button" className="community-feature-card" onClick={() => setShowIntent(true)}><span className="community-feature-icon gold"><HeartHandshake size={20} /></span><span><b>Good intentions</b><small>Turn care into meaningful action</small></span><ChevronRight size={17} /></button>
        </div>

        <div className="community-feed-heading"><div><p className="community-eyebrow">YOUR COMMUNITY</p><h2>Good things grow here.</h2></div><button type="button" className="community-search" onClick={() => setStatus("Community search will be connected when the social API is available.")} aria-label="Search community"><Search size={18} /></button></div>
        <div className="community-tabs" role="tablist" aria-label="Community feed">
          {([{id:"community",label:"For you"},{id:"following",label:"Following"},{id:"challenges",label:"Challenges"}] as const).map((item) => <button key={item.id} type="button" role="tab" aria-selected={feed === item.id} className={feed === item.id ? "is-active" : ""} onClick={() => setFeed(item.id)}>{item.label}</button>)}
        </div>

        {feed === "challenges" ? (
          <div className="community-challenge-list">{challenges.map((challenge) => <GlassCard key={challenge.id} className="community-challenge-card p-4"><div className="community-challenge-art" style={{ "--challenge-color": challenge.color } as React.CSSProperties}><span>{challenge.icon}</span><small>{challenge.category}</small></div><div className="community-challenge-copy"><div className="community-challenge-meta"><span>{challenge.days}</span><span><Users size={12} /> {challenge.members}</span></div><h3>{challenge.title}</h3><p>{challenge.description}</p><button type="button" className={joined.includes(challenge.id) ? "community-join is-joined" : "community-join"} onClick={() => toggle(joined, challenge.id, setJoined)}>{joined.includes(challenge.id) ? <><Check size={15} /> Joined</> : <>Join challenge <ArrowUpRight size={15} /></>}</button></div></GlassCard>)}</div>
        ) : (
          <div className="community-post-list">{(feed === "following" ? posts.slice(1) : posts).map((post) => <GlassCard key={post.id} className="community-post p-4"><div className="community-post-top"><div className="community-person-avatar" style={{ "--person-color": post.color } as React.CSSProperties}>{post.initials}</div><div className="community-person-info"><div><b>{post.name}</b>{post.role === "Verified coach" && <BadgeCheck size={14} color="#00E5FF" />}</div><small>{post.role} · {post.time}</small></div><button type="button" className="community-more" onClick={() => setStatus("Post options are being prepared for the community API.")} aria-label="More post options"><MoreHorizontal size={18} /></button></div><span className="community-post-tag">{post.tag}</span><p className="community-post-text">{post.text}</p><div className="community-post-actions"><button type="button" className={liked.includes(post.id) ? "is-liked" : ""} onClick={() => toggle(liked, post.id, setLiked)}><Heart size={17} fill={liked.includes(post.id) ? "currentColor" : "none"} /> {post.likes + (liked.includes(post.id) ? 1 : 0)} <span>Encourage</span></button><button type="button" onClick={() => setStatus("Comments will be available when community conversations are connected.")}><MessageCircle size={17} /> {post.comments} <span>Thoughtful replies</span></button><button type="button" onClick={() => setSupported((current) => current.includes(post.id) ? current.filter((id) => id !== post.id) : [...current, post.id])} className={supported.includes(post.id) ? "is-supported" : ""}><HeartHandshake size={17} /> {supported.includes(post.id) ? "Supported" : "Support"}</button></div></GlassCard>)}</div>
        )}

        {publishedIntent && <div className="community-intent-post"><HeartHandshake size={20} /><div><small>YOUR GOOD INTENTION · PREVIEW</small><p>{publishedIntent}</p></div></div>}
        {status && <p className="community-status" role="status">{status}</p>}
        <div className="community-bottom-links"><button type="button" onClick={() => onNavigate("coaching")}><Sparkles size={17} /> Meet a coach</button><button type="button" onClick={() => onNavigate("content")}><ChevronRight size={17} /> Explore helpful content</button></div>
      </div>

      {showIntent && <div className="community-modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setShowIntent(false) }}><section className="community-intent-modal" role="dialog" aria-modal="true" aria-labelledby="intent-title"><button type="button" className="community-modal-close" onClick={() => setShowIntent(false)} aria-label="Close"><span>×</span></button><span className="community-feature-icon gold"><HeartHandshake size={21} /></span><p className="community-eyebrow">A LITTLE GOOD GOES A LONG WAY</p><h2 id="intent-title">Share a good intention</h2><p>What is one kind, helpful, or meaningful thing you want to do?</p><textarea value={intent} onChange={(event) => setIntent(event.target.value)} maxLength={220} placeholder="This week, I want to…" rows={4} /><div className="community-modal-footer"><small>{intent.length}/220 · Shared in this local preview only</small><button type="button" disabled={!intent.trim()} onClick={() => { setPublishedIntent(intent.trim()); setIntent(""); setShowIntent(false); setStatus("Your intention was added to this preview.") }}>Share intention <ArrowUpRight size={15} /></button></div></section></div>}
    </div>
  )
}
