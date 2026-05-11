import Link from "next/link"

import { AuthMain, AuthPageLayout, SpiritualAccentBg } from "@/app/auth-shared"

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout>
      <AuthMain>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-xl rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-lg">
          <p className="mb-3 font-label-sm text-label-sm tracking-[0.32em] text-secondary uppercase">
            SanctuaryOS
          </p>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-primary-fixed">
            Password recovery is not wired yet.
          </h1>
          <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
            The login screen can reach this route now, and you can drop in the
            reset workflow here when it is ready.
          </p>

          <div className="mt-8">
            <Link
              href="/auth"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-on-primary-fixed px-6 font-title-lg text-title-lg text-surface-bright shadow-md transition-all hover:bg-primary-container"
            >
              Back to login
            </Link>
          </div>
        </div>
      </AuthMain>
    </AuthPageLayout>
  )
}