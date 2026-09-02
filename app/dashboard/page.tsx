import { redirect } from "next/navigation";
import { QuoteWidget } from "@/components/QuoteWidget";
import { SignOutButton } from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";

type Shipment = {
  id: string;
  origin_label: string;
  destination_label: string;
  status: string;
  quoted_cents: number;
  distance_mi: number;
  created_at: string;
};

function formatUsd(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: shipments } = await supabase.rpc("carsenda_my_shipments");
  const list = (shipments ?? []) as Shipment[];

  return (
    <div className="min-h-screen px-6 py-10 lg:px-16">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-accent" />
          <span className="font-mono text-[15px] font-bold tracking-[0.15em]">
            CARSENDA
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-muted">{user.email}</span>
          <SignOutButton />
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
        <section className="flex-1">
          <h1 className="mb-1 text-2xl font-extrabold">Request a shipment</h1>
          <p className="mb-6 text-sm text-ink-muted">
            Get an instant quote and matched carriers for your lane.
          </p>
          <QuoteWidget mode="authenticated" />
        </section>

        <section className="flex-1">
          <h2 className="mb-1 text-2xl font-extrabold">Your shipments</h2>
          <p className="mb-6 text-sm text-ink-muted">
            {list.length === 0
              ? "Nothing yet — requests you make will show up here."
              : `${list.length} shipment${list.length === 1 ? "" : "s"}`}
          </p>

          {list.length === 0 ? (
            <div className="rounded-field border border-dashed border-border px-6 py-12 text-center text-sm text-ink-muted">
              No shipments yet. Use the form to request your first one.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((s) => (
                <div
                  key={s.id}
                  className="rounded-field border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {s.origin_label} → {s.destination_label}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wide text-accent">
                      {s.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-ink-muted">
                    <span>{Math.round(s.distance_mi)} mi</span>
                    <span className="font-semibold text-ink">
                      {formatUsd(s.quoted_cents)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
