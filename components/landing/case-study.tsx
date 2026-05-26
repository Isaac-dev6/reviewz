import { Avatar } from "@/components/shared/avatar";

const kpis = [
  { v: "4,8 / 5", l: "Note Google", s: "depuis 3,9" },
  { v: "+312 %", l: "Avis collectés", s: "sur 6 mois" },
  { v: "6 h / sem", l: "Temps gagné", s: "par la gérante" },
  { v: "< 2 h", l: "Délai de réponse", s: "moyen" },
];

export function CaseStudy() {
  return (
    <section
      id="cas-clients"
      className="px-6 lg:px-16 py-16 lg:py-22 bg-slate-900 text-white"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-400">
        Cas client · Italian Family, Meaux
      </span>
      <h2 className="mt-3.5 text-3xl lg:text-[46px] tracking-[-0.025em] text-white max-w-[780px]">
        Comment une trattoria de quartier
        <br />a repris la main sur sa réputation.
      </h2>
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
        {kpis.map((k, i) => (
          <div key={i}>
            <div className="text-[28px] lg:text-[40px] font-extrabold tracking-[-0.03em] text-white">
              {k.v}
            </div>
            <div className="mt-1 text-[13px] text-white/60">{k.l}</div>
            <div className="text-[11.5px] text-amber-400 mt-0.5">{k.s}</div>
          </div>
        ))}
      </div>
      <div className="h-px bg-white/10 my-10 lg:my-14" />
      <div className="grid lg:grid-cols-[3fr_1fr] gap-8 items-center">
        <blockquote className="m-0 text-xl lg:text-[26px] leading-snug text-white font-medium tracking-[-0.015em] text-balance">
          <span className="text-amber-400 text-[1.2em] mr-1">«</span>
          Plus jamais une seule minute à rédiger une réponse. L&apos;IA capte
          notre ton parfaitement — les clients pensent que c&apos;est nous qui
          répondons.
          <span className="text-amber-400 text-[1.2em] ml-1">»</span>
        </blockquote>
        <div className="flex items-center gap-3.5">
          <Avatar initials="GR" size={48} bg="#92400E" color="#fff" />
          <div>
            <div className="font-semibold text-white">Giulia Romano</div>
            <div className="text-[12.5px] text-white/55">
              Gérante, Italian Family · Meaux
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
