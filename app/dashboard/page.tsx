"use client";

import { useState } from "react";
import { AlertTriangle, Clock, Inbox, Search, Star } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ReviewItem } from "@/components/dashboard/review-item";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { CriticalModal } from "@/components/dashboard/critical-modal";
import { cn } from "@/lib/utils";

const HISTO = [3, 5, 4, 7, 6, 5, 8, 6, 9, 7, 8, 12];

const reviews = [
  {
    avatar: { initials: "TR", bg: "#FCA5A5" },
    name: "Thomas R.",
    rating: 2,
    critical: true,
    text: "Service très long, j'ai attendu 25 minutes pour un simple café. La serveuse semblait débordée et peu aimable. Décevant pour un établissement avec autant d'avis positifs.",
    when: "il y a 12 min",
  },
  {
    avatar: { initials: "LM", bg: "#FCD34D" },
    name: "Léa M.",
    rating: 5,
    status: "auto" as const,
    text: "Une pause café parfaite ! Le latte était délicieux, l'ambiance cosy et l'accueil aux petits soins. Je reviendrai très vite.",
    when: "il y a 28 min",
    aiReply:
      "Léa, quel plaisir de lire votre message ! Toute l'équipe se réjouit de vous avoir accueillie. À très vite.",
  },
  {
    avatar: { initials: "HD", bg: "#93C5FD" },
    name: "Hugo D.",
    rating: 4,
    status: "draft" as const,
    text: "Très bon café, ambiance chaleureuse. Le service était un peu lent en pleine heure de pointe mais l'équipe est sympa.",
    when: "il y a 1 h",
    aiReply:
      "Merci Hugo pour ce retour sincère. Vous avez raison, nous travaillons à mieux absorber les pics d'affluence. Au plaisir de vous revoir.",
    draft: true,
  },
  {
    avatar: { initials: "SB", bg: "#86EFAC" },
    name: "Sarah B.",
    rating: 5,
    status: "auto" as const,
    text: "Mon coffee shop préféré. Tout y est : la qualité, l'accueil, la déco. Une adresse à recommander absolument.",
    when: "il y a 2 h",
    aiReply:
      "Sarah, merci infiniment pour ces mots qui nous touchent. À bientôt pour votre prochain café !",
  },
  {
    avatar: { initials: "NM", bg: "#C4B5FD" },
    name: "Nicolas M.",
    rating: 1,
    critical: true,
    text: "Très déçu, on m'a refusé une table en terrasse alors qu'il y en avait des libres. Ça commence mal une expérience client.",
    when: "il y a 3 h",
  },
];

const filters = [
  { label: "À traiter", count: 2, active: true },
  { label: "Auto-publiés", count: 47 },
  { label: "Brouillons", count: 3 },
  { label: "Tous" },
];

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex h-screen bg-white text-slate-900">
      <Sidebar active="inbox" />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="px-7 pt-6 pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow-muted">Inbox</span>
              <h2 className="mt-1 text-2xl tracking-[-0.025em]">Avis récents</h2>
            </div>
            <div className="flex items-center gap-2">
              <Chip variant="green" dot>
                Sync actif
              </Chip>
              <button
                onClick={() => setModalOpen(true)}
                className="cursor-pointer"
              >
                <Chip variant="amber" dot>
                  2 alertes
                </Chip>
              </button>
              <button className="size-8 rounded-md border border-slate-200 inline-flex items-center justify-center text-slate-500 cursor-pointer">
                <Search className="size-[15px]" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-[18px] items-center">
            {filters.map((f) => (
              <button
                key={f.label}
                className={cn(
                  "h-8 px-3.5 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5 cursor-pointer",
                  f.active
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                )}
              >
                {f.label}
                {f.count != null && (
                  <span
                    className={cn(
                      "text-[11px] font-semibold px-1.5 py-px rounded-[10px]",
                      f.active
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {f.count}
                  </span>
                )}
              </button>
            ))}
            <div className="flex-1" />
            <span className="text-[12.5px] text-slate-500">
              Dernière synchro · il y a 2 min
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-auto no-scrollbar">
          {reviews.map((r, i) => (
            <div
              key={i}
              onClick={r.critical ? () => setModalOpen(true) : undefined}
              className={r.critical ? "cursor-pointer" : undefined}
            >
              <ReviewItem {...r} />
            </div>
          ))}
        </div>
      </main>

      <aside className="w-[320px] bg-slate-50 border-l border-slate-200 p-[18px] flex flex-col gap-4 overflow-auto no-scrollbar">
        <div>
          <span className="eyebrow-muted">Aperçu — Performance</span>
          <div className="text-[11px] text-slate-500 mt-0.5">30 derniers jours</div>
        </div>
        <KpiCard
          label="Note Google"
          value="4,8 / 5"
          delta="+0,3"
          deltaDir="up"
          sub="vs. mois dernier"
          icon={<Star className="size-[13px]" />}
        />
        <KpiCard
          label="Avis traités"
          value="142"
          delta="+38"
          deltaDir="up"
          sub="vs. mois dernier"
          icon={<Inbox className="size-[13px]" />}
        />
        <KpiCard
          label="Temps économisé"
          value="6 h 24"
          delta="+1 h 12"
          deltaDir="up"
          sub="vs. mois dernier"
          icon={<Clock className="size-[13px]" />}
        />
        <KpiCard
          label="Alertes"
          value="2"
          sub="Avis critiques à valider"
          tone="danger"
          icon={<AlertTriangle className="size-[13px]" />}
        />

        <div className="rounded-xl border border-slate-200 bg-white p-3.5">
          <div className="flex justify-between items-baseline mb-2.5">
            <span className="eyebrow-muted text-[10px]">Avis par semaine</span>
            <span className="text-[10px] text-slate-500">12 sem.</span>
          </div>
          <div className="flex items-end gap-1 h-[78px]">
            {HISTO.map((v, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-[3px]",
                  i === HISTO.length - 1
                    ? "bg-amber-500"
                    : "bg-slate-100 border border-slate-200",
                )}
                style={{ height: `${(v / Math.max(...HISTO)) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="eyebrow-muted">Activité IA</span>
          <div className="mt-2.5 flex flex-col gap-3.5">
            {[
              { t: "Réponse publiée pour Léa M.", s: "il y a 12 min" },
              { t: "Brouillon généré pour Hugo D.", s: "il y a 28 min" },
              { t: "Nouvel avis détecté", s: "il y a 1 h" },
            ].map((a, i) => (
              <div key={i} className="flex gap-2.5 relative">
                <div className="relative flex-shrink-0">
                  <div className="size-2 rounded-full bg-amber-500 mt-1.5 shadow-[0_0_0_3px_#FEF3C7]" />
                  {i < 2 && (
                    <div className="absolute left-[3.5px] top-4 -bottom-3.5 w-px bg-slate-200" />
                  )}
                </div>
                <div>
                  <div className="text-[12.5px] text-slate-900 font-medium leading-snug">{a.t}</div>
                  <div className="text-[11px] text-slate-500 mt-px">{a.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <CriticalModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
