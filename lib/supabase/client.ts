import { createBrowserClient } from "@supabase/ssr";

// Deliberately left on the default "public" schema: the carsenda schema's
// tables are not exposed over PostgREST. All client access goes through the
// public.carsenda_* bridge functions (see migration 0007_public_quote_api),
// matching the backend's defense-in-depth design.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
