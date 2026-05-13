"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  IconArrowRight,
  IconBuilding,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react"
import * as z from "zod"
import { Button } from "@workspace/ui/components/button"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import { AuthDivider, ErrorAlert, LoadingSpinner } from "./auth-layout"

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
      <div className="overflow-hidden rounded-xl border-t-4 border-secondary-container bg-surface-container-lowest p-8 shadow-lg shadow-on-primary-fixed/10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-on-primary-fixed shadow-md shadow-on-primary-fixed/15">
            <IconBuilding
              size={36}
              stroke={1.8}
              className="text-surface-bright"
            />
          </div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-primary-fixed">
            Good News Church CMS
          </h1>
          <p className="mt-1 font-body-sm text-on-surface-variant">
            Sacred Professionalism for Modern Communities
          </p>
        </div>

        {serverError && <ErrorAlert message={serverError} />}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Field
            className="space-y-1"
            data-invalid={!!form.formState.errors.fullName}
          >
            <FieldLabel
              htmlFor="fullName"
              className="ml-1 block font-label-md text-label-md font-semibold tracking-[0.05em] text-on-surface-variant capitalize"
            >
              full name
            </FieldLabel>
            <div className="group relative">
              <IconUser
                aria-hidden="true"
                size={18}
                stroke={1.8}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-on-primary-fixed"
              />
              <Input
                id="fullName"
                {...form.register("fullName")}
                placeholder="John Doe"
                className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright pr-4 pl-11 font-body-md text-on-surface transition-all placeholder:text-on-surface-variant/60 focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
                aria-invalid={!!form.formState.errors.fullName}
              />
            </div>
            <FieldError errors={[form.formState.errors.fullName]} />
          </Field>

          <Field
            className="space-y-1"
            data-invalid={!!form.formState.errors.churchName}
          >
            <FieldLabel
              htmlFor="churchName"
              className="ml-1 block font-label-md text-label-md font-semibold tracking-[0.05em] text-on-surface-variant capitalize"
            >
              church name
            </FieldLabel>
            <div className="group relative">
              <IconBuilding
                aria-hidden="true"
                size={18}
                stroke={1.8}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-on-primary-fixed"
              />
              <Input
                id="churchName"
                {...form.register("churchName")}
                placeholder="Grace Community Church"
                className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright pr-4 pl-11 font-body-md text-on-surface transition-all placeholder:text-on-surface-variant/60 focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
                aria-invalid={!!form.formState.errors.churchName}
              />
            </div>
            <FieldError errors={[form.formState.errors.churchName]} />
          </Field>

          <Field
            className="space-y-1"
            data-invalid={!!form.formState.errors.email}
          >
            <FieldLabel
              htmlFor="email"
              className="ml-1 block font-label-md text-label-md font-semibold tracking-[0.05em] text-on-surface-variant capitalize"
            >
              email address
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
                placeholder="administrator@church.org"
                className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright pr-4 pl-11 font-body-md text-on-surface transition-all placeholder:text-on-surface-variant/60 focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
                aria-invalid={!!form.formState.errors.email}
              />
            </div>
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          <Field
            className="space-y-1"
            data-invalid={!!form.formState.errors.password}
          >
            <div className="flex items-center justify-between px-1">
              <FieldLabel
                htmlFor="password"
                className="font-label-md text-label-md font-semibold tracking-[0.05em] text-on-surface-variant capitalize"
              >
                password
              </FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="font-label-sm text-label-sm text-secondary transition-colors hover:text-secondary-container"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="group relative">
              <IconLock
                aria-hidden="true"
                size={18}
                stroke={1.8}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-on-primary-fixed"
              />
              <Input
                id="password"
                {...form.register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright pr-12 pl-11 font-body-md text-on-surface transition-all placeholder:text-on-surface-variant/60 focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
                aria-invalid={!!form.formState.errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-outline transition-colors hover:text-on-primary-fixed"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IconEyeOff size={18} stroke={1.8} />
                ) : (
                  <IconEye size={18} stroke={1.8} />
                )}
              </button>
            </div>
            <FieldError errors={[form.formState.errors.password]} />
          </Field>

          <div className="pt-1">
            <Button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-on-primary-fixed px-4 font-title-lg text-title-lg text-surface-bright shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            >
              {form.formState.isSubmitting ? (
                <LoadingSpinner text="Creating Account..." />
              ) : (
                <>
                  Create Account
                  <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
                </>
              )}
            </Button>
          </div>
        </form>

        <AuthDivider />

        <div className="mt-6 text-center">
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
