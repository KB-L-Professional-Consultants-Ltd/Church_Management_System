"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { IconBuilding, IconEye, IconEyeOff } from "@tabler/icons-react"

import { ErrorAlert, LoadingSpinner } from "./auth-layout"

const formSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  churchName: z.string().min(1, "Please enter your church name."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

type FormValues = z.infer<typeof formSchema>

export function SignupFormSection() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", churchName: "", email: "", password: "" },
  })

  async function onSubmit(_data: FormValues) {
    setServerError(null)
    try {
      // TODO: replace with real signup API call
      router.push("/")
    } catch {
      setServerError("Unable to create the account right now.")
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border-t-4 border-secondary-container bg-white p-8 shadow-xl shadow-on-primary-fixed/5 lg:p-12">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-on-primary-fixed shadow-lg shadow-on-primary-fixed/10">
            <IconBuilding size={28} className="text-surface-bright" />
          </div>
          <span className="text-xl font-bold tracking-tight text-on-primary-fixed">
            GraceGuide CMS
          </span>
        </div>

        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-on-surface">
            Create an account
          </h2>
          <p className="text-on-surface-variant">
            Join over 2,500 churches scaling their impact.
          </p>
        </div>

        {serverError && <ErrorAlert message={serverError} />}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Field
            className="gap-1"
            data-invalid={!!form.formState.errors.fullName}
          >
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              {...form.register("fullName")}
              placeholder="John Doe"
              className="mt-1"
              aria-invalid={!!form.formState.errors.fullName}
            />
            <FieldError errors={[form.formState.errors.fullName]} />
          </Field>

          <Field
            className="gap-1"
            data-invalid={!!form.formState.errors.churchName}
          >
            <FieldLabel htmlFor="churchName">Church Name</FieldLabel>
            <Input
              id="churchName"
              {...form.register("churchName")}
              placeholder="Grace Community Church"
              className="mt-1"
              aria-invalid={!!form.formState.errors.churchName}
            />
            <FieldError errors={[form.formState.errors.churchName]} />
          </Field>

          <Field className="gap-1" data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              {...form.register("email")}
              placeholder="pastor@church.org"
              className="mt-1"
              aria-invalid={!!form.formState.errors.email}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          <Field
            className="gap-1"
            data-invalid={!!form.formState.errors.password}
          >
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                {...form.register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                className="mt-1"
                aria-invalid={!!form.formState.errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-outline-variant transition-colors hover:text-outline"
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </button>
            </div>
            <FieldError errors={[form.formState.errors.password]} />
          </Field>

          <div className="pt-2">
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <LoadingSpinner text="Creating Account..." />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-secondary transition-all hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
