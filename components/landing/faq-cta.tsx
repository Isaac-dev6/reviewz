"use client";

import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "Comment Reviewz apprend-il mon ton ?",
    a: "L'IA analyse vos 50 dernières réponses pour reproduire votre style, votre vocabulaire et votre niveau de formalité.",
    open: true,
  },
  { q: "Que se passe-t-il en cas d'avis 1 ou 2 étoiles ?" },
  { q: "Puis-je relire avant que la réponse soit publiée ?" },
  { q: "L'IA peut-elle gérer plusieurs langues ?" },
  { q: "Que se passe-t-il si j'annule ?" },
];

export function FaqAndCta() {
  return (
    <section id="faq" className="px-6 lg:px-16 py-16 lg:py-22 bg-white">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="mt-3 text-[32px] lg:text-[44px] tracking-[-0.025em]">
            Tout ce qu&apos;on nous demande
            <br />
            avant de signer.
          </h2>
          <div className="mt-7">
            {faqs.map((f, i) => (
              <details
                key={i}
                open={f.open}
                className={`py-5 border-b border-slate-200 ${i === 0 ? "border-t" : ""} group`}
              >
                <summary className="flex justify-between items-center cursor-pointer list-none text-[17px] font-semibold text-slate-900">
                  {f.q}
                  <span className="size-6 rounded-full bg-slate-100 text-slate-700 inline-flex items-center justify-center flex-shrink-0 ml-3 group-open:rotate-45 transition-transform">
                    <Plus className="size-[13px]" strokeWidth={2.4} />
                  </span>
                </summary>
                {f.a && (
                  <p className="mt-3 text-slate-500 text-[16px] leading-relaxed max-w-[90%]">
                    {f.a}
                  </p>
                )}
              </details>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-[14px] p-7 lg:p-9 lg:sticky lg:top-24">
          <div className="size-11 rounded-[10px] bg-amber-500 inline-flex items-center justify-center shadow-[0_6px_18px_rgba(245,158,11,0.35)]">
            <Sparkles className="size-[22px] text-white" />
          </div>
          <h3 className="mt-4 text-[22px] tracking-[-0.022em]">
            Prêt à reprendre la main sur vos avis ?
          </h3>
          <p className="mt-2.5 text-[14.5px] text-slate-500 leading-relaxed">
            Connectez votre fiche Google en 2 minutes. Aucune carte bancaire
            requise pour l&apos;inscription.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button block asChild>
              <a href="#tarifs">
                Démarrer maintenant
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button variant="ghost" block>
              Parler à un humain
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-slate-500 text-center">
            Sans engagement · Annulation en 1 clic
          </p>
        </div>
      </div>
    </section>
  );
}
