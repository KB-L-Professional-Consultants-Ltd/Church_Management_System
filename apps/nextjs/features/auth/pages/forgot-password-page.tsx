import { IconBuilding } from "@tabler/icons-react"

import {
  AuthMain,
  AuthPageLayout,
  SpiritualAccentBg,
  AuthPageFooter,
  PageFooter,
  FooterLinks,
} from "../components/auth-layout"
import { ForgotPasswordFormSection } from "../components/forgot-password-form-section"

export function ForgotPasswordPage() {
  return (
    <AuthPageLayout>
      <AuthMain>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-md">
          {/* Brand Identity Anchor */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 rounded-xl bg-primary-container p-2 shadow-lg">
              <IconBuilding
                size={32}
                stroke={1.5}
                className="text-surface-container-lowest"
              />
            </div>
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-primary-fixed">
              SanctuaryOS
            </h1>
            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
              Professional Excellence for Sacred Communities
            </p>
          </div>

          {/* Forgot Password Form */}
          <ForgotPasswordFormSection />

          {/* Decorative Visual */}
          <div className="mt-8 grid grid-cols-2 gap-4 opacity-40">
            <div className="h-1 rounded-full bg-secondary-container" />
            <div className="h-1 rounded-full bg-outline-variant" />
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

export default ForgotPasswordPage
// Test change
