import { Sparkles, TrendingUp } from "lucide-react";
import { Stars } from "@/components/shared/stars";
import { Avatar } from "@/components/shared/avatar";

const reviews = [
  {
    name: "Léa M.",
    rating: 5,
    text: "Service impeccable, je recommande vivement !",
    when: "il y a 12 min",
    reply: "Merci infiniment Léa, c'est un plaisir de vous accueillir.",
    bg: "#FCA5A5",
  },
  {
    name: "Hugo D.",
    rating: 4,
    text: "Très bon accueil, ambiance chaleureuse.",
    when: "il y a 1 h",
    reply: "Merci Hugo ! Au plaisir de vous revoir bientôt.",
    bg: "#93C5FD",
  },
  {
    name: "Sarah B.",
    rating: 5,
    text: "Une adresse à recommander absolument.",
    when: "il y a 2 h",
    reply: "Merci Sarah pour ces mots, à très vite.",
    bg: "#86EFAC",
  },
];

export function HeroPreviewCard() {
  return (
    <div className="rounded-[14px] border border-slate-200 shadow-lg overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-slate-200 bg-slate-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
        <div className="flex-1 text-center text-[11.5px] text-slate-500 font-medium">
          app.reviewz.fr
        </div>
      </div>
      <div className="grid grid-cols-2 border-b border-slate-200">
        <div className="px-[18px] py-3.5 border-r border-slate-200">
          <div className="eyebrow-muted text-[10px]">Note Google</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[26px] font-bold tracking-tight">4,8</span>
            <span className="text-slate-500 text-[13px]">/ 5</span>
            <Stars value={5} size={12} />
          </div>
        </div>
        <div className="px-[18px] py-3.5">
          <div className="eyebrow-muted text-[10px]">Avis ce mois</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[26px] font-bold tracking-tight">+47</span>
            <span className="text-[11.5px] font-semibold text-green-700 inline-flex items-center gap-0.5">
              <TrendingUp className="size-[10px]" strokeWidth={3} />
              +28%
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`px-4 py-3 ${i < 2 ? "border-b border-slate-200" : ""}`}
          >
            <div className="flex items-center gap-2.5">
              <Avatar initials={r.name[0]} size={26} bg={r.bg} />
              <span className="font-semibold text-[13px]">{r.name}</span>
              <Stars value={r.rating} size={11} />
              <span className="ml-auto text-[11px] text-slate-500">{r.when}</span>
            </div>
            <p className="mt-1 ml-9 text-[12.5px] text-slate-700 leading-snug">{r.text}</p>
            <div className="mt-2 ml-9 rounded-[7px] border border-amber-200 bg-amber-50 px-2.5 py-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-3.5 h-3.5 rounded-[3.5px] bg-amber-500 inline-flex items-center justify-center">
                  <Sparkles className="size-[9px] text-white" />
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[0.06em] text-amber-700">
                  Réponse IA
                </span>
              </div>
              <p className="text-[11.5px] text-slate-700 leading-snug">{r.reply}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
