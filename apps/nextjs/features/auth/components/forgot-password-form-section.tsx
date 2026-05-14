"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconArrowBack, IconArrowRight, IconMail } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@workspace/ui/components/button"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import { ErrorAlert, LoadingSpinner } from "./auth-layout"

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
})

type FormValues = z.infer<typeof formSchema>

export function ForgotPasswordFormSection() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: FormValues) {
    setServerError(null)
    setIsLoading(true)
    try {
      // TODO: replace with real password reset API call
      setIsSubmitted(true)
      // Optionally redirect after a delay
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch {
      setServerError("Unable to process your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[16px] border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-lg">
        {isSubmitted ? (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary-container">
              <IconArrowRight
                size={32}
                stroke={2}
                className="text-on-secondary-container"
              />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
              Check your email
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the link to reset your password.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-on-primary-fixed px-6 py-3 font-label-md text-[16px] text-surface-container-lowest shadow-md transition-all hover:bg-on-primary-fixed-variant"
            >
              <IconArrowBack size={18} stroke={2} />
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                Forgot Password?
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Enter the email address associated with your account and we&apos;ll
                send you a secure link to reset your password.
              </p>
            </div>

            {serverError && <ErrorAlert message={serverError} />}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Field
                className="space-y-1"
                data-invalid={!!form.formState.errors.email}
              >
                <FieldLabel
                  htmlFor="email"
                  className="ml-1 block font-label-md text-label-md font-semibold tracking-wider text-on-surface-variant capitalize"
                >
                  Email Address
                </FieldLabel>
                <div className="group relative">
                  <IconMail
                    aria-hidden="true"
                    size={18}
                    stroke={1.8}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-on-primary-fixed"
                  />
                  <Input
                    id="email"
                    {...form.register("email")}
                    type="email"
                    placeholder="name@sanctuaryos.com"
                    className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright pr-4 pl-11 font-body-md text-on-surface transition-all placeholder:text-on-surface-variant/60 focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
                    aria-invalid={!!form.formState.errors.email}
                  />
                </div>
                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-on-primary-fixed text-surface-container-lowest font-label-md text-[16px] rounded-lg shadow-md hover:bg-on-primary-fixed-variant transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <IconArrowRight size={18} stroke={2} />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center pt-2">
                  <Link
                    href="/auth/login"
                    className="group inline-flex items-center gap-1 text-on-primary-fixed-variant font-label-md text-label-md hover:text-secondary-container transition-colors"
                  >
                    <IconArrowBack
                      size={18}
                      stroke={2}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
