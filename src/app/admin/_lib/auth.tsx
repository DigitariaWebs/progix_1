"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "./types";

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

/**
 * Client-side auth using Supabase Auth.
 * Connects the admin dashboard directly to Supabase so accounts created in Supabase Auth work seamlessly.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Resolve initial user session
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        setUser(null);
      } else {
        const u = data.user;
        setUser({
          id: u.id,
          email: u.email ?? "admin@progix.pro",
          name: u.user_metadata?.name ?? u.email?.split("@")[0] ?? "Admin",
          role: "admin",
        });
      }
      setLoading(false);
    });

    // Listen for auth state changes (login / logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
      } else {
        const u = session.user;
        setUser({
          id: u.id,
          email: u.email ?? "admin@progix.pro",
          name: u.user_metadata?.name ?? u.email?.split("@")[0] ?? "Admin",
          role: "admin",
        });
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    if (data.user) {
      const u = data.user;
      setUser({
        id: u.id,
        email: u.email ?? "admin@progix.pro",
        name: u.user_metadata?.name ?? u.email?.split("@")[0] ?? "Admin",
        role: "admin",
      });
    }
  }, []);

  const logout = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Redirects to /admin/login once loading finishes with no user. */
export function useRequireAuth(): AuthState {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.loading && !auth.user) router.replace("/admin/login");
  }, [auth.loading, auth.user, router]);
  return auth;
}
