import { Logo } from "@/components/shared/logo";

const cols = [
  { t: "Produit", items: ["Fonctionnalités", "Tarifs", "Intégrations", "Nouveautés"] },
  { t: "Entreprise", items: ["À propos", "Clients", "Carrières", "Contact"] },
  { t: "Ressources", items: ["Blog", "Aide", "Guides", "API"] },
  { t: "Légal", items: ["CGV", "Confidentialité", "Cookies", "RGPD"] },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white/60 px-6 lg:px-16 py-16 lg:py-20">
      <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">
        <div>
          <Logo dark />
          <p className="mt-3.5 text-[13.5px] leading-relaxed max-w-[280px]">
            La gestion des avis Google pilotée par l&apos;IA, pour les commerces qui
            n&apos;ont plus une minute à perdre.
          </p>
          <div className="flex gap-2 mt-4">
            {["LI", "X", "IG"].map((s) => (
              <div
                key={s}
                className="size-8 rounded-[7px] bg-white/5 inline-flex items-center justify-center text-[11px] text-white font-semibold"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.t}>
            <div className="text-[11px] font-bold text-white uppercase tracking-[0.08em] mb-4">
              {col.t}
            </div>
            <div className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[13.5px] text-white/60 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 mt-12 pt-6 flex justify-between flex-wrap gap-3 text-xs">
        <span>© 2026 Reviewz SAS · Paris, France</span>
        <span>Fait avec ★ pour les commerces qui ont autre chose à faire.</span>
      </div>
    </footer>
  );
}
