import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { SignupFormSection } from "../components/signup-form-section"
import { SignupPageShell } from "../components/signup-page-shell"

export function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [churchName, setChurchName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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

        await navigate({ to: "/" })
      } catch {
        setError("Unable to create the account right now.")
      } finally {
        setIsLoading(false)
      }
    })()
  }

  return (
    <SignupPageShell>
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

      <div className="hidden lg:absolute lg:right-0 lg:bottom-0 lg:block lg:h-1/3 lg:w-1/4 lg:overflow-hidden lg:rounded-tl-full lg:border-t lg:border-l lg:border-secondary-container/20 lg:opacity-20">
        <img
          className="h-full w-full object-cover"
          alt="A serene, minimalist architectural interior of a modern church space. Soft sunlight streams through high windows, casting long shadows on light wood surfaces. The color palette features deep midnight blues and harvest gold accents, maintaining a professional yet sacred atmosphere. The mood is calm and contemplative, emphasizing growth and clarity."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM28Oy-lHmlNCuKeWC8Qgrxx1BgWIU9GUhGesmLOw0r_UfmMVfk28MnTYRGudZbNTFT5SXqyzAuLT_EL6E9MvrJqlI0V5KLQV-aBwkBSaVGAz_SW5BzT8BI0AogApqFePKYoifUAVAcTIPYRo3N59IoVePd880PkdHOmKU5hWQ2k32xN5xe6mPy7_HQegQvYWCpxeYIoUi9vMtbGZkXWMeVVlKRXMkDgomIIXC6j3g__OLVeLS6ytalMw7_N20ABuheg0ORr7QJnPk"
        />
      </div>

      <div className="mt-8 w-full text-center">
        <p className="font-label-sm text-label-sm text-outline">
          © 2024 SanctuaryOS. All rights reserved. Sacred Professionalism for
          Modern Communities.
        </p>
      </div>
    </SignupPageShell>
  )
}
