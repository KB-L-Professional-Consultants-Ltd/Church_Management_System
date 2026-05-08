interface AuthPageLayoutProps {
  children: React.ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="bg-surface text-on-surface flex min-h-screen flex-col">
      {children}
    </div>
  )
}

interface AuthMainProps {
  children: React.ReactNode
}

export function AuthMain({ children }: AuthMainProps) {
  return (
    <main className="bg-spiritual-accent px-gutter py-2xl relative grow overflow-hidden">
      {children}
    </main>
  )
}

interface AuthPageFooterProps {
  children: React.ReactNode
}

export function AuthPageFooter({ children }: AuthPageFooterProps) {
  return (
    <footer className="gap-md border-outline-variant bg-surface-container-low px-margin py-xl flex w-full flex-col items-center justify-between border-t md:flex-row">
      {children}
    </footer>
  )
}

interface AuthHeaderProps {
  icon?: React.ReactNode
  title: string
  subtitle: string
}

export function AuthHeader({ icon, title, subtitle }: AuthHeaderProps) {
  return (
    <div className="mb-xl flex flex-col items-center">
      {icon && (
        <div className="mb-md bg-on-primary-fixed flex h-16 w-16 items-center justify-center rounded-xl shadow-md">
          {icon}
        </div>
      )}
      <h1 className="text-headline-lg font-headline-lg text-on-primary-fixed tracking-tight">
        {title}
      </h1>
      <p className="mt-xs text-on-surface-variant font-body-sm">{subtitle}</p>
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
      <p className="text-body-sm font-body-sm text-on-surface-variant">
        {text}{" "}
        <a
          href={linkHref}
          className="font-bold text-secondary transition-all hover:underline"
        >
          {linkText}
        </a>
      </p>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="my-xl flex items-center">
      <div className="border-outline-variant grow border-t" />
      <span className="px-md text-label-sm font-label-sm text-outline tracking-widest uppercase">
        or
      </span>
      <div className="border-outline-variant grow border-t" />
    </div>
  )
}

interface ErrorAlertProps {
  message: string
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-lg border-error bg-error-container p-md rounded-lg border">
      <p className="text-body-sm font-body-sm text-on-error-container">
        {message}
      </p>
    </div>
  )
}

interface LoadingSpinnerProps {
  text?: string
}

export function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="gap-sm flex items-center justify-center">
      <div className="border-surface-bright h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
      <span>{text}</span>
    </div>
  )
}

export function PageFooter() {
  return (
    <div className="gap-md flex flex-col items-center md:flex-row">
      <span className="font-label-md font-bold text-primary">SanctuaryOS</span>
      <p className="text-body-sm font-body-sm text-on-surface-variant">
        © 2024 SanctuaryOS. All rights reserved. Sacred Professionalism for
        Modern Communities.
      </p>
    </div>
  )
}

export function FooterLinks() {
  return (
    <div className="gap-md flex flex-wrap justify-center">
      <a
        href="#"
        className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary-fixed-dim underline transition-all"
      >
        Privacy Policy
      </a>
      <a
        href="#"
        className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary-fixed-dim underline transition-all"
      >
        Terms of Service
      </a>
      <a
        href="#"
        className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary-fixed-dim underline transition-all"
      >
        Support Center
      </a>
      <a
        href="#"
        className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary-fixed-dim underline transition-all"
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
    <div className="mt-xl flex flex-col items-center opacity-60">
      <div className="mb-md gap-md flex">
        <svg
          className="text-outline h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <svg
          className="text-outline h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <svg
          className="text-outline h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      </div>
      <p className="text-label-sm font-label-sm text-outline-variant max-w-xs text-center">
        Enterprise-grade security meets spiritual stewardship in a unified
        platform.
      </p>
    </div>
  )
}
