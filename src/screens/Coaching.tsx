import { useState } from "react"
import {
  Star,
  Clock,
  Users,
  Video,
  Calendar,
  Play,
  ChevronRight,
  Dumbbell,
  Heart,
} from "lucide-react"
import GlassCard, { Badge } from "../components/GlassCard"
import { Button, DemoNotice } from "../components/UI"
import type { Screen } from "../types"

const coaches = [
  {
    name: "Maya Chen",
    specialty: "HIIT & Strength",
    rating: 4.9,
    clients: 142,
    price: "$60/hr",
    badge: "Elite",
    tagline: "Structured strength coaching for progressive training",
    img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&auto=format",
    color: "#6C3CE1",
    sessions: 892,
    nextSlot: "Today, 7 PM",
    plans: ["Strength Builder", "Fat Loss Sprint", "Performance Peak"],
  },
  {
    name: "Alex Rivera",
    specialty: "Yoga & Mobility",
    rating: 4.8,
    clients: 98,
    price: "$45/hr",
    badge: "Pro",
    tagline: "Find your flow, heal your body",
    img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=200&h=200&fit=crop&auto=format",
    color: "#00E5FF",
    sessions: 541,
    nextSlot: "Tomorrow, 9 AM",
    plans: ["Morning Flow", "Flexibility Focus", "Stress Reset"],
  },
  {
    name: "Jordan Smith",
    specialty: "Nutrition Coach",
    rating: 4.7,
    clients: 215,
    price: "$55/hr",
    badge: "Pro",
    tagline: "Fuel your potential with precision nutrition",
    img: "https://images.unsplash.com/photo-1522898467493-49726bf28798?w=200&h=200&fit=crop&auto=format",
    color: "#FF2D78",
    sessions: 1203,
    nextSlot: "Today, 5 PM",
    plans: ["Macro Blueprint", "Lean Bulk Plan", "Metabolic Reset"],
  },
]

const upcomingSessions = [
  {
    coach: "Maya Chen",
    type: "Live HIIT Circuit",
    time: "Today • 6:30 PM",
    duration: "45 min",
    status: "upcoming",
  },
  {
    coach: "Jordan Smith",
    type: "Nutrition Check-in",
    time: "Wed • 3:00 PM",
    duration: "30 min",
    status: "upcoming",
  },
]

interface CoachingProps {
  onNavigate: (screen: Screen) => void
}

