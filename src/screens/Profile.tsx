import { useState } from "react"
import {
  Sun,
  Moon,
  Edit2,
  ChevronRight,
  Bell,
  Shield,
  Gift,
  Share2,
  Star,
  LogOut,
  Crown,
  CreditCard,
  HelpCircle,
  Users,
  BarChart2,
} from "lucide-react"
import GlassCard, { Badge } from "../components/GlassCard"
import { DemoNotice } from "../components/UI"
import type { Role, Screen } from "../types"

interface ProfileProps {
  role: Role
  onRoleChange: (role: Role) => void
  onLogout: () => void
  onNavigate: (screen: Screen) => void
  theme: "dark" | "light"
  onToggleTheme: () => void
}

const menuGroups = [
  {
    title: "Account",
    items: [
      { icon: Edit2, label: "Edit Profile", color: "#6C3CE1" },
      { icon: Bell, label: "Notifications", color: "#00E5FF", badge: "3" },
      { icon: Shield, label: "Privacy & Security", color: "#FF2D78" },
      { icon: CreditCard, label: "Billing & Subscriptions", color: "#FFD700" },
    ],
  },
  {
    title: "Rewards",
    items: [
      { icon: Crown, label: "Loyalty Hub", color: "#FFD700", badge: "Gold" },
      {
        icon: Gift,
        label: "Gift & Referral",
        color: "#FF6B35",
        action: "referral",
      },
      { icon: Share2, label: "Share GAMva", color: "#6C3CE1" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", color: "#00E5FF" },
      { icon: Star, label: "Rate the App", color: "#FFD700" },
    ],
  },
]

export default function Profile({
  role,
  onRoleChange,
  onLogout,
  onNavigate,
  theme,
  onToggleTheme,
}: ProfileProps) {
  const [showReferral, setShowReferral] = useState(false)
  const [activeProfileTab, setActiveProfileTab] = useState("Moments")
  const [status, setStatus] = useState("")
  const [displayName, setDisplayName] = useState("Jordan Clarke")
  const [email, setEmail] = useState("jordan@example.com")
  const [editingProfile, setEditingProfile] = useState(false)
  const [draftName, setDraftName] = useState("Jordan Clarke")
  const [draftEmail, setDraftEmail] = useState("jordan@example.com")
  const initials = displayName.split(/\s+/).map((part) => part[0] ?? "").join("").slice(0, 2).toUpperCase()

  if (showReferral) {
    return <GiftReferral onBack={() => setShowReferral(false)} />
  }

  const roleColors: Record<string, string> = {
    coach: "#6C3CE1",
    student: "#00E5FF",
    seller: "#FF2D78",
  }
  const roleColor = roleColors[role] || "#6C3CE1"

  return (
    <div
      className="screen profile-screen flex flex-col h-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 0%, ${roleColor}20 0%, transparent 50%)`,
        }}
      />

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Hero section */}
        <div className="profile-hero" style={{ padding: "34px 20px 24px", textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 28,
                background: "linear-gradient(135deg, #6C3CE1, #00E5FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(108,60,225,0.4)",
                fontSize: 34,
                color: "#FFFFFF",
                fontFamily: "Outfit",
                fontWeight: 800,
              }}
            >
              {initials}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -4,
                right: -4,
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "#FFD700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #080810",
                boxShadow: "0 0 12px rgba(255,215,0,0.5)",
              }}
            >
              <Crown size={16} color="#080810" />
            </div>
          </div>

          <h2
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 24,
              color: "#fff",
              margin: "0 0 4px",
            }}
          >
            {displayName}
          </h2>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              color: "rgba(240,240,255,0.5)",
              margin: "0 0 12px",
            }}
          >
            {email}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <Badge
              color={
                role === "coach"
                  ? "purple"
                  : role === "seller"
                    ? "pink"
                    : "cyan"
              }
              size="sm"
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
            <Badge color="gold" size="sm">
              🥇 Gold Member
            </Badge>
            <Badge color="purple" size="sm">
              ⚡ 12-day streak
            </Badge>
          </div>
        </div>
        <div style={{ margin: "0 20px 20px" }}>
          <DemoNotice>
            Profile, billing, and security settings are local prototype
            controls.
          </DemoNotice>
        </div>

        {/* Stats strip */}
        <div
          className="profile-stats"
          style={{
            margin: "0 20px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {[
            { value: "2,850", label: "Points", color: "#FFD700" },
            { value: "18", label: "Sessions", color: "#6C3CE1" },
            { value: "12", label: "Badges", color: "#00E5FF" },
            { value: "3", label: "Referrals", color: "#FF2D78" },
          ].map((s, i) => (
            <GlassCard key={i} className="p-3 text-center">
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 800,
                  fontSize: 18,
                  color: s.color,
                  margin: "0 0 2px",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 10,
                  color: "rgba(240,240,255,0.4)",
                  margin: 0,
                }}
              >
                {s.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Life in frames — a personal, social-first profile experience */}
        <section className="profile-moments" aria-label="Life moments">
          <div className="profile-moments-heading">
            <div><span className="profile-kicker">YOUR LIFE, IN MOTION</span><h3>Little moments. <em>Real growth.</em></h3></div>
            <button type="button" className="profile-create-moment" onClick={() => setStatus("Moment creation is ready for the next product iteration.")}>＋ <span>Share a moment</span></button>
          </div>
          <div className="profile-story-row">
            <button type="button" className="profile-story profile-story-add" onClick={() => setStatus("Your story composer is a preview interaction.")}><span className="profile-story-ring"><span>＋</span></span><small>Your story</small></button>
            {[
              {name:"Maya",art:"sunrise",emoji:"🌅"},
              {name:"Alex",art:"ocean",emoji:"🌊"},
              {name:"Sam",art:"bloom",emoji:"🌱"},
              {name:"Noah",art:"summit",emoji:"⛰️"},
            ].map((story) => <button type="button" className="profile-story" key={story.name} onClick={() => setStatus(`${story.name}'s story is part of the social preview.`)}><span className={`profile-story-ring story-${story.art}`}><span>{story.emoji}</span></span><small>{story.name}</small></button>)}
          </div>
          <div className="profile-moment-tabs" role="tablist" aria-label="Profile content">
            {["Moments","Journey","Saved"].map(tab => <button key={tab} type="button" role="tab" aria-selected={activeProfileTab === tab} className={activeProfileTab === tab ? "is-active" : ""} onClick={() => setActiveProfileTab(tab)}>{tab}</button>)}
          </div>
          {activeProfileTab === "Moments" && <div className="profile-moment-grid">
            <button type="button" className="profile-moment-tile moment-mountain" onClick={() => setStatus("A quiet morning, a clearer mind. Moment detail is a preview.")}><span className="moment-tag">MIND · 7:12 AM</span><span className="moment-art-emoji">☀</span><strong>Making space to breathe.</strong><small>♡ 128&nbsp; · &nbsp;12 comments</small></button>
            <button type="button" className="profile-moment-tile moment-workout" onClick={() => setStatus("Progress is built one rep at a time. Moment detail is a preview.")}><span className="moment-tag">HEALTH · DAY 12</span><span className="moment-art-emoji">✦</span><strong>Showed up for myself.</strong><small>♡ 86&nbsp; · &nbsp;8 comments</small></button>
            <button type="button" className="profile-moment-tile moment-journal" onClick={() => setStatus("Three good things, captured. Moment detail is a preview.")}><span className="moment-tag">JOURNAL · TODAY</span><span className="moment-art-emoji">✎</span><strong>Three things going right.</strong><small>♡ 54&nbsp; · &nbsp;5 comments</small></button>
            <button type="button" className="profile-moment-tile moment-community" onClick={() => onNavigate("social")}><span className="moment-tag">COMMUNITY · KINDNESS</span><span className="moment-art-emoji">♡</span><strong>Good grows when shared.</strong><small>♡ 203&nbsp; · &nbsp;21 comments</small></button>
          </div>}
          {activeProfileTab === "Journey" && <div className="profile-journey-card"><div className="journey-orb">✧</div><div><span className="profile-kicker">YOUR PERSONAL EVOLUTION</span><h4>12 days of showing up</h4><p>Small promises kept are becoming a way of life.</p><div className="journey-meter"><span /></div><small>12-day streak · 4 dimensions in focus</small></div></div>}
          {activeProfileTab === "Saved" && <div className="profile-saved-card"><span>✧</span><div><strong>Keep what moves you.</strong><p>Save meaningful moments, ideas, and milestones here as you explore GAMva.</p></div></div>}
          {status && <div className="profile-moment-status" role="status">{status}<button type="button" onClick={() => setStatus("")} aria-label="Dismiss message">×</button></div>}
        </section>

        {/* Appearance preferences */}
        <div className="profile-section" style={{ margin: "0 20px 20px" }}>
          <GlassCard className="profile-theme-card p-4">
            <div className="profile-theme-copy">
              <div className="profile-theme-icon">{theme === "dark" ? <Moon size={19} /> : <Sun size={19} />}</div>
              <div>
                <h3>Appearance</h3>
                <p>{theme === "dark" ? "Dark mode · Neon at night" : "Light mode · Clear by day"}</p>
              </div>
            </div>
            <button
              type="button"
              className={theme === "light" ? "profile-theme-switch is-light" : "profile-theme-switch"}
              onClick={onToggleTheme}
              role="switch"
              aria-checked={theme === "light"}
              aria-label="Toggle light and dark mode"
            >
              <span />
              <small>{theme === "dark" ? "DARK" : "LIGHT"}</small>
            </button>
          </GlassCard>
        </div>

        {/* Role switch */}
        <div className="profile-section" style={{ margin: "0 20px 20px" }}>
          <GlassCard className="p-4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "rgba(240,240,255,0.7)",
                  margin: 0,
                }}
              >
                Active Role
              </p>
              <span
                style={{ fontFamily: "Inter", fontSize: 12, color: "#6C3CE1" }}
              >
                Select below
              </span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                {
                  id: "student",
                  label: "Student",
                  icon: "🎓",
                  color: "#00E5FF",
                },
                { id: "coach", label: "Coach", icon: "🏋️", color: "#6C3CE1" },
                { id: "seller", label: "Seller", icon: "🛍️", color: "#FF2D78" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id as Role)}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 12,
                    textAlign: "center",
                    background:
                      r.id === role ? `${r.color}20` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${
                      r.id === role ? r.color + "40" : "rgba(255,255,255,0.08)"
                    }`,
                    cursor: "pointer",
                  }}
                >
                  <p style={{ fontSize: 20, margin: "0 0 3px" }}>{r.icon}</p>
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: r.id === role ? 700 : 500,
                      fontSize: 12,
                      color: r.id === role ? "#fff" : "rgba(240,240,255,0.4)",
                      margin: 0,
                    }}
                  >
                    {r.label}
                  </p>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Menu groups */}
        {menuGroups.map((group, gi) => (
          <div className="profile-section" key={gi} style={{ margin: "0 20px 20px" }}>
            <p
              style={{
                fontFamily: "Outfit",
                fontWeight: 600,
                fontSize: 12,
                color: "rgba(240,240,255,0.35)",
                letterSpacing: "0.1em",
                marginBottom: 10,
              }}
            >
              {group.title.toUpperCase()}
            </p>
            <GlassCard className="overflow-hidden">
              {group.items.map(
                ({ icon: Icon, label, color, badge, action }, j) => (
                  <button
                    key={j}
                    onClick={() => {
                      if (action === "referral") setShowReferral(true)
                      else if (label === "Loyalty Hub") onNavigate("loyalty")
                      else if (label === "Edit Profile") {
                        setDraftName(displayName)
                        setDraftEmail(email)
                        setEditingProfile(true)
                      } else if (label === "Share GAMva") {
                        setStatus("Share your GAMva journey with someone who could use a little encouragement.")
                      } else {
                        setStatus(`${label} is a preview control; account services are not connected yet.`)
                      }
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      borderBottom:
                        j < group.items.length - 1
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "none",
                      background: "transparent",
                      border: j < group.items.length - 1 ? undefined : "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: `${color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={color} />
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: 15,
                        color: "#f0f0ff",
                        flex: 1,
                      }}
                    >
                      {label}
                    </span>
                    {badge && (
                      <Badge
                        color={badge === "Gold" ? "gold" : "cyan"}
                        size="xs"
                      >
                        {badge}
                      </Badge>
                    )}
                    <ChevronRight size={16} color="rgba(240,240,255,0.25)" />
                  </button>
                ),
              )}
            </GlassCard>
          </div>
        ))}
        {status && (
          <p
            role="status"
            style={{ margin: "0 20px 16px", color: "#00E5FF", fontSize: 12 }}
          >
            {status}
          </p>
        )}

        {/* Sign out */}
        <div style={{ margin: "0 20px 32px" }}>
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 0",
              borderRadius: 16,
              background: "rgba(255,45,120,0.08)",
              border: "1px solid rgba(255,45,120,0.2)",
              fontFamily: "Outfit",
              fontWeight: 600,
              fontSize: 15,
              color: "#FF2D78",
              cursor: "pointer",
            }}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
      {editingProfile && (
        <div className="profile-modal-overlay" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setEditingProfile(false) }}>
          <form className="profile-edit-modal" role="dialog" aria-modal="true" aria-labelledby="profile-edit-title" onSubmit={(event) => { event.preventDefault(); if (!draftName.trim() || !draftEmail.trim()) return; setDisplayName(draftName.trim()); setEmail(draftEmail.trim()); setEditingProfile(false); setStatus("Profile details updated in this preview.") }}>
            <button type="button" className="profile-edit-close" onClick={() => setEditingProfile(false)} aria-label="Close edit profile">×</button>
            <p className="octo-eyebrow">YOUR ACCOUNT</p>
            <h2 id="profile-edit-title">Edit profile</h2>
            <label>Display name<input value={draftName} onChange={(event) => setDraftName(event.target.value)} maxLength={60} required /></label>
            <label>Email address<input type="email" value={draftEmail} onChange={(event) => setDraftEmail(event.target.value)} maxLength={120} required /></label>
            <p className="profile-edit-note">Changes are saved locally in this preview session.</p>
            <button type="submit" className="profile-edit-save">Save changes</button>
          </form>
        </div>
      )}
    </div>
  )
}

