import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { LoginFormSection } from "../components/login-form-section"
import { LoginPageShell } from "../components/login-page-shell"

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    void (async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (!email.trim() || !password.trim()) {
          setError("Please enter both email and password.")
          return
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters.")
          return
        }

        await navigate({ to: "/" })
      } catch {
        setError("Unable to complete sign in right now.")
      } finally {
        setIsLoading(false)
      }
    })()
  }

  return (
    <LoginPageShell>
      <LoginFormSection
        email={email}
        password={password}
        error={error}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={onSubmit}
      />
    </LoginPageShell>
  )
}
