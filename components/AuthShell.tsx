const FEATURES = [
  "Binding quotes in under 60 seconds",
  "Every carrier insured & background-checked",
  "Live GPS tracking, door to door",
];

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex flex-1 flex-col justify-between px-8 py-12 lg:px-16 lg:py-16">
        <div className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-accent" />
          <span className="font-mono text-[15px] font-bold tracking-[0.15em]">
            CARSENDA
          </span>
        </div>

        <div className="mt-16 flex max-w-md flex-col gap-6 lg:mt-0">
          <h1 className="text-4xl font-extrabold leading-[1.12] lg:text-[44px]">
            Ship any vehicle,
            <br />
            <span className="text-accent">any distance.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-ink-muted">
            Instant quotes, vetted carriers, and live tracking from pickup to
            delivery.
          </p>
          <span className="h-0.5 w-12 bg-accent" />
          <ul className="flex flex-col gap-2.5">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm font-medium">
                <span className="h-0.5 w-3 shrink-0 bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block" aria-hidden />
      </div>

      <div className="flex flex-1 items-center justify-center border-t border-border px-8 py-12 lg:border-l lg:border-t-0 lg:px-16">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
