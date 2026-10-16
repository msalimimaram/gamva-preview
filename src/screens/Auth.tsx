import { FormEvent, useState } from "react"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import GlassCard from "../components/GlassCard"
import { Button, DemoNotice, Field, IconButton } from "../components/UI"

interface AuthProps {
  onAuth: () => void
  onBack: () => void
  defaultMode?: "login" | "signup"
}

export default function Auth({
  onAuth,
  onBack,
  defaultMode = "login",
}: AuthProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (mode === "signup" && name.trim().length < 2)
      nextErrors.name = "Enter at least 2 characters."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address."
    if (password.length < 8) nextErrors.password = "Use at least 8 characters."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      onAuth()
    }, 450)
  }

  return (
    <div className="screen">
      <div className="m-auto w-full max-w-md px-5 py-8">
        <IconButton label="Back to role selection" onClick={onBack}>
          <ArrowLeft size={18} />
        </IconButton>
        <div className="mt-7 mb-6">
          <p className="page-eyebrow">
            {mode === "login" ? "WELCOME BACK" : "CREATE YOUR PROFILE"}
          </p>
          <h1 className="font-[Outfit] text-4xl font-extrabold mt-2">
            {mode === "login" ? "Continue to GAMva" : "Start your demo"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "login"
              ? "Use any valid-format demo credentials."
              : "Create a local prototype session."}
          </p>
        </div>
        <GlassCard className="p-5">
          <form onSubmit={submit} className="grid gap-4" noValidate>
            {mode === "signup" && (
              <Field
                label="Full name"
                icon={<User size={17} />}
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={errors.name}
                autoComplete="name"
              />
            )}
            <Field
              label="Email address"
              type="email"
              icon={<Mail size={17} />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <div className="relative">
              <Field
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={<Lock size={17} />}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.password}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                className="!pr-12"
              />
              <button
                type="button"
                className="absolute right-2 top-[27px] ui-icon-button !h-8 !w-8 !border-0 !bg-transparent"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Button type="submit" loading={submitting} className="w-full mt-1">
              {mode === "login"
                ? "Enter demo workspace"
                : "Create demo profile"}
            </Button>
          </form>
        </GlassCard>
        <div className="mt-4">
          <DemoNotice>
            No authentication backend or secure account storage is connected.
          </DemoNotice>
        </div>
        <Button
          variant="ghost"
          className="w-full mt-3"
          onClick={() => {
            setMode((value) => (value === "login" ? "signup" : "login"))
            setErrors({})
          }}
        >
          {mode === "login"
            ? "Need a demo profile? Sign up"
            : "Already have a profile? Sign in"}
        </Button>
      </div>
    </div>
  )
}
