# Carsenda

Vehicle transport marketplace — instant quotes, carrier matching, and shipment
tracking. Next.js 16 (App Router) on top of a Supabase/PostGIS backend.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- Supabase (Postgres + PostGIS + Auth), accessed only through `public.carsenda_*`
  bridge functions — the application tables live in a dedicated `carsenda`
  schema and are never exposed directly over PostgREST
- Deployed on Railway, built from this repo

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Architecture notes

- `lib/supabase/client.ts` / `lib/supabase/server.ts` — browser and server
  Supabase clients (`@supabase/ssr`), both on the default `public` schema.
- `proxy.ts` — refreshes the Supabase auth session on every request (Next 16's
  successor to `middleware.ts`).
- `public.carsenda_quote` — anonymous, no-auth instant quote calculator.
- `public.carsenda_request_shipment_auth` — authenticated request flow; creates
  a real shipment owned by the signed-in user and returns matched carriers.
- `public.carsenda_my_shipments` / `public.carsenda_carrier_open_loads` —
  `SECURITY INVOKER` read bridges so existing RLS policies apply unchanged.
- A `carsenda.profiles` row is created automatically on signup via a trigger
  on `auth.users` (migration `0011_handle_new_user_profile`).

## Known gaps

- City picker is a static list of major-city coordinates, not a geocoder —
  no mapping API key is wired up yet.
- Carrier bidding, live tracking, payments, and condition reports are modeled
  in the database but have no UI yet — this covers the quote → request →
  match core loop end to end, not the full marketplace.
