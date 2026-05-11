"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  AuthFooter,
  AuthHeader,
  AuthMain,
  AuthPageLayout,
  ErrorAlert,
  LoadingSpinner,
  SpiritualAccentBg,
} from "../auth-shared"

export default function SignupPage() {
  const router = useRouter()
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

        router.push("/")
      } catch {
        setError("Unable to create the account right now.")
      } finally {
        setIsLoading(false)
      }
    })()
  }

  return (
    <AuthPageLayout>
      <AuthMain>
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
          <div className="absolute top-[-20%] right-[-10%] h-150 w-150 rounded-full bg-secondary-container opacity-[0.03] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] h-150 w-150 rounded-full bg-on-primary-fixed opacity-[0.03] blur-3xl" />
        </div>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-120">
          <div className="mb-8 text-center">
            <AuthHeader
              icon={
                <span className="material-symbols-outlined text-[32px] text-surface-bright">
                  church
                </span>
              }
              title="SanctuaryOS"
              subtitle="Sacred Professionalism for Modern Communities."
            />
          </div>

          <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,27,61,0.04)]">
              <div className="mb-6 text-left">
                <h2 className="mb-1 font-title-lg text-title-lg text-on-primary-fixed">
                  Create Account
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Begin your journey towards organized ministry growth.
                </p>
              </div>

              {error && <ErrorAlert message={error} />}

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label
                    htmlFor="full_name"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-outline text-[20px]">
                      person
                    </span>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright py-2 pr-4 pl-12 transition-all outline-none placeholder:text-outline-variant focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="church_name"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    Church Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-outline text-[20px]">
                      church
                    </span>
                    <input
                      id="church_name"
                      name="church_name"
                      type="text"
                      value={churchName}
                      onChange={(event) => setChurchName(event.target.value)}
                      placeholder="Your congregation name"
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright py-2 pr-4 pl-12 transition-all outline-none placeholder:text-outline-variant focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-outline text-[20px]">
                      mail
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="email@church.org"
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright py-2 pr-4 pl-12 transition-all outline-none placeholder:text-outline-variant focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="font-label-md text-label-md text-on-surface-variant"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-outline text-[20px]">
                      lock
                    </span>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright py-2 pr-4 pl-12 transition-all outline-none placeholder:text-outline-variant focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-on-primary flex w-full items-center justify-center gap-2 rounded-lg bg-on-primary-fixed py-2.5 font-title-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {isLoading ? (
                      <LoadingSpinner text="Creating Account..." />
                    ) : (
                      <>
                        Create Account
                        <span className="material-symbols-outlined text-[20px]">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px grow bg-outline-variant/30" />
                <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
                  Or
                </span>
                <div className="h-px grow bg-outline-variant/30" />
              </div>

              <AuthFooter
                text="Already part of the community?"
                linkText="Log in"
                linkHref="/auth"
              />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex items-start gap-2 px-1 py-1">
                <span
                  className="material-symbols-outlined text-secondary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Secure administrative access encryption.
                </p>
              </div>
              <div className="flex items-start gap-2 px-1 py-1">
                <span
                  className="material-symbols-outlined text-secondary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  cloud_done
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Real-time database synchronization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AuthMain>
    </AuthPageLayout>
  )
}