import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";

type Shipment = {
  id: string;
  origin_label: string;
  destination_label: string;
  transport_type: string;
  quoted_cents: number;
  distance_mi: number;
  pickup_window_start: string;
};

function formatUsd(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function CarrierPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: loads, error } = await supabase.rpc(
    "carsenda_carrier_open_loads",
  );
  const list = (loads ?? []) as Shipment[];

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

      <main className="mx-auto max-w-3xl">
        <h1 className="mb-1 text-2xl font-extrabold">Available loads</h1>
        <p className="mb-6 text-sm text-ink-muted">
          Open shipments on lanes you're set up to run.
        </p>

        {error ? (
          <div className="rounded-field border border-border bg-surface px-6 py-5 text-sm text-ink-muted">
            You&rsquo;re not linked to a carrier account yet, so there are no
            loads to show. A dispatcher can add you via{" "}
            <code className="font-mono text-accent">carrier_members</code>.
          </div>
        ) : list.length === 0 ? (
          <div className="rounded-field border border-dashed border-border px-6 py-12 text-center text-sm text-ink-muted">
            No open loads on your lanes right now. Check back soon.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-field border border-border bg-surface p-5"
              >
                <div>
                  <span className="text-sm font-medium">
                    {s.origin_label} → {s.destination_label}
                  </span>
                  <div className="mt-1 text-xs text-ink-muted">
                    {Math.round(s.distance_mi)} mi · {s.transport_type} ·
                    pickup {s.pickup_window_start}
                  </div>
                </div>
                <span className="font-semibold text-accent">
                  {formatUsd(s.quoted_cents)}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
