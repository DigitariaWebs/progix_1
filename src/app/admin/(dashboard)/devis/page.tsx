"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Edit, Trash2, AlertCircle } from "lucide-react";
import { fetchEstimatesAction, deleteEstimateAction, ClientEstimate } from "@/features/devis";

export default function AdminDevisPage() {
  const [estimates, setEstimates] = useState<ClientEstimate[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEstimatesAction();
      setEstimates(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstimatesAction()
      .then((data) => setEstimates(data))
      .catch((e) => setError(e instanceof Error ? e.message : "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!window.confirm(`Supprimer définitivement le devis pour « ${slug} » ?`)) return;
    setBusySlug(slug);
    const res = await deleteEstimateAction(slug);
    setBusySlug(null);
    if (res.ok) {
      await loadData();
    } else {
      alert(`Erreur : ${res.error}`);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-white/45 uppercase">
            Propositions
          </p>
          <div className="mt-3 flex items-baseline gap-3">
            <h1 className="text-3xl font-bold tracking-[-0.02em]">Devis Clients</h1>
            {estimates && (
              <span className="font-mono text-sm text-white/40">{estimates.length}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/devis/new"
            className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-4 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff]"
          >
            <Plus className="size-4" />
            Nouveau Devis
          </Link>
        </div>
      </div>

      {error ? (
        <div className="mt-10 flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-6 text-sm text-amber-200/80">
          <AlertCircle className="size-5 shrink-0 text-amber-400" />
          <span>Erreur de communication avec Supabase : {error}</span>
        </div>
      ) : loading ? (
        <div className="mt-10 flex items-center gap-3 text-sm text-white/40">
          <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          Chargement des devis…
        </div>
      ) : !estimates || estimates.length === 0 ? (
        <div className="mt-10 rounded-xl border border-white/10 p-12 text-center text-sm text-white/40">
          Aucun devis trouvé. Cliquez sur &laquo; Nouveau Devis &raquo; pour en créer un.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-white/45">
                <th className="px-6 py-4 font-normal">CLIENT</th>
                <th className="px-6 py-4 font-normal">PROJET</th>
                <th className="px-6 py-4 font-normal">SLUG · LIEN</th>
                <th className="px-6 py-4 font-normal">MONTANT</th>
                <th className="px-6 py-4 font-normal">CODE D’ACCÈS</th>
                <th className="px-6 py-4 text-right font-normal">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {estimates.map((est) => (
                <tr key={est.slug} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white">{est.client_name}</td>
                  <td className="px-6 py-4 text-white/70">{est.project_name}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-[#67c8ff]">/devis/{est.slug}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {est.total_amount} {est.currency}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white/60">{est.access_code}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/devis/${est.slug}`}
                        target="_blank"
                        title="Voir la présentation"
                        className="rounded-md p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/devis/${est.slug}`}
                        title="Modifier"
                        className="rounded-md p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <Edit className="size-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(est.slug)}
                        disabled={busySlug === est.slug}
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
