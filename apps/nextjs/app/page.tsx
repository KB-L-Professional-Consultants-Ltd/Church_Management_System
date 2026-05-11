import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 py-12 text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-spiritual-accent" />
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-72 w-72 rounded-full bg-secondary-container/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-80 w-80 rounded-full bg-primary-container/10 blur-3xl" />

      <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-outline-variant/40 bg-surface-container-lowest/95 p-8 shadow-[0_24px_80px_rgba(0,27,61,0.12)] backdrop-blur sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-3 font-label-sm text-label-sm tracking-[0.32em] text-secondary uppercase">
              SanctuaryOS
            </p>
            <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary-fixed sm:text-display-lg">
              Login and signup pages are ready in the Next.js app.
            </h1>
            <p className="mt-4 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              Use the auth screens to sign in or create a new account while the
              rest of the app shell continues to take shape.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-on-primary-fixed px-6 font-title-lg text-title-lg text-surface-bright shadow-md transition-all hover:bg-primary-container"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-outline-variant bg-surface px-6 font-title-lg text-title-lg text-on-primary-fixed transition-all hover:border-secondary-container hover:bg-surface-container-low"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-6 shadow-[0_8px_30px_rgba(0,27,61,0.08)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-on-primary-fixed text-surface-bright shadow-sm">
                <span className="material-symbols-outlined text-[28px]">
                  church
                </span>
              </div>
              <div>
                <p className="font-title-lg text-title-lg font-semibold text-on-primary-fixed">
                  SanctuaryOS
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Sacred Professionalism for Modern Communities
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <p className="font-label-sm text-label-sm tracking-wider text-secondary uppercase">
                  Login
                </p>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                  Email and password sign-in with validation feedback.
                </p>
              </div>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <p className="font-label-sm text-label-sm tracking-wider text-secondary uppercase">
                  Signup
                </p>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                  Full name, church name, email, and password collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
