const steps = [
  {
    n: 1,
    t: "Connectez votre fiche Google",
    d: "OAuth en deux clics. Aucun ajout de code, aucune configuration.",
  },
  {
    n: 2,
    t: "Choisissez votre ton",
    d: "Chaleureux, professionnel ou décontracté. L'IA apprend de vos anciennes réponses.",
  },
  {
    n: 3,
    t: "Reviewz prend le relais",
    d: "Brouillons générés en moins de 2 h. Validation requise pour les avis < 3 étoiles.",
  },
];

export function ThreeSteps() {
  return (
    <section className="px-6 lg:px-16 py-16 lg:py-22 bg-slate-50">
      <div className="text-center mb-12 lg:mb-16">
        <span className="eyebrow">3 étapes · 5 minutes</span>
        <h2 className="mt-3 text-4xl lg:text-[48px] tracking-[-0.025em]">
          De zéro à automatisé,
          <br />
          en moins de temps qu&apos;un café.
        </h2>
      </div>
      <div className="relative">
        <div
          className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-0.5 z-0"
          style={{
            backgroundImage: "linear-gradient(to right, #CBD5E1 50%, transparent 50%)",
            backgroundSize: "12px 2px",
            backgroundRepeat: "repeat-x",
          }}
        />
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {steps.map((s) => (
            <div key={s.n} className="text-center flex flex-col items-center relative">
              <div className="size-14 rounded-full bg-amber-500 text-white inline-flex items-center justify-center text-[22px] font-bold shadow-[0_4px_14px_rgba(245,158,11,0.35),0_0_0_6px_#fff,0_0_0_7px_#FDE68A]">
                {s.n}
              </div>
              <h3 className="mt-6 text-[22px] tracking-[-0.018em]">{s.t}</h3>
              <p className="mt-2 text-[16px] text-slate-500 max-w-[320px] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
