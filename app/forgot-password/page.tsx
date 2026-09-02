"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback?next=/dashboard`
            : undefined,
      },
    );

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <AuthShell>
        <div className="flex flex-col gap-4">
          <h2 className="text-[28px] font-extrabold">Check your email</h2>
          <p className="text-[15px] text-ink-muted">
            If an account exists for <span className="text-ink">{email}</span>,
            we sent a link to reset your password.
          </p>
          <Link href="/login" className="text-sm font-medium text-accent">
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-extrabold">Reset your password</h2>
          <p className="text-[15px] text-ink-muted">
            We&rsquo;ll email you a link to set a new one.
          </p>
        </div>

        {error && (
          <p className="rounded-field border border-border bg-surface px-4 py-3 text-sm text-accent">
            {error}
          </p>
        )}

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

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Sending…" : "Send reset link"}
        </button>

        <Link href="/login" className="text-center text-sm text-ink-muted">
          Back to sign in
        </Link>
      </form>
    </AuthShell>
  );
}
