"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { FormEvent } from "react"

import { LoginFormSection } from "../components/login-form-section"
import { LoginPageWrapper } from "../components/login-page-wrapper"

export function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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

        router.push("/")
      } catch {
        setError("Unable to complete sign in right now.")
      } finally {
        setIsLoading(false)
      }
    })()
  }

  return (
    <LoginPageWrapper>
      <LoginFormSection
        email={email}
        password={password}
        error={error}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={onSubmit}
      />
    </LoginPageWrapper>
  )
}

export default LoginPage