function GiftReferral({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const [shareStatus, setShareStatus] = useState("")
  const refCode = "JORDAN2024"
  const inviteText = `Join the GAMva demo with code ${refCode}`

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(refCode)
      setCopied(true)
      setShareStatus("Referral code copied.")
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setShareStatus("Clipboard access was unavailable.")
    }
  }

  const shareInvite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "GAMva demo invite", text: inviteText })
        setShareStatus("Share sheet opened.")
      } else {
        await navigator.clipboard.writeText(inviteText)
        setShareStatus("Invite text copied because sharing is unavailable.")
      }
    } catch {
      setShareStatus("Sharing was cancelled or unavailable.")
    }
  }

  const referrals = [
    {
      name: "Alex Kim",
      status: "Active",
      reward: "+500 pts",
      avatar: "👤",
      joined: "2 days ago",
    },
    {
      name: "Sam Lee",
      status: "Active",
      reward: "+500 pts",
      avatar: "👤",
      joined: "1 week ago",
    },
    {
      name: "Morgan P.",
      status: "Pending",
      reward: "Pending",
      avatar: "👤",
      joined: "Invited",
    },
  ]

  return (
    <div
      className="screen profile-screen flex flex-col h-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(255,107,53,0.2) 0%, transparent 55%)",
        }}
      />

      <div className="flex-shrink-0 px-5 pt-14 pb-4">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onBack}
            className="glass w-10 h-10 rounded-xl flex items-center justify-center"
          >
            <ChevronRight
              size={18}
              color="rgba(240,240,255,0.8)"
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
          <div>
            <h2
              style={{
                fontFamily: "Outfit",
                fontWeight: 800,
                fontSize: 24,
                color: "#fff",
                margin: 0,
              }}
            >
              Gift & Referral
            </h2>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                color: "rgba(240,240,255,0.4)",
                margin: "2px 0 0",
              }}
            >
              Invite friends, earn rewards
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto hide-scrollbar px-5"
        style={{ paddingBottom: 20 }}
      >
        <div style={{ marginBottom: 16 }}>
          <DemoNotice>
            Referral people, points, and rewards below are sample program data.
          </DemoNotice>
        </div>
        {/* Hero referral card */}
        <GlassCard
          className="p-5 mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,45,120,0.1) 100%)",
            border: "1px solid rgba(255,107,53,0.3)",
          }}
        >
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 12,
              color: "#FF6B35",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            YOUR REFERRAL CODE
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                fontSize: 28,
                color: "#fff",
                margin: 0,
                letterSpacing: "0.06em",
              }}
            >
              {refCode}
            </p>
            <button
              onClick={copyCode}
              style={{
                background: copied
                  ? "rgba(0,229,255,0.2)"
                  : "rgba(255,107,53,0.2)",
                border: `1px solid ${
                  copied ? "rgba(0,229,255,0.4)" : "rgba(255,107,53,0.3)"
                }`,
                borderRadius: 12,
                padding: "8px 16px",
                fontFamily: "Outfit",
                fontWeight: 700,
                fontSize: 13,
                color: copied ? "#00E5FF" : "#FF6B35",
                cursor: "pointer",
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              color: "rgba(240,240,255,0.6)",
              margin: "0 0 14px",
              lineHeight: 1.5,
            }}
          >
            Share your code and both you and your friend earn{" "}
            <strong style={{ color: "#FFD700" }}>500 points</strong> when they
            complete their first session.
          </p>
          <button
            onClick={shareInvite}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 14,
              background: "linear-gradient(135deg, #FF6B35, #FF2D78)",
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 0 16px rgba(255,107,53,0.4)",
            }}
          >
            <Share2 size={16} /> Share Invite Link
          </button>
          {shareStatus && (
            <p
              role="status"
              style={{ margin: "10px 0 0", color: "#00E5FF", fontSize: 12 }}
            >
              {shareStatus}
            </p>
          )}
        </GlassCard>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            { value: "3", label: "Referred", color: "#FF6B35" },
            { value: "2", label: "Active", color: "#00E5FF" },
            { value: "1,000", label: "Pts Earned", color: "#FFD700" },
          ].map((s, i) => (
            <GlassCard key={i} className="p-3 text-center">
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 800,
                  fontSize: 20,
                  color: s.color,
                  margin: "0 0 3px",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 10,
                  color: "rgba(240,240,255,0.4)",
                  margin: 0,
                }}
              >
                {s.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* How it works */}
        <GlassCard className="p-4 mb-4">
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 15,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            How it works
          </p>
          {[
            {
              step: "1",
              text: "Share your unique referral code",
              icon: Share2,
              color: "#6C3CE1",
            },
            {
              step: "2",
              text: "Friend signs up and completes a session",
              icon: Users,
              color: "#00E5FF",
            },
            {
              step: "3",
              text: "Both of you earn 500 loyalty points",
              icon: Gift,
              color: "#FFD700",
            },
            {
              step: "4",
              text: "Unlock bonus at 5 referrals — 2,000 pts!",
              icon: Star,
              color: "#FF6B35",
            },
          ].map(({ step, text, icon: Icon, color }, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: i < 3 ? 12 : 0,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: `${color}20`,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color={color} />
              </div>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 13,
                  color: "rgba(240,240,255,0.7)",
                  margin: 0,
                  flex: 1,
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </GlassCard>

        {/* Referral list */}
        <p
          style={{
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 15,
            color: "rgba(240,240,255,0.8)",
            marginBottom: 10,
          }}
        >
          Your Referrals
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {referrals.map((r, i) => (
            <GlassCard key={i} className="p-4">
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 13,
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {r.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#fff",
                      margin: "0 0 2px",
                    }}
                  >
                    {r.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: 12,
                      color: "rgba(240,240,255,0.4)",
                      margin: 0,
                    }}
                  >
                    {r.joined}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Badge
                    color={r.status === "Active" ? "cyan" : "muted"}
                    size="xs"
                  >
                    {r.status}
                  </Badge>
                  <p
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 12,
                      color: r.reward.includes("pts")
                        ? "#FFD700"
                        : "rgba(240,240,255,0.35)",
                      margin: "4px 0 0",
                      textAlign: "right",
                    }}
                  >
                    {r.reward}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
