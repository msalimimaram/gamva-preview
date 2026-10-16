import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { FileText, TrendingUp } from "lucide-react"
import GlassCard from "../components/GlassCard"
import { Button, DemoNotice, PageHeader, Select } from "../components/UI"
import type { Screen } from "../types"

const fullData = Array.from({ length: 12 }, (_, index) => ({
  month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][index],
  wellness: 62 + ((index * 7) % 24),
  sessions: 4 + ((index * 3) % 9),
  sleep: 6.2 + ((index * 0.35) % 1.8),
}))

const ranges = {
  "1M": 1,
  "3M": 3,
  "6M": 6,
  "1Y": 12,
} as const

interface InsightsProps {
  onNavigate: (screen: Screen) => void
}

export default function Insights({ onNavigate }: InsightsProps) {
  const [period, setPeriod] = useState<keyof typeof ranges>("1M")
  const [metric, setMetric] = useState<"wellness" | "sessions" | "sleep">(
    "wellness",
  )
  const data = useMemo(() => fullData.slice(-ranges[period]), [period])
  const average =
    data.reduce((sum, item) => sum + item[metric], 0) / data.length
  const previous = data.at(-2)?.[metric] ?? data[0][metric]
  const current = data.at(-1)?.[metric] ?? data[0][metric]

  return (
    <div className="screen">
      <PageHeader
        eyebrow="PERFORMANCE"
        title="Insights"
        description="A clear view of your wellness trends over time."
        actions={
          <Button variant="secondary" onClick={() => onNavigate("report")}>
            <FileText size={17} /> Build report
          </Button>
        }
      />
      <div className="screen-scroll">
        <div className="mb-4">
          <DemoNotice>
            These charts use structured sample data, not live health
            measurements.
          </DemoNotice>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          {(Object.keys(ranges) as Array<keyof typeof ranges>).map((range) => (
            <Button
              key={range}
              variant={period === range ? "primary" : "secondary"}
              onClick={() => setPeriod(range)}
            >
              {range}
            </Button>
          ))}
        </div>
        <div className="content-grid">
          <GlassCard className="p-4 sm:p-5 min-w-0">
            <div className="flex flex-wrap justify-between items-end gap-3 mb-5">
              <div>
                <p className="text-xs text-muted-foreground">Current average</p>
                <h2 className="font-[Outfit] text-3xl font-extrabold mt-1">
                  {average.toFixed(metric === "sleep" ? 1 : 0)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {metric === "sleep"
                      ? "hrs"
                      : metric === "sessions"
                        ? "sessions"
                        : "/100"}
                  </span>
                </h2>
              </div>
              <Select
                label="Metric"
                value={metric}
                onChange={(event) =>
                  setMetric(event.target.value as typeof metric)
                }
              >
                <option value="wellness">Wellness score</option>
                <option value="sessions">Sessions</option>
                <option value="sleep">Sleep</option>
              </Select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ left: -20, right: 8 }}>
                  <defs>
                    <linearGradient
                      id="insightArea"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#6C3CE1"
                        stopOpacity={0.42}
                      />
                      <stop offset="100%" stopColor="#6C3CE1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "rgba(240,240,255,.42)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(240,240,255,.42)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#141420",
                      border: "1px solid rgba(255,255,255,.1)",
                      borderRadius: 12,
                    }}
                    itemStyle={{ color: "#f0f0ff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey={metric}
                    stroke="#00E5FF"
                    strokeWidth={2.5}
                    fill="url(#insightArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <aside className="space-y-4">
            <GlassCard className="p-5">
              <TrendingUp size={20} className="text-accent" />
              <p className="text-xs text-muted-foreground mt-4">
                Latest movement
              </p>
              <p className="font-[Outfit] text-2xl font-bold mt-1">
                {current >= previous ? "+" : ""}
                {(current - previous).toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Compared with the previous visible period point.
              </p>
            </GlassCard>
            <GlassCard className="p-5">
              <h2 className="font-[Outfit] font-bold">Data context</h2>
              <p className="text-sm text-muted-foreground leading-6 mt-2">
                Range and metric controls update the chart, average, and
                movement summary from one dataset.
              </p>
            </GlassCard>
          </aside>
        </div>
      </div>
    </div>
  )
}
