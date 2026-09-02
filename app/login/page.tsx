"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { RoleToggle, type Role } from "@/components/RoleToggle";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(role === "carrier" ? "/carrier" : "/dashboard");
    router.refresh();
  }

  return (
    <AuthShell>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <RoleToggle value={role} onChange={setRole} />

        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-extrabold">Welcome back</h2>
          <p className="text-[15px] text-ink-muted">
            Sign in to manage your shipments.
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

        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-ink-muted">
              Password
            </span>
            <Link href="/forgot-password" className="text-[13px] font-medium text-accent">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="field"
          />
        </label>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-sm text-ink-muted">
          New to Carsenda?{" "}
          <Link href="/signup" className="font-medium text-accent">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
