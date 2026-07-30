"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { fetchClosersAction, deleteCloserAction, Closer } from "@/features/closers";

export default function AdminClosersPage() {
  const [closers, setClosers] = useState<Closer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClosersAction();
      setClosers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Supprimer définitivement le closer « ${name} » ?`)) return;
    setBusyId(id);
    const res = await deleteCloserAction(id);
    setBusyId(null);
    if (res.ok) {
      await loadData();
    } else {
      alert(`Erreur : ${res.error}`);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-white/45 uppercase">
            Équipe commerciale
          </p>
          <div className="mt-3 flex items-baseline gap-3">
            <h1 className="text-3xl font-bold tracking-[-0.02em]">Closers</h1>
            {closers && <span className="font-mono text-sm text-white/40">{closers.length}</span>}
          </div>
        </div>
        <Link
          href="/admin/closers/new"
          className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-4 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff]"
        >
          <Plus className="size-4" />
          Nouveau closer
        </Link>
      </div>

      {error ? (
        <div className="mt-10 flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-6 text-sm text-amber-200/80">
          <AlertCircle className="size-5 shrink-0 text-amber-400" />
          <span>Erreur de communication avec Supabase : {error}</span>
        </div>
      ) : loading ? (
        <div className="mt-10 flex items-center gap-3 text-sm text-white/40">
          <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          Chargement des closers…
        </div>
      ) : !closers || closers.length === 0 ? (
        <div className="mt-10 rounded-xl border border-white/10 p-12 text-center text-sm text-white/40">
          Aucun closer trouvé. Cliquez sur « Nouveau closer » pour en créer un.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-white/45">
                <th className="px-6 py-4 font-normal">NOM</th>
                <th className="px-6 py-4 font-normal">EMAIL</th>
                <th className="px-6 py-4 font-normal">ADRESSE</th>
                <th className="px-6 py-4 text-right font-normal">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {closers.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white">
                    {c.first_name} {c.last_name}
                  </td>
                  <td className="px-6 py-4 text-white/70">{c.email}</td>
                  <td className="px-6 py-4 text-white/50">{c.address}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/closers/${c.id}`}
                        title="Modifier"
                        className="rounded-md p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <Edit className="size-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id, `${c.first_name} ${c.last_name}`)}
                        disabled={busyId === c.id}
                        title="Supprimer"
                        className="rounded-md p-2 text-white/50 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
