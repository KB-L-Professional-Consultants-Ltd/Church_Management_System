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
import { IconBuilding } from "@tabler/icons-react"

import { AuthDivider, ErrorAlert, LoadingSpinner } from "./auth-layout"

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

type FormValues = z.infer<typeof formSchema>

export function LoginFormSection() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(_data: FormValues) {
    setServerError(null)
    try {
      // TODO: replace with real auth call
      router.push("/")
    } catch {
      setServerError("Unable to complete sign in right now.")
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border-t-4 border-secondary-container bg-surface-container-lowest p-8 shadow-lg">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-on-primary-fixed shadow-md">
            <IconBuilding size={32} className="text-surface-bright" />
          </div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-primary-fixed">
            SanctuaryOS
          </h1>
          <p className="mt-1 font-body-sm text-on-surface-variant">
            Sacred Professionalism for Modern Communities
          </p>
        </div>

        {serverError && <ErrorAlert message={serverError} />}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Field className="gap-1" data-invalid={!!form.formState.errors.email}>
            <FieldLabel
              htmlFor="email"
              className="ml-1 block font-label-md text-label-md text-on-surface-variant"
            >
              EMAIL ADDRESS
            </FieldLabel>
            <Input
              id="email"
              {...form.register("email")}
              type="email"
              placeholder="administrator@church.org"
              className="w-full py-4 pr-4 pl-4 font-body-md text-on-surface transition-all focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20"
              aria-invalid={!!form.formState.errors.email}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          <Field
            className="gap-1"
            data-invalid={!!form.formState.errors.password}
          >
            <div className="flex items-center justify-between px-1">
              <FieldLabel
                htmlFor="password"
                className="font-label-md text-label-md text-on-surface-variant"
              >
                PASSWORD
              </FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="font-label-sm text-label-sm text-secondary transition-colors hover:text-secondary-container"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              {...form.register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full py-4 pr-4 pl-4 font-body-md text-on-surface transition-all focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20"
              aria-invalid={!!form.formState.errors.password}
            />
            <FieldError errors={[form.formState.errors.password]} />
          </Field>

          <div className="pt-1">
            <Button
              type="submit"
              className="text-on-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 font-title-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
            >
              {form.formState.isSubmitting ? (
                <LoadingSpinner text="Signing In..." />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>

        <AuthDivider />

        <div className="mt-6 flex items-center gap-2">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
            <p className="mb-1 font-label-sm text-label-sm text-on-surface-variant">
              Or sign in with
            </p>
            <div className="flex gap-3">
              <Button variant="outline" type="button">
                Google
              </Button>
              <Button variant="outline" type="button">
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
