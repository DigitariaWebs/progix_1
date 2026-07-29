"use client";

import { LogOut, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRequireAuth } from "../_lib/auth";

const NAV = [{ href: "/admin/devis", label: "Devis Clients", icon: FileText, exact: false }];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useRequireAuth();
  const pathname = usePathname();

  // While resolving auth (or redirecting), keep it quiet.
  if (loading || !user) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <span className="size-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-white/10 p-5">
        <div className="px-2 py-3">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#67c8ff] uppercase">Progix</p>
          <p className="mt-1 text-sm font-bold text-white/70">Admin</p>
        </div>

        <nav className="mt-6 flex-1 space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-white/[0.06] font-semibold text-white"
                    : "text-white/55 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 pt-4">
          <p className="px-3 text-sm font-medium text-white/80">{user.name}</p>
          <p className="px-3 text-xs text-white/40">{user.email}</p>
          <button
            onClick={logout}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/55 transition-colors hover:bg-white/[0.03] hover:text-white"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-x-auto">{children}</main>
    </div>
  );
}