export default function Coaching({ onNavigate }: CoachingProps) {
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null)
  const [bookingCoach, setBookingCoach] = useState<number | null>(null)
  const [bookingStatus, setBookingStatus] = useState("")
  const [view, setView] = useState<"hub" | "plan" | "live">("hub")

  if (view === "live") {
    return <LiveSession onBack={() => setView("hub")} />
  }

  if (view === "plan" && selectedCoach !== null) {
    const coach = coaches[selectedCoach]
    return (
      <TrainingPlan
        coach={coach}
        onBack={() => setView("hub")}
        onLive={() => setView("live")}
      />
    )
  }

  return (
    <div
      className="screen coaching-screen flex flex-col h-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(108,60,225,0.2) 0%, transparent 50%)",
        }}
      />

      <div className="flex-shrink-0 px-5 pt-14 pb-4">
        <h2
          style={{
            fontFamily: "Outfit",
            fontWeight: 800,
            fontSize: 26,
            color: "#fff",
            margin: "0 0 4px",
          }}
        >
          Coaching Hub
        </h2>
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 13,
            color: "rgba(240,240,255,0.45)",
            margin: 0,
          }}
        >
          Book sessions, follow plans, go live
        </p>
      </div>

      <div
        className="flex-1 overflow-y-auto hide-scrollbar px-5"
        style={{ paddingBottom: 20 }}
      >
        <div className="mb-4">
          <DemoNotice>
            Booking and live sessions are prototype flows; no calendar or video
            service is connected.
          </DemoNotice>
        </div>
        {bookingCoach !== null && (
          <GlassCard className="p-4 mb-4">
            <p className="font-[Outfit] font-bold">Review demo booking</p>
            <p className="text-sm text-muted-foreground mt-1">
              {coaches[bookingCoach].name} · {coaches[bookingCoach].nextSlot} ·{" "}
              {coaches[bookingCoach].price}
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => {
                  setBookingStatus(
                    "Time saved locally. No external booking was created.",
                  )
                  setBookingCoach(null)
                }}
              >
                Confirm demo slot
              </Button>
              <Button variant="secondary" onClick={() => setBookingCoach(null)}>
                Cancel
              </Button>
            </div>
          </GlassCard>
        )}
        {bookingStatus && (
          <p className="text-xs text-accent mb-4" role="status">
            {bookingStatus}
          </p>
        )}
        {/* Upcoming sessions */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 16,
              color: "rgba(240,240,255,0.8)",
              marginBottom: 12,
            }}
          >
            Your Sessions
          </p>
          {upcomingSessions.map((s, i) => (
            <GlassCard
              key={i}
              className="p-4 mb-3"
              onClick={() => setView("live")}
              style={{
                background:
                  "linear-gradient(135deg, rgba(108,60,225,0.12) 0%, rgba(0,0,0,0) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#fff",
                      margin: "0 0 4px",
                    }}
                  >
                    {s.type}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: 12,
                      color: "rgba(240,240,255,0.5)",
                      margin: "0 0 8px",
                    }}
                  >
                    with {s.coach}
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Calendar size={12} color="rgba(240,240,255,0.4)" />
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontSize: 12,
                          color: "rgba(240,240,255,0.5)",
                        }}
                      >
                        {s.time}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Clock size={12} color="rgba(240,240,255,0.4)" />
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontSize: 12,
                          color: "rgba(240,240,255,0.5)",
                        }}
                      >
                        {s.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    background: "linear-gradient(135deg, #6C3CE1, #00E5FF)",
                    border: "none",
                    borderRadius: 14,
                    padding: "10px 16px",
                    fontFamily: "Outfit",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 0 12px rgba(108,60,225,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Video size={14} /> Join
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Coaches */}
        <div>
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 16,
              color: "rgba(240,240,255,0.8)",
              marginBottom: 12,
            }}
          >
            Find Your Coach
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {coaches.map((c, i) => (
              <GlassCard
                key={i}
                onClick={() => {
                  setSelectedCoach(i)
                  setView("plan")
                }}
                style={{ overflow: "hidden" }}
              >
                {/* Hero band */}
                <div
                  style={{
                    height: 80,
                    background: `linear-gradient(135deg, ${c.color}30 0%, rgba(0,0,0,0) 100%)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: 120,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.4,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(90deg, rgba(8,8,16,0.9) 0%, transparent 60%)`,
                      }}
                    />
                  </div>
                  <div style={{ position: "absolute", top: 12, left: 14 }}>
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          overflow: "hidden",
                          border: `2px solid ${c.color}50`,
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={c.img}
                          alt={c.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                            marginBottom: 2,
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Outfit",
                              fontWeight: 700,
                              fontSize: 15,
                              color: "#fff",
                              margin: 0,
                            }}
                          >
                            {c.name}
                          </p>
                          <span
                            style={{
                              fontFamily: "Outfit",
                              fontWeight: 700,
                              fontSize: 9,
                              color: "#fff",
                              background:
                                c.badge === "Elite"
                                  ? "linear-gradient(135deg, #FFD700, #FF8C00)"
                                  : `linear-gradient(135deg, ${c.color}, #00E5FF)`,
                              padding: "2px 6px",
                              borderRadius: 5,
                            }}
                          >
                            {c.badge}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "Inter",
                            fontSize: 12,
                            color: "rgba(240,240,255,0.55)",
                            margin: 0,
                          }}
                        >
                          {c.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "12px 14px" }}>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: 13,
                      color: "rgba(240,240,255,0.55)",
                      fontStyle: "italic",
                      margin: "0 0 10px",
                      lineHeight: 1.4,
                    }}
                  >
                    "{c.tagline}"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", gap: 14 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center",
                        }}
                      >
                        <Star size={13} fill="#FFD700" color="#FFD700" />
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 12,
                            color: "#FFD700",
                          }}
                        >
                          {c.rating}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center",
                        }}
                      >
                        <Users size={12} color="rgba(240,240,255,0.4)" />
                        <span
                          style={{
                            fontFamily: "Inter",
                            fontSize: 12,
                            color: "rgba(240,240,255,0.5)",
                          }}
                        >
                          {c.clients}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center",
                        }}
                      >
                        <Video size={12} color="rgba(240,240,255,0.4)" />
                        <span
                          style={{
                            fontFamily: "Inter",
                            fontSize: 12,
                            color: "rgba(240,240,255,0.5)",
                          }}
                        >
                          {c.sessions}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <span
                        style={{
                          fontFamily: "Outfit",
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#fff",
                        }}
                      >
                        {c.price}
                      </span>
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          setBookingCoach(i)
                          setBookingStatus("")
                        }}
                        style={{
                          background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)`,
                          border: "none",
                          borderRadius: 12,
                          padding: "8px 14px",
                          fontFamily: "Outfit",
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                    <Clock size={12} color={c.color} />
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontSize: 12,
                        color: c.color,
                      }}
                    >
                      Next available: {c.nextSlot}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TrainingPlan({
  coach,
  onBack,
  onLive,
}: {
  coach: typeof coaches[0]
  onBack: () => void
  onLive: () => void
}) {
  const weeks = [
    { week: 1, title: "Foundation Phase", completed: true, sessions: 4 },
    { week: 2, title: "Build Phase", completed: true, sessions: 5 },
    {
      week: 3,
      title: "Intensity Block",
      completed: false,
      sessions: 5,
      current: true,
    },
    { week: 4, title: "Peak Performance", completed: false, sessions: 6 },
  ]

  const todaysWorkout = [
    { name: "Barbell Squats", sets: "4 × 8", rest: "90s", done: true },
    { name: "Romanian Deadlift", sets: "3 × 10", rest: "75s", done: true },
    { name: "Leg Press", sets: "3 × 12", rest: "60s", done: false },
    { name: "Bulgarian Split Squat", sets: "3 × 10", rest: "60s", done: false },
    { name: "Calf Raises", sets: "4 × 15", rest: "45s", done: false },
  ]

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "#080810" }}
    >
      {/* Header with coach */}
      <div
        style={{
          flexShrink: 0,
          height: 200,
          background: `linear-gradient(180deg, ${coach.color}40 0%, rgba(8,8,16,0.95) 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={coach.img}
          alt={coach.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
          }}
        />
        <div style={{ position: "absolute", top: 54, left: 20, right: 20 }}>
          <button
            onClick={onBack}
            className="glass w-10 h-10 rounded-xl flex items-center justify-center mb-12"
            style={{ marginBottom: 16 }}
          >
            <ChevronRight
              size={18}
              color="#fff"
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
          <Badge color="purple" size="sm">
            <Dumbbell size={10} /> Training Plan
          </Badge>
          <h2
            style={{
              fontFamily: "Outfit",
              fontWeight: 900,
              fontSize: 24,
              color: "#fff",
              margin: "8px 0 4px",
            }}
          >
            {coach.plans[0]}
          </h2>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              color: "rgba(240,240,255,0.6)",
              margin: 0,
            }}
          >
            with {coach.name} · 8 weeks · Week 3 of 8
          </p>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto hide-scrollbar px-5 py-4"
        style={{ paddingBottom: 20 }}
      >
        {/* Progress */}
        <GlassCard
          className="p-4 mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,60,225,0.15) 0%, rgba(0,229,255,0.05) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <p
              style={{
                fontFamily: "Outfit",
                fontWeight: 600,
                fontSize: 14,
                color: "#fff",
                margin: 0,
              }}
            >
              Overall Progress
            </p>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 14,
                color: "#00E5FF",
              }}
            >
              37%
            </span>
          </div>
          <div className="progress-bar" style={{ marginBottom: 12 }}>
            <div className="progress-fill" style={{ width: "37%" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {[
              ["18", "Sessions Done"],
              ["4.8", "Avg Rating"],
              ["2", "PRs Set"],
            ].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 800,
                    fontSize: 22,
                    color: i === 1 ? "#FFD700" : "#fff",
                    margin: 0,
                  }}
                >
                  {v}
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: 11,
                    color: "rgba(240,240,255,0.4)",
                    margin: 0,
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Week breakdown */}
        <p
          style={{
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 15,
            color: "rgba(240,240,255,0.8)",
            marginBottom: 10,
          }}
        >
          Program Phases
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 20,
          }}
        >
          {weeks.map((w) => (
            <div
              key={w.week}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 14,
                background: w.current
                  ? "rgba(108,60,225,0.2)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  w.current ? "rgba(108,60,225,0.4)" : "rgba(255,255,255,0.07)"
                }`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: w.completed
                    ? "rgba(0,229,255,0.15)"
                    : w.current
                      ? "rgba(108,60,225,0.25)"
                      : "rgba(255,255,255,0.06)",
                  border: `1px solid ${
                    w.completed
                      ? "rgba(0,229,255,0.4)"
                      : w.current
                        ? "rgba(108,60,225,0.5)"
                        : "rgba(255,255,255,0.1)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {w.completed ? (
                  <span style={{ fontSize: 14 }}>✓</span>
                ) : (
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 12,
                      color: w.current ? "#6C3CE1" : "rgba(240,240,255,0.4)",
                      fontWeight: 600,
                    }}
                  >
                    {w.week}
                  </span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    fontSize: 14,
                    color: w.current
                      ? "#fff"
                      : w.completed
                        ? "rgba(240,240,255,0.6)"
                        : "rgba(240,240,255,0.45)",
                    margin: "0 0 2px",
                  }}
                >
                  {w.title}
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: 11,
                    color: "rgba(240,240,255,0.35)",
                    margin: 0,
                  }}
                >
                  {w.sessions} sessions
                </p>
              </div>
              {w.current && (
                <Badge color="purple" size="xs">
                  Current
                </Badge>
              )}
              {w.completed && (
                <Badge color="cyan" size="xs">
                  Done
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Today's workout */}
        <p
          style={{
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 15,
            color: "rgba(240,240,255,0.8)",
            marginBottom: 10,
          }}
        >
          Today's Workout — Leg Day
        </p>
        <GlassCard className="overflow-hidden mb-4">
          {todaysWorkout.map((ex, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderBottom:
                  i < todaysWorkout.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
                background: ex.done ? "rgba(0,229,255,0.04)" : "transparent",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: ex.done
                    ? "rgba(0,229,255,0.15)"
                    : "rgba(255,255,255,0.06)",
                  border: `1px solid ${
                    ex.done ? "rgba(0,229,255,0.3)" : "rgba(255,255,255,0.08)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {ex.done ? (
                  <span style={{ fontSize: 12 }}>✓</span>
                ) : (
                  <span
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: 11,
                      color: "rgba(240,240,255,0.4)",
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    fontSize: 14,
                    color: ex.done ? "rgba(240,240,255,0.5)" : "#fff",
                    margin: "0 0 2px",
                    textDecoration: ex.done ? "line-through" : "none",
                  }}
                >
                  {ex.name}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: "#6C3CE1",
                    }}
                  >
                    {ex.sets}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: 11,
                      color: "rgba(240,240,255,0.35)",
                    }}
                  >
                    · Rest {ex.rest}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </GlassCard>

        <button
          onClick={onLive}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 18,
            background: "linear-gradient(135deg, #6C3CE1, #00E5FF)",
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            boxShadow: "0 0 24px rgba(108,60,225,0.5)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Video size={18} /> Start Live Session
        </button>
      </div>
    </div>
  )
}

function LiveSession({ onBack }: { onBack: () => void }) {
  const [elapsed, _setElapsed] = useState("12:34")
  const [muted, setMuted] = useState(false)
  const [cameraOn, setCameraOn] = useState(true)

  const exercises = [
    { name: "Warm Up", duration: "5 min", done: true },
    { name: "Barbell Squats", duration: "8 min", done: true },
    {
      name: "Romanian Deadlift",
      duration: "6 min",
      done: false,
      current: true,
    },
    { name: "Leg Press", duration: "6 min", done: false },
    { name: "Cool Down", duration: "5 min", done: false },
  ]

  return (
    <div className="flex flex-col h-full" style={{ background: "#000" }}>
      {/* Video area */}
      <div
        style={{
          position: "relative",
          flex: 2,
          background: "#0a0a14",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop&auto=format"
          alt="Live session"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Live badge */}
        <div
          style={{
            position: "absolute",
            top: 54,
            left: 20,
            right: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                background: "#FF2D78",
                borderRadius: 6,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#fff",
                  animation: "pulse 1s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  fontSize: 11,
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}
              >
                LIVE
              </span>
            </div>
            <div className="glass px-3 py-1 rounded-full">
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 13,
                  color: "#fff",
                }}
              >
                {elapsed}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Users size={14} color="rgba(255,255,255,0.7)" />
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              142 watching
            </span>
          </div>
        </div>

        {/* Coach card */}
        <div style={{ position: "absolute", bottom: 16, left: 16 }}>
          <div className="glass px-3 py-2 rounded-2xl flex items-center gap-8">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=100&h=100&fit=crop&auto=format"
                alt="Maya"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Maya Chen
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                }}
              >
                HIIT Circuit · Elite Coach
              </p>
            </div>
          </div>
        </div>

        {/* Self view */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 80,
            height: 110,
            borderRadius: 14,
            overflow: "hidden",
            border: "2px solid rgba(108,60,225,0.5)",
            boxShadow: "0 0 12px rgba(108,60,225,0.4)",
          }}
        >
          {cameraOn ? (
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=140&fit=crop&auto=format"
              alt="You"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Video size={24} color="rgba(255,255,255,0.3)" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom panel */}
      <div
        className="flex-1 glass-strong overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Current exercise */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 11,
                  color: "#6C3CE1",
                  letterSpacing: "0.08em",
                  margin: "0 0 2px",
                  fontWeight: 600,
                }}
              >
                CURRENT EXERCISE
              </p>
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#fff",
                  margin: "0 0 2px",
                }}
              >
                Romanian Deadlift
              </p>
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "rgba(240,240,255,0.5)",
                  margin: 0,
                }}
              >
                Set 2 of 3 · 10 reps · 75s rest
              </p>
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(108,60,225,0.2)",
                border: "3px solid #6C3CE1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(108,60,225,0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                75
              </span>
            </div>
          </div>
        </div>

        {/* Exercise timeline */}
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            gap: 6,
            overflowX: "auto",
          }}
          className="hide-scrollbar"
        >
          {exercises.map((ex, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                padding: "6px 10px",
                borderRadius: 10,
                background: ex.current
                  ? "rgba(108,60,225,0.25)"
                  : ex.done
                    ? "rgba(0,229,255,0.08)"
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  ex.current
                    ? "rgba(108,60,225,0.5)"
                    : ex.done
                      ? "rgba(0,229,255,0.2)"
                      : "rgba(255,255,255,0.08)"
                }`,
              }}
            >
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 600,
                  fontSize: 11,
                  color: ex.current
                    ? "#fff"
                    : ex.done
                      ? "rgba(240,240,255,0.5)"
                      : "rgba(240,240,255,0.4)",
                  margin: "0 0 1px",
                  whiteSpace: "nowrap",
                }}
              >
                {ex.name}
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 10,
                  color: "rgba(240,240,255,0.3)",
                  margin: 0,
                }}
              >
                {ex.duration}
              </p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            padding: "10px 20px 12px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {[
            {
              icon: muted ? "🔇" : "🎤",
              label: muted ? "Unmute" : "Mute",
              action: () => setMuted(!muted),
            },
            {
              icon: cameraOn ? "📹" : "📷",
              label: cameraOn ? "Cam Off" : "Cam On",
              action: () => setCameraOn(!cameraOn),
            },
            { icon: "💬", label: "Chat", action: () => {} },
            { icon: "❤️", label: "React", action: () => {} },
          ].map(({ icon, label, action }, i) => (
            <button
              key={i}
              onClick={action}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "8px 14px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 10,
                  color: "rgba(240,240,255,0.45)",
                }}
              >
                {label}
              </span>
            </button>
          ))}
          <button
            onClick={onBack}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "rgba(255,45,120,0.15)",
              border: "1px solid rgba(255,45,120,0.3)",
              borderRadius: 12,
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 18 }}>📵</span>
            <span
              style={{ fontFamily: "Inter", fontSize: 10, color: "#FF2D78" }}
            >
              End
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
