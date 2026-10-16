import { useState } from "react"
import { ArrowLeft, Download, FileText } from "lucide-react"
import GlassCard from "../components/GlassCard"
import {
  Button,
  DemoNotice,
  IconButton,
  PageHeader,
  Select,
} from "../components/UI"

const availableMetrics = [
  "Wellness score",
  "Sleep",
  "Sessions",
  "Training load",
]

interface ReportBuilderProps {
  onBack: () => void
}

export default function ReportBuilder({ onBack }: ReportBuilderProps) {
  const [period, setPeriod] = useState("30 days")
  const [selected, setSelected] = useState<string[]>([
    "Wellness score",
    "Sleep",
  ])
  const [status, setStatus] = useState("")

  const toggleMetric = (metric: string) => {
    setSelected((current) =>
      current.includes(metric)
        ? current.filter((item) => item !== metric)
        : [...current, metric],
    )
    setStatus("")
  }

  const downloadCsv = () => {
    if (!selected.length) return
    const rows = [
      ["GAMva demo report", period],
      ["Metric", "Sample value", "Status"],
      ...selected.map((metric, index) => [
        metric,
        String(72 + index * 4),
        "Demo data",
      ]),
    ]
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","),
      )
      .join("\n")
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    )
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "gamva-demo-report.csv"
    anchor.click()
    URL.revokeObjectURL(url)
    setStatus("CSV download started.")
  }

  return (
    <div className="screen">
      <PageHeader
        eyebrow="EXPORT"
        title="Report builder"
        description="Choose sample metrics and generate a real CSV file."
        actions={
          <IconButton label="Back to insights" onClick={onBack}>
            <ArrowLeft size={18} />
          </IconButton>
        }
      />
      <div className="screen-scroll">
        <div className="content-grid">
          <GlassCard className="p-5">
            <Select
              label="Reporting period"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              <option>7 days</option>
              <option>30 days</option>
              <option>3 months</option>
            </Select>
            <fieldset className="mt-5">
              <legend className="ui-label mb-3">Included metrics</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {availableMetrics.map((metric) => {
                  const active = selected.includes(metric)
                  return (
                    <button
                      key={metric}
                      onClick={() => toggleMetric(metric)}
                      className={`rounded-xl border p-3 text-left text-sm cursor-pointer ${
                        active
                          ? "border-primary bg-secondary text-secondary-foreground"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                      aria-pressed={active}
                    >
                      {metric}
                    </button>
                  )
                })}
              </div>
            </fieldset>
            <Button
              className="w-full mt-6"
              disabled={!selected.length}
              onClick={downloadCsv}
            >
              <Download size={17} /> Download CSV
            </Button>
            {status && (
              <p className="text-sm text-[#45E3BD] mt-3" role="status">
                {status}
              </p>
            )}
          </GlassCard>
          <aside className="space-y-4">
            <GlassCard className="p-5">
              <FileText size={22} className="text-accent" />
              <h2 className="font-[Outfit] font-bold mt-4">Export preview</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {period} · {selected.length} metrics
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selected.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-lg bg-muted border border-border px-2 py-1 text-xs"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </GlassCard>
            <DemoNotice>
              The CSV file is generated locally from sample data. PDF and
              share-link success are not simulated.
            </DemoNotice>
          </aside>
        </div>
      </div>
    </div>
  )
}
