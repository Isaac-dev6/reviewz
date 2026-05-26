"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, MapPin, Sparkles, Store, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type PlanId = "solo" | "business" | "multi";

interface OnboardingData {
  nom: string;
  type: string;
  ville: string;
  ton: string;
  prenom_patron: string;
}

const PLANS = [
  {
    id: "solo" as PlanId,
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
    id: "business" as PlanId,
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
    id: "multi" as PlanId,
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

const TON_LABELS: Record<string, string> = {
  chaleureux: "Chaleureux",
  professionnel: "Professionnel",
  "décontracté": "Décontracté",
  traditionnel: "Traditionnel",
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: "Restaurant",
  salon: "Salon de coiffure / beauté",
  "médical": "Cabinet médical / dentaire",
  garage: "Garage automobile",
  "auto-école": "Auto-école",
  autre: "Autre",
};

export default function PaiementPage() {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("onboarding_data");
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  async function startCheckout(plan: PlanId) {
    setError(null);
    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const json: { url?: string; error?: string } = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error ?? "Erreur paiement.");
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <Logo />
        <Link
          href="/onboarding"
          className="text-[13px] text-slate-500 hover:text-slate-700"
        >
          ← Modifier mes informations
        </Link>
      </header>

      <div className="px-6 lg:px-16 py-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="eyebrow">Dernière étape</span>
          <h1 className="mt-3 text-3xl lg:text-[42px] tracking-[-0.025em] font-bold">
            Vos informations sont sauvegardées,
            <br />
            finalisez votre inscription.
          </h1>
          <p className="mt-3 text-[15px] text-slate-500">
            Sans engagement · Annulation en 1 clic
          </p>
        </div>

        {data && (
          <div className="mb-10 bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap gap-5 items-center justify-center">
            {data.nom && (
              <div className="flex items-center gap-2 text-[14px] text-slate-700">
                <Store className="size-4 text-amber-500" />
                <span className="font-semibold">{data.nom}</span>
                {data.type && (
                  <span className="text-slate-400">
                    · {TYPE_LABELS[data.type] ?? data.type}
                  </span>
                )}
              </div>
            )}
            {data.ville && (
              <div className="flex items-center gap-1.5 text-[14px] text-slate-500">
                <MapPin className="size-4 text-slate-400" />
                {data.ville}
              </div>
            )}
            {data.ton && (
              <div className="flex items-center gap-1.5 text-[14px] text-slate-500">
                <Sparkles className="size-4 text-amber-400" />
                Ton {TON_LABELS[data.ton] ?? data.ton}
              </div>
            )}
            {data.prenom_patron && (
              <div className="flex items-center gap-1.5 text-[14px] text-slate-500">
                <User className="size-4 text-slate-400" />
                {data.prenom_patron}
              </div>
            )}
          </div>
        )}

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
                <h3 className="text-2xl font-bold">{p.name}</h3>
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-[-0.03em]">
                  {p.price}€
                </span>
                <span className="text-slate-500 text-sm">/ mois</span>
              </div>
              <p className="mt-1 text-[13.5px] text-slate-500">{p.sub}</p>
              <div className="my-5 h-px bg-slate-200" />
              <ul className="space-y-2.5 flex-1">
                {p.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex gap-2 items-start text-base text-slate-700"
                  >
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
                  {loadingPlan === p.id
                    ? "Redirection…"
                    : "Choisir ce plan"}
                  {loadingPlan !== p.id && <ArrowRight className="size-4" />}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {error && (
          <p className="mt-6 text-center text-sm text-red-700">{error}</p>
        )}

        <p className="mt-8 text-center text-[12.5px] text-slate-400">
          Paiement sécurisé par Stripe · Résiliation à tout moment depuis votre espace
        </p>
      </div>
    </div>
  );
}
