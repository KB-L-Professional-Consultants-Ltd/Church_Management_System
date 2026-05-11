import Link from "next/link"
import type { ReactNode } from "react"

interface AuthPageLayoutProps {
  children: ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      {children}
    </div>
  )
}

interface AuthMainProps {
  children: ReactNode
}

export function AuthMain({ children }: AuthMainProps) {
  return (
    <main className="bg-spiritual-accent relative flex grow items-center justify-center overflow-hidden px-6 py-12">
      {children}
    </main>
  )
}

interface AuthPageFooterProps {
  children: ReactNode
}

export function AuthPageFooter({ children }: AuthPageFooterProps) {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-4 border-t border-outline-variant bg-surface-container-low px-8 py-8 md:flex-row">
      {children}
    </footer>
  )
}

interface AuthHeaderProps {
  icon?: ReactNode
  title: string
  subtitle: string
}

export function AuthHeader({ icon, title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center">
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-on-primary-fixed shadow-md">
          {icon}
        </div>
      )}
      <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-primary-fixed">
        {title}
      </h1>
      <p className="mt-1 font-body-sm text-on-surface-variant">{subtitle}</p>
    </div>
  )
}

interface AuthFooterProps {
  text: string
  linkText: string
  linkHref: string
}

export function AuthFooter({ text, linkText, linkHref }: AuthFooterProps) {
  return (
    <div className="text-center">
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        {text} {" "}
        <Link
          href={linkHref}
          className="font-bold text-secondary transition-all hover:underline"
        >
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px grow border-t border-outline-variant" />
      <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
        or
      </span>
      <div className="h-px grow border-t border-outline-variant" />
    </div>
  )
}

interface ErrorAlertProps {
  message: string
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-6">
      <div className="rounded-lg border border-error bg-error-container p-3">
        <p className="font-body-sm text-body-sm text-on-error-container">
          {message}
        </p>
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  text?: string
}

export function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-surface-bright border-t-transparent" />
      <span>{text}</span>
    </div>
  )
}

export function PageFooter() {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <span className="font-label-md font-bold text-primary">SanctuaryOS</span>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        © 2024 SanctuaryOS. All rights reserved. Sacred Professionalism for
        Modern Communities.
      </p>
    </div>
  )
}

export function FooterLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="#"
        className="font-label-sm text-label-sm text-on-surface-variant underline transition-all hover:text-secondary-fixed-dim"
      >
        Privacy Policy
      </a>
      <a
        href="#"
        className="font-label-sm text-label-sm text-on-surface-variant underline transition-all hover:text-secondary-fixed-dim"
      >
        Terms of Service
      </a>
      <a
        href="#"
        className="font-label-sm text-label-sm text-on-surface-variant underline transition-all hover:text-secondary-fixed-dim"
      >
        Support Center
      </a>
      <a
        href="#"
        className="font-label-sm text-label-sm text-on-surface-variant underline transition-all hover:text-secondary-fixed-dim"
      >
        System Status
      </a>
    </div>
  )
}

export function SpiritualAccentBg() {
  return (
    <div className="pointer-events-none absolute top-0 right-0 h-1/3 w-1/3 opacity-10">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.3,89.2,-15.1,87.3,-0.6C85.4,13.9,77.5,27.7,68.4,39.1C59.2,50.5,48.8,59.4,37.1,66.4C25.4,73.4,12.7,78.5,-0.6,79.5C-13.8,80.5,-27.7,77.4,-40.4,70.9C-53.1,64.4,-64.7,54.4,-72.6,42.2C-80.4,30.1,-84.6,15.1,-85.1,-0.3C-85.6,-15.7,-82.5,-31.4,-74.6,-44.6C-66.8,-57.8,-54.3,-68.6,-40.6,-75.7C-26.9,-82.7,-13.4,-86.1,0.5,-86.9C14.3,-87.8,28.6,-86.1,44.7,-76.4Z"
          fill="#fe9c2d"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  )
}

export function AuthSupportingIllustration() {
  return (
    <div className="mt-8 flex flex-col items-center opacity-60">
      <div className="mb-4 flex gap-4">
        <span className="material-symbols-outlined text-outline">
          verified_user
        </span>
        <span className="material-symbols-outlined text-outline">database</span>
        <span className="material-symbols-outlined text-outline">groups</span>
      </div>
      <p className="max-w-[20rem] text-center font-label-sm text-label-sm text-outline-variant">
        Enterprise-grade security meets spiritual stewardship in a unified
        platform.
      </p>
    </div>
  )
}