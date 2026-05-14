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
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4 p-2 bg-primary-container rounded-xl shadow-lg">
              <IconBuilding
                size={32}
                stroke={1.5}
                className="text-surface-container-lowest"
              />
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-primary-fixed tracking-tight">
              SanctuaryOS
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Professional Excellence for Sacred Communities
            </p>
          </div>

          {/* Forgot Password Form */}
          <ForgotPasswordFormSection />

          {/* Decorative Visual */}
          <div className="mt-8 grid grid-cols-2 gap-4 opacity-40">
            <div className="h-1 bg-secondary-container rounded-full" />
            <div className="h-1 bg-outline-variant rounded-full" />
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
