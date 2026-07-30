"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { fetchCloserByIdAction, saveCloserAction, Closer } from "@/features/closers";

export default function AdminCloserEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [form, setForm] = useState<Omit<Closer, "id"> & { id?: string }>({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isNew) return;
    fetchCloserByIdAction(id)
      .then((data) => {
        if (data) setForm(data);
        else setError("Closer introuvable.");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const res = await saveCloserAction(form);
    setSaving(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (isNew) router.push(`/admin/closers/${res.id}`);
    } else {
      setError(res.error);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/40">
        <span className="mr-3 size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        Chargement du closer…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl px-8 py-12">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/closers"
            className="mb-2 inline-flex items-center gap-2 font-mono text-xs text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="size-3" /> RETOUR AUX CLOSERS
          </Link>
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-white">
            {isNew ? "Nouveau closer" : `Éditer : ${form.first_name} ${form.last_name}`}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-5 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff] disabled:opacity-50"
        >
          <Save className="size-4" />
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertCircle className="size-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
          <span>Closer enregistré avec succès !</span>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2">
        <div>
          <label className="block font-mono text-xs text-white/60">PRÉNOM</label>
          <input
            type="text"
            required
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-white/60">NOM</label>
          <input
            type="text"
            required
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-white/60">EMAIL</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-mono text-xs text-white/60">ADRESSE</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
