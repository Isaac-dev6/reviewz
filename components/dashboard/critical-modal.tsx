"use client";

import { ArrowRight, Edit3, Flag, RefreshCw, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Stars } from "@/components/shared/stars";
import { Avatar } from "@/components/shared/avatar";

export function CriticalModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        aria-label="Fermer"
        className="absolute inset-0 bg-slate-900/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[640px] bg-white rounded-[14px] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-200">
          <Chip variant="red" dot>
            <Flag className="size-3" strokeWidth={2.4} />
            Avis critique
          </Chip>
          <span className="text-[12.5px] text-slate-500">
            Reçu il y a 12 min · Validation requise
          </span>
          <button
            onClick={onClose}
            className="ml-auto size-[30px] rounded-md hover:bg-slate-100 text-slate-500 inline-flex items-center justify-center cursor-pointer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="bg-red-50 border border-red-100 rounded-[10px] p-4">
            <div className="flex items-center gap-2.5">
              <Avatar initials="TR" size={36} bg="#DC2626" color="#fff" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Thomas R.</span>
                  <Stars value={1} size={13} />
                  <Chip variant="red" className="h-5 text-[11px]">
                    1 étoile
                  </Chip>
                </div>
                <div className="text-[11.5px] text-slate-500 mt-0.5">
                  il y a 12 min · via Google
                </div>
              </div>
            </div>
            <p className="mt-3 text-[13.5px] text-slate-700 leading-relaxed">
              Service très long, j&apos;ai attendu 25 minutes pour un simple café.
              La serveuse semblait débordée et peu aimable. Décevant pour un
              établissement avec autant d&apos;avis positifs — je m&apos;attendais à
              beaucoup mieux.
            </p>
          </div>

          <div className="bg-amber-50 border-[1.5px] border-amber-200 rounded-[10px] overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-amber-200">
              <span className="w-[22px] h-[22px] rounded-md bg-amber-500 inline-flex items-center justify-center">
                <Sparkles className="size-3 text-white" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.06em] text-amber-700 uppercase">
                Brouillon IA · Ton bienveillant
              </span>
              <div className="ml-auto flex items-center gap-2.5">
                <span className="text-[11.5px] text-amber-700">
                  Confiance <strong className="font-bold">92%</strong>
                </span>
                <button className="inline-flex items-center gap-1 px-2 py-1 border border-amber-300 bg-white rounded-md text-amber-700 text-[11.5px] font-semibold cursor-pointer">
                  <RefreshCw className="size-3" strokeWidth={2.4} />
                  Régénérer
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-[13.5px] text-slate-900 leading-relaxed whitespace-pre-line">
                {`Bonjour Thomas,\n\nNous sommes sincèrement désolés que votre visite n'ait pas été à la hauteur. Une attente de 25 minutes n'est pas acceptable, et nous vous présentons nos excuses pour le manque d'amabilité ressenti — ce n'est pas l'expérience que nous voulons offrir.\n\nNotre équipe a été briefée et nous serions ravis de vous accueillir à nouveau pour vous montrer notre établissement sous son meilleur jour. N'hésitez pas à nous écrire en privé.`}
              </p>
              <div className="flex gap-1.5 mt-3.5 flex-wrap">
                {["+ Geste commercial", "+ Inviter à revenir", "+ Excuses renforcées"].map((c) => (
                  <button
                    key={c}
                    className="px-2.5 py-1 rounded-[14px] border border-amber-300 bg-white text-amber-700 text-[12px] font-medium cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <Button variant="ghost" onClick={onClose}>
            Ignorer
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost">
              <Edit3 className="size-4" />
              Modifier
            </Button>
            <Button>
              Publier la réponse
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
