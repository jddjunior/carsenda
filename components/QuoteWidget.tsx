"use client";

import { useState } from "react";
import { CITIES, TRANSPORT_TYPES, VEHICLE_CLASSES } from "@/lib/cities";
import { createClient } from "@/lib/supabase/client";

type Match = {
  carrier_id: string;
  legal_name: string;
  fit_score: number;
  origin_deviation_mi: number;
  dest_deviation_mi: number;
};

type QuoteResult = {
  distance_mi: number;
  quote_cents: number;
  currency: string;
  shipment_id?: string;
  matches?: Match[];
};

function formatUsd(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function QuoteWidget({ mode }: { mode: "anonymous" | "authenticated" }) {
  const [origin, setOrigin] = useState<string>(CITIES[0].label);
  const [destination, setDestination] = useState<string>(CITIES[1].label);
  const [vehicleClass, setVehicleClass] = useState<string>(VEHICLE_CLASSES[0].value);
  const [transportType, setTransportType] = useState<string>(TRANSPORT_TYPES[0].value);
  const [operable, setOperable] = useState(true);
  const [pickupDate, setPickupDate] = useState(() =>
    new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const originCity = CITIES.find((c) => c.label === origin)!;
    const destCity = CITIES.find((c) => c.label === destination)!;
    const supabase = createClient();

    const rpcName =
      mode === "authenticated"
        ? "carsenda_request_shipment_auth"
        : "carsenda_quote";

    const baseArgs = {
      p_origin_lat: originCity.lat,
      p_origin_lon: originCity.lon,
      p_destination_lat: destCity.lat,
      p_destination_lon: destCity.lon,
      p_vehicle_class: vehicleClass,
      p_transport_type: transportType,
      p_operable: operable,
      p_pickup_date: pickupDate,
    };

    const args =
      mode === "authenticated"
        ? {
            ...baseArgs,
            p_origin_label: origin,
            p_destination_label: destination,
            p_limit: 5,
          }
        : baseArgs;

    const { data, error: rpcError } = await supabase.rpc(rpcName, args);

    setLoading(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setResult(data as QuoteResult);
  }

  return (
    <div className="w-full rounded-field border border-border bg-surface p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ink-muted">Origin</span>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="field"
            >
              {CITIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ink-muted">
              Destination
            </span>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="field"
            >
              {CITIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ink-muted">
              Vehicle type
            </span>
            <select
              value={vehicleClass}
              onChange={(e) => setVehicleClass(e.target.value)}
              className="field"
            >
              {VEHICLE_CLASSES.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ink-muted">
              Transport
            </span>
            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="field"
            >
              {TRANSPORT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-ink-muted">
              Pickup date
            </span>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className="field"
            />
          </label>

          <label className="flex items-center gap-2.5 self-end pb-3.5">
            <input
              type="checkbox"
              checked={operable}
              onChange={(e) => setOperable(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-surface accent-accent"
            />
            <span className="text-sm text-ink">Vehicle runs and drives</span>
          </label>
        </div>

        {error && (
          <p className="rounded-field border border-border bg-canvas px-4 py-3 text-sm text-accent">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading
            ? "Getting quote…"
            : mode === "authenticated"
              ? "Request shipment & find carriers"
              : "Get instant quote"}
        </button>
      </form>

      {result && (
        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-ink-muted">
              {Math.round(result.distance_mi)} mi
            </span>
            <span className="text-3xl font-extrabold text-accent">
              {formatUsd(result.quote_cents)}
            </span>
          </div>

          {result.matches && (
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-ink-muted">
                {result.matches.length > 0
                  ? `${result.matches.length} matched carrier${result.matches.length === 1 ? "" : "s"}`
                  : "No carriers on this lane yet"}
              </span>
              {result.matches.map((m) => (
                <div
                  key={m.carrier_id}
                  className="flex items-center justify-between rounded-field border border-border bg-canvas px-4 py-3"
                >
                  <span className="text-sm font-medium">{m.legal_name}</span>
                  <span className="font-mono text-xs text-ink-muted">
                    fit {m.fit_score.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
