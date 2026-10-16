import {
  Bell,
  Search,
  Zap,
  Heart,
  Flame,
  Moon,
  TrendingUp,
  Play,
  Users,
  Award,
  ChevronRight,
  Droplets,
} from "lucide-react"
import GlassCard, { Badge } from "../components/GlassCard"
import { DemoNotice } from "../components/UI"
import type { Role, Screen } from "../types"

interface DashboardProps {
  role: Role
  onNavigate: (screen: Screen) => void
}

const quickActions = [
  {
    icon: Play,
    label: "Start\nSession",
    color: "#6C3CE1",
    bg: "rgba(108,60,225,0.2)",
    screen: "coaching",
  },
  {
    icon: Users,
    label: "Find\nCoach",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.12)",
    screen: "coaching",
  },
  {
    icon: Award,
    label: "My\nBadges",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.12)",
    screen: "loyalty",
  },
  {
    icon: TrendingUp,
    label: "Insights",
    color: "#FF2D78",
    bg: "rgba(255,45,120,0.12)",
    screen: "insights",
  },
] as const

const challenges = [
  {
    name: "7-Day Hydration",
    progress: 65,
    reward: "250 pts",
    icon: Droplets,
    color: "#00E5FF",
    days: "3 days left",
  },
  {
    name: "Morning Warrior",
    progress: 40,
    reward: "500 pts",
    icon: Flame,
    color: "#FF6B35",
    days: "5 days left",
  },
  {
    name: "Rest & Recover",
    progress: 80,
    reward: "150 pts",
    icon: Moon,
    color: "#6C3CE1",
    days: "1 day left",
  },
]

const metrics = [
  {
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: Heart,
    color: "#FF2D78",
    delta: "-3%",
  },
  {
    label: "Calories",
    value: "1,840",
    unit: "kcal",
    icon: Flame,
    color: "#FF6B35",
    delta: "+12%",
  },
  {
    label: "Sleep",
    value: "7.4",
    unit: "hrs",
    icon: Moon,
    color: "#6C3CE1",
    delta: "+0.5",
  },
]

