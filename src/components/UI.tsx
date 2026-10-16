import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react"
import { LoaderCircle } from "lucide-react"

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"

export function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  loading?: boolean
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`ui-button ui-button--${variant} ${className}`}
    >
      {loading && (
        <LoaderCircle aria-hidden="true" size={17} className="animate-spin" />
      )}
      {children}
    </button>
  )
}

export function IconButton({
  label,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}) {
  return (
    <button
      {...props}
      aria-label={label}
      title={label}
      className={`ui-icon-button ${className}`}
    >
      {children}
    </button>
  )
}

export function Field({
  label,
  error,
  icon,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  icon?: ReactNode
}) {
  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <span className={`ui-input-wrap ${error ? "ui-input-wrap--error" : ""}`}>
        {icon && <span className="ui-input-icon">{icon}</span>}
        <input
          {...props}
          aria-invalid={Boolean(error)}
          className={`ui-input ${icon ? "ui-input--icon" : ""} ${className}`}
        />
      </span>
      {error && <span className="ui-error">{error}</span>}
    </label>
  )
}

export function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  children: ReactNode
}) {
  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <select {...props} className="ui-select">
        {children}
      </select>
    </label>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  )
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">{icon}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  )
}

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="demo-notice" role="note">
      <span>DEMO</span>
      <p>
        {children ??
          "Sample data — not connected to a live health or commerce service."}
      </p>
    </div>
  )
}
