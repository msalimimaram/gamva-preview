import { useRef, useState } from "react"
import type { CSSProperties, FormEvent, PointerEvent as ReactPointerEvent } from "react"
import {
  ArrowDownRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Flame,
  Flower2,
  Heart,
  HeartHandshake,
  LockKeyhole,
  Plus,
  Sparkles,
  Target,
  Trophy,
  WandSparkles,
  ShoppingBag,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import octolifeScene from "../../publish/octolife-scene.jpg"
import type { Screen } from "../types"

type Dimension = {
  id: string
  name: string
  short: string
  subtitle: string
  color: string
  icon: LucideIcon
  progress: number
  focus: string
  routine: string
  hint: string
}

const dimensions: Dimension[] = [
  // Visual order is intentional: Mind at the apex, Health to the left, Growth to the right.
  { id: "wellbeing", name: "Mind & Wellbeing", short: "MIND", subtitle: "Make space for calm, recovery, and emotional balance.", color: "#A875FF", icon: Flower2, progress: 76, focus: "Check in with yourself", routine: "Take five mindful minutes", hint: "Rest is part of progress, not the opposite of it." },
  { id: "growth", name: "Personal Growth", short: "GROWTH", subtitle: "Build the skills and mindset your next chapter needs.", color: "#E8B86A", icon: Target, progress: 73, focus: "Invest in yourself", routine: "Practice one growth skill", hint: "You do not have to become someone else to grow." },
  { id: "finance", name: "Finance", short: "MONEY", subtitle: "Build clarity, confidence, and healthier money habits.", color: "#D2A75D", icon: CircleDollarSign, progress: 42, focus: "Know where it goes", routine: "Review today's spending", hint: "Awareness is the first step toward control." },
  { id: "career", name: "Career", short: "CAREER", subtitle: "Create meaningful progress in your work and ambitions.", color: "#FF9B62", icon: BriefcaseBusiness, progress: 61, focus: "Move one thing forward", routine: "Take one focused career step", hint: "A small action can unlock meaningful momentum." },
  { id: "joy", name: "Challenge & Joy", short: "JOY", subtitle: "Make room for play, discovery, and new experiences.", color: "#FF6B6B", icon: Flame, progress: 49, focus: "Do something energizing", routine: "Spend 15 minutes on something fun", hint: "A life well lived needs moments of delight." },
  { id: "courage", name: "Overcoming Fears", short: "COURAGE", subtitle: "Face fear in small, supported steps, at your own pace.", color: "#72A7FF", icon: LockKeyhole, progress: 37, focus: "Take one brave small step", routine: "Do one thing you have been postponing", hint: "Courage is action with fear beside you." },
  { id: "learning", name: "Learning", short: "LEARN", subtitle: "Stay curious. Turn knowledge into capability.", color: "#8B7CFF", icon: BookOpen, progress: 54, focus: "Learn something useful", routine: "Read or practice for 15 minutes", hint: "Consistency beats the perfect study session." },
  { id: "health", name: "Health", short: "HEALTH", subtitle: "A stronger body. More energy for the life you want.", color: "#00E5FF", icon: Brain, progress: 68, focus: "Move with intention", routine: "20 minutes of movement", hint: "Small steps today make strength sustainable." },
]

const checklistByDimension: Record<string, { id: string; title: string; detail: string; time: string }[]> = {
  health: [
    { id: "water", title: "Drink a glass of water", detail: "Start with one small win", time: "1 min" },
    { id: "move", title: "Move your body", detail: "Walk, stretch, or train", time: "20 min" },
    { id: "sleep", title: "Protect your wind-down", detail: "Give tomorrow-you a gift", time: "10 min" },
  ],
  learning: [
    { id: "read", title: "Read or study", detail: "One focused learning block", time: "15 min" },
    { id: "recall", title: "Recall one thing you learned", detail: "Write it in your own words", time: "3 min" },
  ],
  finance: [
    { id: "spend", title: "Review today's spending", detail: "Awareness without judgement", time: "3 min" },
    { id: "save", title: "Make one intentional money choice", detail: "Small choices add up", time: "2 min" },
  ],
  growth: [
    { id: "skill", title: "Practice one useful skill", detail: "Make progress, not perfection", time: "15 min" },
    { id: "reflect", title: "Write one lesson from today", detail: "Turn experience into insight", time: "3 min" },
  ],
  career: [
    { id: "priority", title: "Move your top priority forward", detail: "One focused step", time: "20 min" },
    { id: "connect", title: "Make one meaningful connection", detail: "A thoughtful message counts", time: "5 min" },
  ],
  wellbeing: [
    { id: "pause", title: "Take a mindful pause", detail: "Breathe without rushing", time: "5 min" },
    { id: "feeling", title: "Name how you feel", detail: "Notice it without judging it", time: "2 min" },
  ],
  joy: [
    { id: "play", title: "Make time for something fun", detail: "Choose what genuinely restores you", time: "15 min" },
    { id: "outside", title: "Try one small new thing", detail: "Follow your curiosity", time: "10 min" },
  ],
  courage: [
    { id: "brave", title: "Take one brave small step", detail: "Make the hard thing smaller", time: "5 min" },
    { id: "support", title: "Ask for support if you need it", detail: "You do not have to do it alone", time: "2 min" },
  ],
}

const tabs = [
  { id: "today", label: "Daily checklist", icon: Check },
  { id: "goals", label: "Goals", icon: Target },
  { id: "progress", label: "Progress", icon: Trophy },
  { id: "content", label: "Content", icon: BookOpen },
] as const

type HomeTab = (typeof tabs)[number]["id"]

function polar(cx: number, cy: number, radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) }
}

