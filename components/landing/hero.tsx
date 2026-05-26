import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Stars } from "@/components/shared/stars";
import { AvatarStack } from "@/components/shared/avatar";
import { HeroPreviewCard } from "./hero-preview-card";

export function Hero() {
  return (
    <section className="relative px-6 lg:px-16 py-16 lg:py-20 bg-gradient-to-b from-amber-50/40 to-white">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <Chip variant="amber" dot className="h-[26px] px-3 text-[12px]">
            Nouveau · IA conversationnelle
          </Chip>
          <h1 className="mt-4 text-5xl lg:text-[68px] leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.028em] text-balance">
            Plus d&apos;avis. Mieux notés.
            <br />
            <span className="text-slate-500">Sans y passer vos soirées.</span>
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-slate-500 max-w-[580px] leading-relaxed">
            Reviewz capte chaque nouvel avis Google, rédige la réponse dans
            votre ton et la publie — pour vous. Vous reprenez la main quand un
            avis demande votre attention.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Button size="lg" asChild>
              <a href="/onboarding">Démarrer maintenant</a>
            </Button>
            <Button variant="ghost" size="lg">
              Voir la démo
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[12.5px] text-slate-500">
            <Check className="size-[13px] text-green-700" strokeWidth={2.6} />
            Sans engagement · Annulation en 1 clic
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <AvatarStack
              avatars={[
                { initials: "A", bg: "#FCA5A5" },
                { initials: "B", bg: "#93C5FD" },
                { initials: "C", bg: "#86EFAC" },
                { initials: "D", bg: "#FCD34D" },
              ]}
              size={30}
            />
            <div className="flex items-center gap-2">
              <Stars value={5} size={14} />
              <span className="text-[13px] text-slate-700 font-medium">
                <strong className="text-slate-900 font-bold">320+</strong>{" "}
                commerces nous font confiance
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_60%_50%,rgba(245,158,11,0.12),transparent_60%)] blur-2xl" />
          <HeroPreviewCard />
        </div>
      </div>
    </section>
  );
}
