"use client"

import type { FormEvent } from "react"
import {
  IconUser,
  IconBuilding,
  IconMail,
  IconLock,
  IconArrowRight,
  IconShieldCheckFilled,
  IconCloudCheck,
} from "@tabler/icons-react"

import { AuthFooter, ErrorAlert, LoadingSpinner } from "./auth-layout"

interface SignupFormSectionProps {
  fullName: string
  churchName: string
  email: string
  password: string
  error: string | null
  isLoading: boolean
  onFullNameChange: (value: string) => void
  onChurchNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function SignupFormSection({
  fullName,
  churchName,
  email,
  password,
  error,
  isLoading,
  onFullNameChange,
  onChurchNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SignupFormSectionProps) {
  return (
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
              <IconUser
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline"
                size={20}
              />
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={fullName}
                onChange={(event) => onFullNameChange(event.target.value)}
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
              <IconBuilding
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline"
                size={20}
              />
              <input
                id="church_name"
                name="church_name"
                type="text"
                value={churchName}
                onChange={(event) => onChurchNameChange(event.target.value)}
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
              <IconMail
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline"
                size={20}
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
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
              <IconLock
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline"
                size={20}
              />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
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
                  <IconArrowRight size={20} />
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
          linkHref="/auth/login"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex items-start gap-2 px-1 py-1">
          <IconShieldCheckFilled
            size={20}
            className="mt-0.5 flex-shrink-0 text-secondary-container"
          />
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Secure administrative access encryption.
          </p>
        </div>
        <div className="flex items-start gap-2 px-1 py-1">
          <IconCloudCheck
            size={20}
            className="mt-0.5 flex-shrink-0 text-secondary-container"
          />
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Real-time database synchronization.
          </p>
        </div>
      </div>
    </div>
  )
}