function segmentPath(index: number) {
  const start = -112.5 + index * 45 + 2.2
  const end = start + 40.6
  const outerStart = polar(180, 220, 194, start)
  const outerEnd = polar(180, 220, 194, end)
  const innerEnd = polar(180, 220, 116, end)
  const innerStart = polar(180, 220, 116, start)
  return `M ${outerStart.x} ${outerStart.y} A 194 194 0 0 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A 116 116 0 0 0 ${innerStart.x} ${innerStart.y} Z`
}

interface OctolifeProps {
  onNavigate: (screen: Screen) => void
  cartCount: number
}

export default function Octolife({ onNavigate, cartCount }: OctolifeProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [tab, setTab] = useState<HomeTab>("today")
  const [completed, setCompleted] = useState<string[]>([])
  const [customRoutines, setCustomRoutines] = useState<Record<string, { id: string; title: string; detail: string; time: string }[]>>({})
  const [routineDraft, setRoutineDraft] = useState("")
  const [showRoutineForm, setShowRoutineForm] = useState(false)
  const [customGoals, setCustomGoals] = useState<Record<string, string[]>>({})
  const [goalDraft, setGoalDraft] = useState("")
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [message, setMessage] = useState("")
  const drag = useRef<{ angle: number; rotation: number; moved: boolean; x: number; y: number; tapIndex?: number; accumulated: number } | null>(null)
  const didDrag = useRef(false)
  const dimension = dimensions[selectedIndex]
  const DimensionIcon = dimension.icon
  const checklist = [...(checklistByDimension[dimension.id] ?? []), ...(customRoutines[dimension.id] ?? [])]
  const doneCount = checklist.filter((item) => completed.includes(`${dimension.id}-${item.id}`)).length
  const totalDone = completed.length
  const overallProgress = Math.round(dimensions.reduce((sum, item) => sum + item.progress, 0) / dimensions.length)

  const rotateTo = (index: number) => {
    setSelectedIndex(index)
    setRotation(-index * 45)
    setMessage("")
    setShowRoutineForm(false)
    setShowGoalForm(false)
  }

  const pointerAngle = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 360
    const y = ((event.clientY - rect.top) / rect.height) * 220
    return Math.atan2(y - 220, x - 180) * (180 / Math.PI)
  }

  const startRotate = (event: ReactPointerEvent<SVGSVGElement>) => {
    const sector = event.target instanceof Element ? event.target.closest("[data-dimension-index]") : null
    const tapIndex = sector ? Number(sector.getAttribute("data-dimension-index")) : undefined
    drag.current = { angle: pointerAngle(event), rotation, moved: false, x: event.clientX, y: event.clientY, tapIndex, accumulated: 0 }
    didDrag.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveRotate = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag.current) return
    const distance = Math.hypot(event.clientX - drag.current.x, event.clientY - drag.current.y)
    if (distance > 4) {
      drag.current.moved = true
      didDrag.current = true
    }
    if (!drag.current.moved) return
    const angle = pointerAngle(event)
    let delta = angle - drag.current.angle
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    // Dampen pointer samples and cap angular travel to prevent uncontrolled spinning.
    const dampedDelta = Math.max(-7, Math.min(7, delta * 0.62))
    drag.current.accumulated = Math.max(-67.5, Math.min(67.5, drag.current.accumulated + dampedDelta))
    drag.current.angle = angle
    setRotation(drag.current.rotation + drag.current.accumulated)
  }

  const finishRotate = () => {
    if (!drag.current) return
    if (drag.current.moved) {
      const settledRotation = drag.current.rotation + drag.current.accumulated
      const index = ((Math.round(-settledRotation / 45) % 8) + 8) % 8
      setSelectedIndex(index)
      setRotation(-index * 45)
      setMessage("")
    } else if (drag.current.tapIndex !== undefined) {
      rotateTo(drag.current.tapIndex)
    }
    drag.current = null
  }

  const toggleTask = (id: string) => {
    const key = `${dimension.id}-${id}`
    setCompleted((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])
  }

  const addRoutine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = routineDraft.trim()
    if (!title) return
    const routine = { id: `custom-${Date.now()}`, title, detail: "Your personal routine", time: "Custom" }
    setCustomRoutines((current) => ({ ...current, [dimension.id]: [...(current[dimension.id] ?? []), routine] }))
    setRoutineDraft("")
    setShowRoutineForm(false)
    setMessage("Routine added. You can check it off whenever you complete it.")
  }

  const addGoal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = goalDraft.trim()
    if (!title) return
    setCustomGoals((current) => ({ ...current, [dimension.id]: [...(current[dimension.id] ?? []), title] }))
    setGoalDraft("")
    setShowGoalForm(false)
    setMessage("Goal added to this dimension. Progress can grow one step at a time.")
  }

  return (
    <div className="screen octolife-screen">
      <header className="octo-header">
        <div className="octo-brand">
          <div className="octo-brand-mark" aria-hidden="true"><WandSparkles size={20} /></div>
          <div>
            <div className="octo-brand-name">GAM<span>va</span></div>
            <p className="octo-brand-caption">YOUR LIFE, IN ONE ORBIT</p>
          </div>
        </div>
        <div className="octo-header-actions">
          <button type="button" className="octo-icon-button octo-cart-button" onClick={() => onNavigate("cart")} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={18} />{cartCount > 0 && <i className="octo-cart-count">{cartCount > 99 ? "99+" : cartCount}</i>}</button>
          <button type="button" className="octo-icon-button" onClick={() => onNavigate("insights")} aria-label="Open progress insights"><Trophy size={18} /></button>
          <button type="button" className="octo-avatar-button" onClick={() => onNavigate("profile")} aria-label="Open your profile">J</button>
        </div>
      </header>

      <div className="octo-main-scroll">
        <section
          className="octo-hero-stage"
          aria-label="Interactive Octolife dial"
          style={{ "--octo-scene-image": `url("${octolifeScene}")` } as CSSProperties}
        >
          <div className="octo-stage-topline">
            <div>
              <p className="octo-eyebrow"><span className="octo-live-dot" /> OCTOLIFE · 8 DIMENSIONS</p>
              <p className="octo-stage-caption">Eight dimensions. One life.</p>
            </div>
            <div className="octo-overall-pill octo-overall-compact">
              <span className="octo-overall-ring">{overallProgress}%</span>
              <span><b>Overall</b><small>life progress</small></span>
            </div>
          </div>

          <div className="octo-wheel-wrap">
            <div className="octo-wheel-orbit octo-orbit-one" />
            <div className="octo-wheel-glow" style={{ background: dimension.color }} />
            <svg
              className="octo-wheel"
              viewBox="0 0 360 220"
              role="group"
              aria-label="Rotate the Octolife dial or select one of the eight life dimensions"
              onPointerDown={startRotate}
              onPointerMove={moveRotate}
              onPointerUp={finishRotate}
              onPointerCancel={finishRotate}
              style={{ touchAction: "none", userSelect: "none" }}
            >
              <defs>
                <clipPath id="octoDialAperture">
                  <rect x="0" y="0" width="360" height="220" />
                </clipPath>
                <linearGradient id="octoCrystalSheen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".23" />
                  <stop offset="48%" stopColor="#FFFFFF" stopOpacity=".015" />
                  <stop offset="100%" stopColor="#080D25" stopOpacity=".42" />
                </linearGradient>
                <radialGradient id="octoSectorBloom">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
              </defs>

              <g clipPath="url(#octoDialAperture)">
                <g
                  transform={`rotate(${rotation} 180 220)`}
                  style={{ transition: drag.current?.moved ? "none" : "transform 430ms cubic-bezier(.2,.8,.2,1)" }}
                >
                  {dimensions.map((item, index) => {
                    const active = index === selectedIndex
                    const offset = (index - selectedIndex + dimensions.length) % dimensions.length
                    const adjacent = offset === 1 || offset === dimensions.length - 1
                    const point = polar(180, 220, 155, -90 + index * 45)
                    const Icon = item.icon
                    const segmentFill = active || adjacent ? item.color : "#10182C"
                    const segmentOpacity = active ? 0.46 : adjacent ? 0.27 : 0.16
                    return (
                      <g
                        key={item.id}
                        data-dimension-index={index}
                        onClick={() => { if (!didDrag.current) rotateTo(index) }}
                        className={active ? "octo-wheel-sector is-active" : adjacent ? "octo-wheel-sector is-adjacent" : "octo-wheel-sector"}
                        role="button"
                        aria-label={`Select ${item.name}, ${item.progress}% progress`}
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault()
                            rotateTo(index)
                          }
                          if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                            event.preventDefault()
                            rotateTo((selectedIndex + dimensions.length - 1) % dimensions.length)
                          }
                          if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                            event.preventDefault()
                            rotateTo((selectedIndex + 1) % dimensions.length)
                          }
                        }}
                      >
                        <path
                          className="octo-crystal-face"
                          d={segmentPath(index)}
                          fill={segmentFill}
                          fillOpacity={active ? 0.88 : adjacent ? 0.69 : 0.35}
                          stroke={active || adjacent ? item.color : "#53617F"}
                          strokeOpacity={active ? 1 : adjacent ? 0.86 : 0.46}
                          strokeWidth={active ? 2.4 : adjacent ? 1.8 : 1.2}
                        />
                        <path d={segmentPath(index)} fill="url(#octoCrystalSheen)" stroke="none" pointerEvents="none" />
                        <path
                          className="octo-crystal-vein"
                          d={(() => {
                            const a = -112.5 + index * 45 + 2.2
                            const b = a + 40.6
                            const p1 = polar(180, 220, 123, a + 8)
                            const p2 = polar(180, 220, 154, (a + b) / 2 - 5)
                            const p3 = polar(180, 220, 187, b - 8)
                            return `M ${p1.x} ${p1.y} Q ${p2.x} ${p2.y} ${p3.x} ${p3.y}`
                          })()}
                          fill="none"
                          stroke={active || adjacent ? item.color : "#74809E"}
                          strokeWidth={active ? 1.7 : 1.1}
                          strokeOpacity={active ? 0.9 : adjacent ? 0.65 : 0.28}
                          pointerEvents="none"
                        />
                        <path
                          className="octo-crystal-vein octo-crystal-vein-fine"
                          d={(() => {
                            const a = -112.5 + index * 45 + 2.2
                            const b = a + 40.6
                            const p1 = polar(180, 220, 132, a + 13)
                            const p2 = polar(180, 220, 156, (a + b) / 2 + 5)
                            const p3 = polar(180, 220, 180, b - 13)
                            return `M ${p1.x} ${p1.y} Q ${p2.x} ${p2.y} ${p3.x} ${p3.y}`
                          })()}
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth=".7"
                          strokeOpacity={active ? 0.72 : adjacent ? 0.42 : 0.18}
                          pointerEvents="none"
                        />
                        <g transform={`translate(${point.x} ${point.y}) rotate(${-rotation})`}>
                          <g className="octo-sector-icon" color={item.color}>
                            <foreignObject x="-10" y="-24" width="20" height="20">
                              <div className="octo-svg-icon"><Icon size={19} strokeWidth={1.7} /></div>
                            </foreignObject>
                          </g>
                          <text
                            y="2"
                            textAnchor="middle"
                            fill={active || adjacent ? "#F8FAFF" : "rgba(178,190,220,.46)"}
                            fontSize={item.short.length > 6 ? 7.1 : 8.5}
                            fontWeight={active ? 800 : adjacent ? 650 : 500}
                            letterSpacing=".15"
                          >{item.short}</text>
                          <text
                            y="15"
                            textAnchor="middle"
                            fill={active || adjacent ? item.color : "rgba(148,163,184,.38)"}
                            fontSize="7.8"
                            fontWeight="700"
                          >{item.progress}%</text>
                        </g>
                      </g>
                    )
                  })}
                </g>
              </g>

            </svg>
            <div className="octo-wheel-hint"><span className="octo-rotate-glyph">↻</span> ROTATE TO EXPLORE</div>
          </div>

          <div className="octo-dimension-detail" style={{ "--dimension-color": dimension.color } as CSSProperties}>
            <div className="octo-dimension-topline">
              <div className="octo-dimension-icon"><DimensionIcon size={21} /></div>
              <div className="octo-dimension-copy">
                <p className="octo-eyebrow">DIMENSION {String(selectedIndex + 1).padStart(2, "0")} / 08</p>
                <h2>{dimension.name}</h2>
              </div>
              <div className="octo-dimension-progress"><strong>{dimension.progress}%</strong><span>preview progress</span></div>
            </div>
            <p className="octo-dimension-subtitle">{dimension.subtitle}</p>
            <div className="octo-progress-track"><span style={{ width: `${dimension.progress}%` }} /></div>
            <div className="octo-wheel-controls">
              <button type="button" onClick={() => rotateTo((selectedIndex + dimensions.length - 1) % dimensions.length)} aria-label="Previous dimension"><ChevronLeft size={16} /></button>
              <span>{selectedIndex + 1} <i>/</i> 8</span>
              <button type="button" onClick={() => rotateTo((selectedIndex + 1) % dimensions.length)} aria-label="Next dimension"><ChevronRight size={16} /></button>
              <button type="button" className="octo-focus-button" onClick={() => { setTab("today"); setMessage(`Your ${dimension.name.toLowerCase()} focus is ready below.`) }}>Explore dimension <ArrowDownRight size={14} /></button>
            </div>
          </div>
        </section>

        <section className="octo-daily-intro">
          <div><p className="octo-eyebrow">YOUR NEXT SMALL WIN</p><h2>Make today count.</h2></div>
          <button type="button" className="octo-text-link" onClick={() => setTab("today")}>Today's plan <ChevronRight size={15} /></button>
        </section>

        <nav className="octo-tabs" aria-label="Octolife sections">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" className={tab === id ? "octo-tab is-active" : "octo-tab"} onClick={() => setTab(id)} aria-pressed={tab === id}>
              <Icon size={16} /><span>{label}</span>{id === "today" && <i>{doneCount}/{checklist.length}</i>}
            </button>
          ))}
        </nav>

        <section className="octo-panel" aria-live="polite">
          {message && <p className="octo-inline-message" role="status"><Sparkles size={15} />{message}</p>}
          {tab === "today" && (
            <>
              <div className="octo-panel-heading"><div><h3>{dimension.name} checklist</h3><p>Progress without pressure. Every small action counts.</p></div><span className="octo-count-badge">{doneCount} of {checklist.length}</span></div>
              <div className="octo-task-list">
                {checklist.map((item) => {
                  const checked = completed.includes(`${dimension.id}-${item.id}`)
                  return <button key={item.id} type="button" className={checked ? "octo-task is-complete" : "octo-task"} onClick={() => toggleTask(item.id)} aria-pressed={checked}>
                    <span className="octo-task-check" style={{ "--dimension-color": dimension.color } as CSSProperties}>{checked && <Check size={15} />}</span>
                    <span className="octo-task-copy"><b>{item.title}</b><small>{item.detail}</small></span><span className="octo-task-time">{item.time}</span>
                  </button>
                })}
              </div>
              <button type="button" className="octo-add-task" onClick={() => { setShowRoutineForm((current) => !current); setMessage("") }}><Plus size={16} /> {showRoutineForm ? "Cancel" : "Add a personal routine"}</button>
              {showRoutineForm && <form className="octo-inline-form" onSubmit={addRoutine}><input value={routineDraft} onChange={(event) => setRoutineDraft(event.target.value)} maxLength={90} placeholder="e.g. Stretch before bed" aria-label="New routine name" autoFocus /><button type="submit" disabled={!routineDraft.trim()}>Add routine</button></form>}
            </>
          )}
          {tab === "goals" && (
            <>
              <div className="octo-panel-heading"><div><h3>Goals that matter to you</h3><p>Long-term direction, broken into achievable steps.</p></div><button type="button" className="octo-small-action" onClick={() => { setShowGoalForm((current) => !current); setMessage("") }}><Plus size={16} /> {showGoalForm ? "Cancel" : "New goal"}</button></div>
              <div className="octo-goal-card"><div className="octo-goal-icon" style={{ color: dimension.color, background: `${dimension.color}18` }}><Target size={19} /></div><div className="octo-goal-main"><b>{dimension.focus}</b><p>{dimension.routine}</p><div className="octo-progress-track"><span style={{ width: `${dimension.progress}%`, background: dimension.color }} /></div></div><strong style={{ color: dimension.color }}>{dimension.progress}%</strong></div>
              {(customGoals[dimension.id] ?? []).map((goal, index) => <div className="octo-custom-goal" key={`${goal}-${index}`}><Target size={17} color={dimension.color} /><span><b>{goal}</b><small>Just getting started · 0% logged</small></span></div>)}
              {showGoalForm && <form className="octo-inline-form" onSubmit={addGoal}><input value={goalDraft} onChange={(event) => setGoalDraft(event.target.value)} maxLength={100} placeholder="What would you like to achieve?" aria-label="New goal name" autoFocus /><button type="submit" disabled={!goalDraft.trim()}>Create goal</button></form>}
              <div className="octo-support-note"><HeartHandshake size={18} /><p><b>No reset. No shame.</b><br />A missed day does not erase the progress you've already made.</p></div>
            </>
          )}
          {tab === "progress" && (
            <>
              <div className="octo-panel-heading"><div><h3>Your life in motion</h3><p>A snapshot across all eight dimensions.</p></div><span className="octo-count-badge">{overallProgress}% avg.</span></div>
              <div className="octo-progress-list">{dimensions.map((item) => <button key={item.id} type="button" className="octo-progress-row" onClick={() => { rotateTo(dimensions.indexOf(item)); setTab("today") }}><span className="octo-progress-dot" style={{ background: item.color }} /><span>{item.name}</span><span className="octo-mini-track"><i style={{ width: `${item.progress}%`, background: item.color }} /></span><b style={{ color: item.color }}>{item.progress}%</b></button>)}</div>
              <div className="octo-support-note"><Trophy size={18} /><p><b>{totalDone} small actions checked off</b><br />Momentum is built one action at a time. Keep going at your own pace.</p></div>
            </>
          )}
          {tab === "content" && (
            <>
              <div className="octo-panel-heading"><div><h3>Ideas for your next step</h3><p>Helpful content, matched to {dimension.name.toLowerCase()}.</p></div><BookOpen size={20} color={dimension.color} /></div>
              <button type="button" className="octo-content-card" onClick={() => setMessage(dimension.hint)}><span className="octo-content-art" style={{ "--dimension-color": dimension.color } as CSSProperties}><Sparkles size={24} /></span><span><small>2 MIN READ · START HERE</small><b>{dimension.focus}</b><p>{dimension.hint}</p></span><ChevronRight size={17} /></button>
              <button type="button" className="octo-content-card" onClick={() => onNavigate("coaching")}><span className="octo-content-art alt"><HeartHandshake size={24} /></span><span><small>GUIDANCE</small><b>Support makes progress easier</b><p>Explore coaching and guided programs when you need a hand.</p></span><ChevronRight size={17} /></button>
            </>
          )}
        </section>

        <section className="octo-footer-note"><HeartHandshake size={18} /><p><b>You're important, even when things don't go to plan.</b><br />GAMva is here to support your progress, never to judge your setbacks.</p></section>
      </div>

    </div>
  )
}
