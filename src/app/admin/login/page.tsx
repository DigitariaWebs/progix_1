"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../_lib/auth";

export default function AdminLoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in → skip the form.
  useEffect(() => {
    if (user) router.replace("/admin/devis");
  }, [user, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin/devis");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#67c8ff] uppercase">Progix</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em]">Admin</h1>
          <p className="mt-2 text-sm text-white/50">Sign in to manage the site.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@progix.pro"
            autoComplete="username"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-[#060d1c] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
            {!submitting && (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="mt-2 w-full rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#67c8ff]/50 focus:outline-none"
      />
    </label>
  );
}
