"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { RoleToggle, type Role } from "@/components/RoleToggle";
import { createClient } from "@/lib/supabase/client";

// UI-facing "Customer" maps to the database's "shipper" role.
const ROLE_TO_DB_ROLE: Record<Role, "shipper" | "carrier"> = {
  customer: "shipper",
  carrier: "carrier",
};

export default function SignupPage() {
  const [role, setRole] = useState<Role>("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: ROLE_TO_DB_ROLE[role] },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <AuthShell>
        <div className="flex flex-col gap-4">
          <h2 className="text-[28px] font-extrabold">Check your email</h2>
          <p className="text-[15px] text-ink-muted">
            We sent a confirmation link to <span className="text-ink">{email}</span>.
            Follow it to finish setting up your {role === "carrier" ? "carrier" : "customer"} account.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <RoleToggle value={role} onChange={setRole} />

        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-extrabold">Create your account</h2>
          <p className="text-[15px] text-ink-muted">
            {role === "carrier"
              ? "Start bidding on real loads in minutes."
              : "Get an instant quote on your first shipment."}
          </p>
        </div>

        {error && (
          <p className="rounded-field border border-border bg-surface px-4 py-3 text-sm text-accent">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink-muted">
            Full name
          </span>
          <input
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jamie Daniel"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink-muted">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink-muted">
            Password
          </span>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="field"
          />
        </label>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-ink-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
