"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Cog,
  Globe,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  Store,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";

const subnav = [
  { label: "Mon compte", icon: User, id: "account" },
  { label: "Établissement", icon: Store, id: "place", active: true },
  { label: "Notifications", icon: Bell, id: "notif" },
  { label: "Sécurité", icon: Cog, id: "security" },
  { label: "Facturation", icon: ShoppingBag, id: "billing" },
  { label: "Équipe", icon: Users, id: "team" },
];

const horaires: [string, string][] = [
  ["Lundi", "08:00 – 19:00"],
  ["Mardi", "08:00 – 19:00"],
  ["Mercredi", "08:00 – 19:00"],
  ["Jeudi", "08:00 – 19:00"],
  ["Vendredi", "08:00 – 20:00"],
  ["Samedi", "09:00 – 20:00"],
  ["Dimanche", "Fermé"],
];

const tones = [
  {
    id: "warm",
    title: "Chaleureux",
    desc: "Convivial, attentif, avec une touche personnelle.",
    icon: Sparkles,
  },
  {
    id: "pro",
    title: "Professionnel",
    desc: "Sobre, courtois, factuel et bienveillant.",
    icon: Store,
  },
  {
    id: "casual",
    title: "Décontracté",
    desc: "Direct, complice, ton du quotidien.",
    icon: User,
  },
];

export default function SettingsPage() {
  const [tone, setTone] = useState("warm");
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar active="settings" />

      <nav className="w-[240px] bg-white border-r border-slate-200 p-[18px] flex-shrink-0">
        <h3 className="text-base px-2 pt-1.5 pb-4 tracking-[-0.018em]">
          Paramètres
        </h3>
        <div className="flex flex-col gap-0.5">
          {subnav.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.id}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] cursor-pointer",
                  it.active
                    ? "bg-amber-50 text-amber-700 font-semibold border-l-2 border-amber-500 rounded-l-none pl-3"
                    : "text-slate-700 font-medium hover:bg-slate-50",
                )}
              >
                <Icon className="size-[15px]" strokeWidth={it.active ? 2.2 : 1.8} />
                {it.label}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="flex-1 overflow-auto no-scrollbar">
        <header className="px-8 pt-6 pb-5 flex justify-between items-start border-b border-slate-200 bg-white">
          <div>
            <div className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
              <span>Paramètres</span>
              <ChevronRight className="size-3" />
              <span>Établissement</span>
            </div>
            <h1 className="mt-1.5 text-2xl tracking-[-0.025em]">Établissement</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost">Annuler</Button>
            <Button>Enregistrer</Button>
          </div>
        </header>

        <div className="px-8 py-6 flex flex-col gap-4 max-w-[1100px]">
          <FormCard
            title="Identité"
            desc="Les informations publiques de votre fiche Google."
          >
            <div>
              <FieldLabel>Nom commercial</FieldLabel>
              <Input defaultValue="Italian Family" />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <FieldLabel>Téléphone</FieldLabel>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-[14px] text-slate-400" />
                  <Input defaultValue="01 64 33 12 45" className="pl-8" />
                </div>
              </div>
              <div>
                <FieldLabel>Site web</FieldLabel>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-[14px] text-slate-400" />
                  <Input defaultValue="https://italianfamily.fr" className="pl-8" />
                </div>
              </div>
            </div>
          </FormCard>

          <FormCard
            title="Adresse & horaires"
            desc="L'adresse et les horaires utilisés dans les réponses générées."
          >
            <div>
              <FieldLabel>Adresse</FieldLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-[14px] text-slate-400" />
                <Input
                  defaultValue="12 rue du Marché, 77100 Meaux"
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <FieldLabel>Horaires d&apos;ouverture</FieldLabel>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                {horaires.map(([d, h], i) => (
                  <div
                    key={d}
                    className={cn(
                      "flex justify-between px-3.5 py-2.5 text-[13px]",
                      i === 0 ? "" : "border-t border-slate-100",
                      i % 2 === 0 ? "bg-white" : "bg-slate-50",
                    )}
                  >
                    <span className="font-medium text-slate-700">{d}</span>
                    <span
                      className={cn(
                        "tabular-nums",
                        h === "Fermé" ? "text-slate-400" : "text-slate-900",
                      )}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FormCard>

          <FormCard
            title="Ton de l'IA"
            desc="Le registre que l'IA utilisera pour répondre à vos clients. Modifiable à tout moment."
          >
            <div className="grid grid-cols-3 gap-2.5">
              {tones.map((t) => {
                const active = tone === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={cn(
                      "p-4 rounded-lg text-left transition-all cursor-pointer",
                      active
                        ? "bg-amber-50 border-[1.5px] border-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.08)]"
                        : "bg-white border border-slate-200 hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={cn(
                          "size-7 rounded-[7px] inline-flex items-center justify-center",
                          active
                            ? "bg-amber-500 text-white"
                            : "bg-slate-100 text-slate-500",
                        )}
                      >
                        <Icon className="size-[14px]" strokeWidth={2.2} />
                      </div>
                      <div
                        className={cn(
                          "size-4 rounded-full inline-flex items-center justify-center",
                          active
                            ? "bg-amber-500"
                            : "border-[1.5px] border-slate-300",
                        )}
                      >
                        {active && (
                          <Check className="size-[10px] text-white" strokeWidth={3.5} />
                        )}
                      </div>
                    </div>
                    <div className="text-[14px] font-semibold text-slate-900">{t.title}</div>
                    <div className="text-[12px] text-slate-500 mt-1 leading-snug">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </FormCard>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}

function FormCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="grid grid-cols-[1fr_1.6fr]">
        <div className="px-7 py-6 border-r border-slate-100">
          <h3 className="text-base tracking-[-0.018em]">{title}</h3>
          <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">{desc}</p>
        </div>
        <div className="px-7 py-6 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
