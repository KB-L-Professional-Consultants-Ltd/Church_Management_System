"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { FormEvent } from "react"

import { SignupFormSection } from "../components/signup-form-section"
import { SignupPageWrapper } from "../components/signup-page-wrapper"

export function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [churchName, setChurchName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    void (async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (
          !fullName.trim() ||
          !churchName.trim() ||
          !email.trim() ||
          !password.trim()
        ) {
          setError("Please complete all fields.")
          return
        }

        if (password.length < 8) {
          setError("Password must be at least 8 characters.")
          return
        }

        router.push("/")
      } catch {
        setError("Unable to create the account right now.")
      } finally {
        setIsLoading(false)
      }
    })()
  }

  return (
    <SignupPageWrapper>
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-headline-lg text-headline-md font-bold text-on-primary-fixed">
          SanctuaryOS
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Sacred Professionalism for Modern Communities.
        </p>
      </div>

      <SignupFormSection
        fullName={fullName}
        churchName={churchName}
        email={email}
        password={password}
        error={error}
        isLoading={isLoading}
        onFullNameChange={setFullName}
        onChurchNameChange={setChurchName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={onSubmit}
      />
    </SignupPageWrapper>
  )
}

export default SignupPage