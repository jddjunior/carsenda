import Link from "next/link";
import { QuoteWidget } from "@/components/QuoteWidget";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-6 lg:px-16">
        <div className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-accent" />
          <span className="font-mono text-[15px] font-bold tracking-[0.15em]">
            CARSENDA
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-field bg-accent px-4 py-2 text-sm font-extrabold text-accent-onaccent"
          >
            Create account
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-8 lg:flex-row lg:items-start lg:gap-12 lg:px-16">
        <div className="flex max-w-md flex-col gap-6 lg:sticky lg:top-16">
          <h1 className="text-4xl font-extrabold leading-[1.12] lg:text-[52px]">
            Ship any vehicle,
            <br />
            <span className="text-accent">any distance.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-ink-muted">
            Instant quotes, vetted carriers, and live tracking from pickup to
            delivery. No calls, no hidden fees.
          </p>
          <span className="h-0.5 w-12 bg-accent" />
          <ul className="flex flex-col gap-2.5">
            {[
              "Binding quotes in under 60 seconds",
              "Every carrier insured & background-checked",
              "Live GPS tracking, door to door",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm font-medium"
              >
                <span className="h-0.5 w-3 shrink-0 bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <QuoteWidget mode="anonymous" />
          <p className="mt-4 text-center text-sm text-ink-muted">
            Like this quote?{" "}
            <Link href="/signup" className="font-medium text-accent">
              Create an account
            </Link>{" "}
            to lock it in and get matched with carriers.
          </p>
        </div>
      </main>
    </div>
  );
}