export default function Dashboard({ role, onNavigate }: DashboardProps) {
  const roleColors: Record<string, string> = {
    coach: "#6C3CE1",
    student: "#00E5FF",
    seller: "#FF2D78",
  }
  const roleColor = roleColors[role] || "#6C3CE1"
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1)

  const upcomingLabel =
    role === "coach"
      ? "Your next client session"
      : role === "seller"
        ? "Top product this week"
        : "Your next training session"
  const roleSummary = {
    student: {
      label: "WELLNESS SCORE",
      value: "87",
      delta: "+5 sample points this week",
    },
    coach: {
      label: "CLIENT ENGAGEMENT",
      value: "82",
      delta: "6 demo check-ins today",
    },
    seller: {
      label: "STORE HEALTH",
      value: "91",
      delta: "4 demo orders need review",
    },
  }[role]

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "#080810" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 70% -5%, ${roleColor}25 0%, transparent 50%), radial-gradient(ellipse at 0% 80%, rgba(0,229,255,0.1) 0%, transparent 40%)`,
        }}
      />

      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-14 pb-4">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 13,
                  color: "rgba(240,240,255,0.45)",
                }}
              >
                Good morning,
              </span>
              <Badge
                color={
                  role === "coach"
                    ? "purple"
                    : role === "seller"
                      ? "pink"
                      : "cyan"
                }
                size="xs"
              >
                {roleLabel}
              </Badge>
            </div>
            <h2
              style={{
                fontFamily: "Outfit",
                fontWeight: 800,
                fontSize: 24,
                color: "#fff",
                margin: 0,
              }}
            >
              Jordan Clarke
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onNavigate("profile")}
              aria-label="Open notifications"
              className="glass w-10 h-10 rounded-xl flex items-center justify-center relative"
            >
              <Bell size={18} color="rgba(240,240,255,0.7)" />
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#FF2D78",
                  border: "1.5px solid #080810",
                }}
              />
            </button>
            <button
              onClick={() => onNavigate("explore")}
              aria-label="Search GAMva"
              className="glass w-10 h-10 rounded-xl flex items-center justify-center"
            >
              <Search size={18} color="rgba(240,240,255,0.7)" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto hide-scrollbar px-5 flex flex-col gap-4"
        style={{ paddingBottom: 20 }}
      >
        <DemoNotice>
          Role dashboards and health metrics currently use structured sample
          data.
        </DemoNotice>
        {/* Wellness Card */}
        <GlassCard
          glow="purple"
          className="p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,60,225,0.25) 0%, rgba(0,229,255,0.1) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Outfit",
                  fontSize: 11,
                  color: "rgba(240,240,255,0.5)",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                }}
              >
                {roleSummary.label}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 900,
                    fontSize: 52,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {roleSummary.value}
                </span>
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: 18,
                    color: "rgba(240,240,255,0.4)",
                  }}
                >
                  /100
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 4,
                }}
              >
                <TrendingUp size={14} color="#00E5FF" />
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: 12,
                    color: "#00E5FF",
                  }}
                >
                  {roleSummary.delta}
                </span>
              </div>
            </div>
            {/* Circular progress */}
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="6"
                  strokeDasharray={`${(87 / 100) * 201} 201`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <defs>
                  <linearGradient
                    id="scoreGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6C3CE1" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={20} color="#00E5FF" />
              </div>
            </div>
          </div>

          {/* Bar chart mini */}
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "flex-end",
              height: 36,
              marginBottom: 6,
            }}
          >
            {[65, 80, 72, 90, 85, 78, 87].map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    borderRadius: 3,
                    height: `${v}%`,
                    background:
                      i === 6
                        ? "linear-gradient(180deg, #6C3CE1, #00E5FF)"
                        : "rgba(255,255,255,0.12)",
                    boxShadow:
                      i === 6 ? "0 0 10px rgba(108,60,225,0.5)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  color: i === 6 ? "#00E5FF" : "rgba(240,240,255,0.25)",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div>
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 600,
              fontSize: 15,
              color: "rgba(240,240,255,0.7)",
              marginBottom: 12,
            }}
          >
            Quick Actions
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
            }}
          >
            {quickActions.map(({ icon: Icon, label, color, bg, screen }) => (
              <button
                key={label}
                onClick={() => onNavigate(screen)}
                className="glass rounded-2xl py-3 px-2 flex flex-col items-center gap-2"
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <span
                  style={{
                    fontFamily: "Outfit",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(240,240,255,0.65)",
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Row */}
        <div>
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 600,
              fontSize: 15,
              color: "rgba(240,240,255,0.7)",
              marginBottom: 12,
            }}
          >
            Today's Stats
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {metrics.map(
              ({ label, value, unit, icon: Icon, color, delta }, i) => (
                <GlassCard
                  key={i}
                  className="flex-1 p-3"
                  style={{ textAlign: "center" }}
                >
                  <Icon
                    size={16}
                    color={color}
                    style={{ margin: "0 auto 6px" }}
                  />
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#fff",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: 10,
                      color: "rgba(240,240,255,0.4)",
                      margin: "2px 0 4px",
                    }}
                  >
                    {unit}
                  </p>
                  <Badge
                    color={delta.startsWith("+") ? "cyan" : "muted"}
                    size="xs"
                  >
                    {delta}
                  </Badge>
                </GlassCard>
              ),
            )}
          </div>
        </div>

        {/* Upcoming */}
        <GlassCard
          onClick={() => onNavigate("coaching")}
          style={{
            background:
              "linear-gradient(135deg, rgba(108,60,225,0.15) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ padding: "14px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "Outfit",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(240,240,255,0.45)",
                  letterSpacing: "0.08em",
                }}
              >
                UPCOMING
              </p>
              <ChevronRight size={16} color="rgba(240,240,255,0.3)" />
            </div>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                color: "rgba(240,240,255,0.5)",
                marginBottom: 4,
              }}
            >
              {upcomingLabel}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#fff",
                    margin: "0 0 4px",
                  }}
                >
                  HIIT Power Circuit
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <Badge color="purple" size="xs">
                    Today, 6:30 PM
                  </Badge>
                  <Badge color="muted" size="xs">
                    45 min
                  </Badge>
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #6C3CE1, #00E5FF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(108,60,225,0.5)",
                }}
              >
                <Play size={18} color="#fff" fill="#fff" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Challenges */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p
              style={{
                fontFamily: "Outfit",
                fontWeight: 600,
                fontSize: 15,
                color: "rgba(240,240,255,0.7)",
                margin: 0,
              }}
            >
              Active Challenges
            </p>
            <button
              onClick={() => onNavigate("loyalty")}
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                color: "#6C3CE1",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              See all
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {challenges.map(
              ({ name, progress, reward, icon: Icon, color, days }, i) => (
                <GlassCard key={i} className="p-4">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: `${color}20`,
                        border: `1px solid ${color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={18} color={color} />
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
                        {name}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <Badge color="gold" size="xs">
                          🏆 {reward}
                        </Badge>
                        <span
                          style={{
                            fontFamily: "Inter",
                            fontSize: 11,
                            color: "rgba(240,240,255,0.4)",
                          }}
                        >
                          {days}
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 13,
                        fontWeight: 600,
                        color,
                      }}
                    >
                      {progress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                      }}
                    />
                  </div>
                </GlassCard>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
