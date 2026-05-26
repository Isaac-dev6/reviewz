import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

const before = [
  "Vous perdez des clients à cause d'avis sans réponse.",
  "Répondre prend 30 min par jour, vous n'avez pas le temps.",
  "Une mauvaise note glisse, votre référencement chute.",
  "Vos concurrents répondent à tout, vous décrochez.",
];
const after = [
  "L'IA répond à 100 % des avis, automatiquement.",
  "Votre ton est étudié et reproduit fidèlement.",
  "Alertes intelligentes : seuls les avis critiques arrivent à vous.",
  "Note moyenne et visibilité Google qui remontent en quelques semaines.",
];

export function ProblemSolution() {
  return (
    <section id="produit" className="px-6 lg:px-16 py-16 lg:py-22 bg-white">
      <div className="text-center mb-12 lg:mb-14">
        <span className="eyebrow">Avant / Après</span>
        <h2 className="mt-3 text-4xl lg:text-[48px] tracking-[-0.025em]">
          Ce qui vous bloque <span className="text-amber-500">vs.</span> ce
          qu&apos;on règle.
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6 lg:p-8">
          <Chip variant="neutral" className="h-[26px] px-3">
            Avant Reviewz
          </Chip>
          <ul className="mt-5 space-y-3.5">
            {before.map((t, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 w-[22px] h-[22px] rounded-full bg-red-100 text-red-700 inline-flex items-center justify-center flex-shrink-0">
                  <X className="size-3" strokeWidth={2.6} />
                </span>
                <span className="text-[16px] text-slate-700 leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card featured className="p-6 lg:p-8">
          <Chip variant="amber" className="h-[26px] px-3">
            Avec Reviewz
          </Chip>
          <ul className="mt-5 space-y-3.5">
            {after.map((t, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 w-[22px] h-[22px] rounded-full bg-green-100 text-green-700 inline-flex items-center justify-center flex-shrink-0">
                  <Check className="size-3" strokeWidth={2.6} />
                </span>
                <span className="text-[16px] text-slate-900 font-medium leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
