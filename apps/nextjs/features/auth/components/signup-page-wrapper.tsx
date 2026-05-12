import Link from "next/link"
import type { ReactNode } from "react"

import { AuthMain, AuthPageLayout, SpiritualAccentBg } from "./auth-layout"

interface SignupPageWrapperProps {
  children: ReactNode
}

export function SignupPageWrapper({ children }: SignupPageWrapperProps) {
  return (
    <AuthPageLayout>
      <AuthMain>
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
          <div className="absolute top-[-20%] right-[-10%] h-150 w-150 rounded-full bg-secondary-container opacity-[0.03] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] h-150 w-150 rounded-full bg-on-primary-fixed opacity-[0.03] blur-3xl" />
        </div>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-120">{children}</div>
      </AuthMain>

      {/* Footer */}
      <footer className="flex w-full flex-col items-center gap-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="#"
            className="text-xs font-semibold tracking-widest text-outline uppercase transition-colors hover:text-on-primary-fixed"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs font-semibold tracking-widest text-outline uppercase transition-colors hover:text-on-primary-fixed"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs font-semibold tracking-widest text-outline uppercase transition-colors hover:text-on-primary-fixed"
          >
            Help Center
          </Link>
        </div>
        <p className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase">
          © 2024 GraceGuide CMS
        </p>
      </footer>
    </AuthPageLayout>
  )
}
