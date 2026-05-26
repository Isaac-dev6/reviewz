"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

export type PlanId = "solo" | "business" | "multi";

interface Plan {
  id: PlanId;
  name: string;
  price: number;
  sub: string;
  features: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    price: 29,
    sub: "Pour un commerce indépendant",
    features: [
      "1 fiche Google",
      "Réponses IA illimitées",
      "Brouillons pour avis 1-2 étoiles",
      "Statistiques de base",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 49,
    sub: "Le choix de 80 % de nos clients",
    features: [
      "1 fiche Google",
      "Réponses IA illimitées",
      "Ton personnalisé avec apprentissage",
      "Alertes Slack & email",
      "Statistiques avancées",
      "Support prioritaire",
    ],
    featured: true,
  },
  {
    id: "multi",
    name: "Multi",
    price: 99,
    sub: "Pour les enseignes & franchises",
    features: [
      "Jusqu'à 10 fiches Google",
      "Tout du plan Business",
      "Tableau de bord consolidé",
      "Rôles & équipes",
      "API & exports",
    ],
  },
];

export function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(plan: PlanId) {
    setError(null);
    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Impossible de démarrer le paiement.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
      setLoadingPlan(null);
    }
  }

  return (
    <section id="tarifs" className="px-6 lg:px-16 py-16 lg:py-22 bg-white">
      <div className="text-center mb-12 lg:mb-14">
        <span className="eyebrow">Tarifs</span>
        <h2 className="mt-3 text-4xl lg:text-[48px] tracking-[-0.025em]">
          Un prix simple. Sans engagement.
        </h2>
        <p className="mt-3 text-[15.5px] text-slate-500">
          Sans engagement · Annulation en 1 clic.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {PLANS.map((p) => (
          <Card
            key={p.id}
            featured={p.featured}
            className={cn("p-6 lg:p-7 relative flex flex-col")}
          >
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Chip
                  variant="amberSolid"
                  className="h-6 px-3 font-semibold shadow-[0_4px_12px_rgba(245,158,11,0.35)]"
                >
                  Recommandé
                </Chip>
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg">{p.name}</h3>
            </div>
            <div className="mt-2.5 flex items-baseline gap-1">
              <span className="text-[42px] font-extrabold tracking-[-0.03em]">
                {p.price}€
              </span>
              <span className="text-slate-500 text-sm">/ mois</span>
            </div>
            <p className="mt-1 text-[13.5px] text-slate-500">{p.sub}</p>
            <div className="my-5 h-px bg-slate-200" />
            <ul className="space-y-2.5 flex-1">
              {p.features.map((f, i) => (
                <li key={i} className="flex gap-2 items-start text-[15px] text-slate-700">
                  <Check
                    className={cn(
                      "size-[14px] mt-1 flex-shrink-0",
                      p.featured ? "text-amber-600" : "text-green-700",
                    )}
                    strokeWidth={2.6}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button
                block
                variant={p.featured ? "primary" : "ghost"}
                disabled={loadingPlan !== null}
                onClick={() => startCheckout(p.id)}
              >
                {loadingPlan === p.id ? "Redirection…" : "Démarrer"}
                {loadingPlan !== p.id && <ArrowRight className="size-4" />}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {error && (
        <p className="mt-6 text-center text-sm text-red-700 max-w-[500px] mx-auto">
          {error}
        </p>
      )}
    </section>
  );
}
