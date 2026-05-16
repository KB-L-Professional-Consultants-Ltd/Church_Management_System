import Image from "next/image"
import Link from "next/link"
import { IconShieldCheck, IconCircleCheckFilled } from "@tabler/icons-react"

import {
  AuthMain,
  AuthPageLayout,
  AuthPageFooter,
  PageFooter,
  FooterLinks,
} from "../components/auth-layout"

export function ResetLinkSentPage() {
  return (
    <AuthPageLayout>
      <AuthMain>
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-secondary-fixed absolute -top-12 -left-12 h-64 w-64 rounded-full opacity-20 blur-3xl" />
          <div className="bg-primary-fixed absolute -right-12 -bottom-12 h-64 w-64 rounded-full opacity-10 blur-3xl" />
        </div>

        {/* Success Card */}
        <div className="relative z-10 w-full max-w-md">
          <div className="overflow-hidden rounded-4xl border-t-4 border-secondary-container bg-surface-container-lowest shadow-lg">
            {/* Hero Image */}
            <div className="relative h-48 w-full overflow-hidden bg-surface-container">
              <Image
                alt="Community celebration"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCptZ3YktmTYx2xSMnVx3uPkQw0JbJtmRMUqD3tdyDZ4ZX4s8ySzZR21YqBBn-tFRtViSq5OQQvw6RDz7Jqykve5Kw99wxNcM5w2cX3aW2OlLdn-7LM2QT-WAaqz8e12xufrw7b5bZPF7_1K4DlVxdhxJvUTQWig7BXTkRc1O6BY4lWoS1Yv15HtV2YkPTi14xZF6AgOd03j_L--gapuqQ2Q3i20jtLT5I_KWqfkpAoqeN1iB38EwHTbruGwJJUraCKvvEgwcaML4n"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>

            {/* Content */}
            <div className="px-8 py-8 text-center">
              {/* Success Icon */}
              <div className="bg-secondary-fixed mb-4 inline-flex items-center justify-center rounded-full p-3">
                <IconCircleCheckFilled
                  size={56}
                  className="text-on-secondary-container"
                />
              </div>

              {/* Messaging */}
              <h1 className="mb-2 font-headline-md text-headline-md text-on-surface">
                Reset Link Sent
              </h1>
              <p className="mb-8 font-body-md text-body-md leading-relaxed text-on-surface-variant">
                Check your inbox. We&apos;ve sent a secure password reset link
                to your registered email address. It may take a few minutes to
                arrive.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-4">
                <Link
                  href="/auth/login"
                  className="text-on-primary inline-flex items-center justify-center rounded-lg bg-primary-container px-6 py-3 font-title-lg text-title-lg transition-all hover:opacity-90 active:scale-95"
                >
                  Return to Login
                </Link>
                <button
                  type="button"
                  className="rounded-lg border border-outline bg-transparent px-6 py-3 font-body-md text-body-md text-on-surface-variant transition-colors hover:bg-surface-container-low"
                >
                  Didn&apos;t receive an email?
                </button>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 border-t border-outline-variant pt-4">
                <div className="inline-flex items-center justify-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                  <IconShieldCheck
                    size={16}
                    stroke={1.8}
                    className="text-on-surface-variant"
                  />
                  <span>Secure connection established</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthMain>

      {/* Footer */}
      <AuthPageFooter>
        <PageFooter />
        <FooterLinks />
      </AuthPageFooter>
    </AuthPageLayout>
  )
}

export default ResetLinkSentPage
