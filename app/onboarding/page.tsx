"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  LogOut,
  MapPin,
  MessageSquare,
  Sparkles,
  Store,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel, Select } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, label: "Bienvenue" },
  { n: 2, label: "Établissement" },
  { n: 3, label: "Ton de réponse" },
  { n: 4, label: "Motivation" },
  { n: 5, label: "Connexion Google" },
];

const TONES = [
  { id: "chaleureux", title: "Chaleureux", desc: "Convivial, attentif, avec une touche personnelle.", icon: Sparkles },
  { id: "professionnel", title: "Professionnel", desc: "Sobre, courtois, factuel et bienveillant.", icon: Store },
  { id: "décontracté", title: "Décontracté", desc: "Direct, complice, ton du quotidien.", icon: User },
  { id: "traditionnel", title: "Traditionnel", desc: "Classique, formel et respectueux.", icon: Store },
];

interface FormData {
  nom: string;
  type: string;
  ville: string;
  ton: string;
  prenom_patron: string;
  differentiation: string;
  note_google: string;
  avis_sans_reponse: string;
  pourquoi_reviewz: string;
  source: string;
}

function isStepValid(step: number, form: FormData): boolean {
  switch (step) {
    case 2:
      return !!(
        form.prenom_patron.trim() &&
        form.nom.trim() &&
        form.type &&
        form.ville.trim() &&
        form.differentiation.trim()
      );
    case 3:
      return !!(form.ton && form.note_google && form.avis_sans_reponse);
    case 4:
      return !!(form.pourquoi_reviewz.trim() && form.source);
    default:
      return true;
  }
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    nom: "",
    type: "restaurant",
    ville: "",
    ton: "chaleureux",
    prenom_patron: "",
    differentiation: "",
    note_google: "4",
    avis_sans_reponse: "0-10",
    pourquoi_reviewz: "",
    source: "bouche_a_oreille",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleContinue() {
    if (!isStepValid(step, form)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => s + 1);
  }

  async function handleFinish() {
    setError(null);
    setLoading(true);
    try {
      localStorage.setItem("onboarding_data", JSON.stringify(form));
      router.push("/paiement");
    } catch {
      setError("Une erreur est survenue, réessayez.");
      setLoading(false);
    }
  }

  const stepState = (n: number) => {
    if (n < step) return "done";
    if (n === step) return "active";
    return "pending";
  };

  const valid = isStepValid(step, form);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="flex justify-between items-center px-8 py-5 border-b border-slate-200 bg-white">
        <Logo />
        <div className="flex items-center gap-5 text-base text-slate-500">
          <span className="inline-flex items-center gap-2 cursor-pointer hover:text-slate-700">
            <HelpCircle className="size-5" />
            Besoin d&apos;aide ?
          </span>
          <span className="w-px h-5 bg-slate-200" />
          <span className="inline-flex items-center gap-2 cursor-pointer hover:text-slate-700">
            <LogOut className="size-5" />
            Se déconnecter
          </span>
        </div>
      </header>

      {/* Stepper */}
      <div className="px-8 pt-10 pb-6">
        <div className="flex items-start justify-center w-full max-w-3xl min-w-[70vw] mx-auto px-2">
          {STEPS.map((s, i) => {
            const state = stepState(s.n);
            return (
              <div key={s.n} className="contents">
                <div className="flex flex-col items-center gap-2.5 flex-shrink-0">
                  <div
                    className={cn(
                      "size-11 rounded-full inline-flex items-center justify-center font-bold text-base transition-all",
                      state === "done" || state === "active"
                        ? "bg-amber-500 text-white"
                        : "bg-white border-2 border-slate-300 text-slate-400",
                      state === "active" && "shadow-[0_0_0_5px_#FEF3C7]",
                    )}
                  >
                    {state === "done" ? <Check className="size-5" strokeWidth={3} /> : s.n}
                  </div>
                  <span
                    className={cn(
                      "text-sm",
                      state === "active" ? "text-slate-900 font-semibold" : "text-slate-500 font-medium",
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-[2px] mt-5 mx-2",
                      stepState(s.n) === "done" ? "bg-amber-500" : "bg-slate-300",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex justify-center w-full px-4 pb-12">
        <div className="w-full max-w-3xl min-w-[70vw] bg-white rounded-[14px] shadow-md border border-slate-200 p-12">
          {step === 1 && <StepBienvenue />}
          {step === 2 && <StepEtablissement form={form} set={set} showErrors={showErrors} />}
          {step === 3 && <StepTon form={form} set={set} showErrors={showErrors} />}
          {step === 4 && <StepMotivation form={form} set={set} showErrors={showErrors} />}
          {step === 5 && <StepGoogle />}
          {error && <p className="mt-6 text-lg text-red-600 text-center">{error}</p>}
        </div>
      </div>

      {/* Footer nav */}
      <footer className="border-t border-slate-200 bg-white px-8 py-5 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => { setShowErrors(false); setStep((s) => s - 1); }}
          disabled={step === 1}
          className="text-lg px-7 py-4 h-auto"
        >
          <ChevronLeft className="size-5" />
          Retour
        </Button>
        <div className="text-base text-slate-500 font-medium">
          Étape {step} sur {STEPS.length}
        </div>
        {step < STEPS.length ? (
          <button
            onClick={handleContinue}
            className={cn(
              "inline-flex items-center gap-2 rounded-md font-semibold text-lg px-7 py-4 transition-colors",
              "bg-amber-500 text-white border border-amber-500",
              valid
                ? "hover:bg-amber-600 hover:border-amber-600 cursor-pointer"
                : "opacity-50 cursor-not-allowed",
            )}
          >
            Continuer
            <ChevronRight className="size-5" />
          </button>
        ) : (
          <Button
            variant="primary"
            onClick={handleFinish}
            disabled={loading}
            className="text-lg px-7 py-4 h-auto"
          >
            {loading ? "Enregistrement…" : "Terminer"}
            {!loading && <Check className="size-5" />}
          </Button>
        )}
      </footer>
    </div>
  );
}

function FieldError({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="mt-1.5 text-sm text-red-500 font-medium">Ce champ est obligatoire</p>;
}

function StepBienvenue() {
  return (
    <div className="text-center py-6">
      <div className="size-20 rounded-2xl bg-amber-500 inline-flex items-center justify-center shadow-[0_6px_18px_rgba(245,158,11,0.35)] mb-7">
        <Sparkles className="size-10 text-white" />
      </div>
      <h1 className="text-5xl tracking-[-0.025em] font-bold">Bienvenue sur Reviewz</h1>
      <p className="mt-4 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
        En 3 minutes, on configure votre espace et l&apos;IA commence à répondre à vos avis Google automatiquement.
      </p>
      <div className="mt-10 flex flex-col gap-5 text-left max-w-lg mx-auto">
        {[
          "Informations sur votre établissement",
          "Choix du ton de vos réponses",
          "Connexion à votre fiche Google",
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-4 text-xl text-slate-700">
            <span className="size-8 rounded-full bg-amber-100 text-amber-600 inline-flex items-center justify-center font-bold text-base flex-shrink-0">
              {i + 1}
            </span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepEtablissement({
  form, set, showErrors,
}: {
  form: FormData;
  set: (f: keyof FormData, v: string) => void;
  showErrors: boolean;
}) {
  return (
    <>
      <div className="text-sm font-semibold text-amber-600 uppercase tracking-[0.08em] mb-2">Étape 2 sur 5</div>
      <h1 className="text-5xl tracking-[-0.025em] font-bold">Votre établissement</h1>
      <p className="mt-3 text-xl text-slate-500 leading-relaxed">
        Ces informations permettent à l&apos;IA d&apos;adapter ses réponses à votre activité.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Prénom du patron / gérante
          </FieldLabel>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              placeholder="Ex : Sophie"
              value={form.prenom_patron}
              onChange={(e) => set("prenom_patron", e.target.value)}
              className={cn("text-lg h-14 pl-11", showErrors && !form.prenom_patron.trim() && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
            />
          </div>
          <FieldError show={showErrors && !form.prenom_patron.trim()} />
        </div>

        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Nom de l&apos;établissement
          </FieldLabel>
          <Input
            placeholder="Ex : Italian Family"
            value={form.nom}
            onChange={(e) => set("nom", e.target.value)}
            className={cn("text-lg h-14", showErrors && !form.nom.trim() && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
          />
          <FieldError show={showErrors && !form.nom.trim()} />
        </div>

        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Type d&apos;activité
          </FieldLabel>
          <Select value={form.type} onChange={(e) => set("type", e.target.value)} className="text-lg h-14">
            <option value="restaurant">Restaurant</option>
            <option value="salon">Salon de coiffure / beauté</option>
            <option value="médical">Cabinet médical / dentaire</option>
            <option value="garage">Garage automobile</option>
            <option value="auto-école">Auto-école</option>
            <option value="autre">Autre</option>
          </Select>
        </div>

        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Ville
          </FieldLabel>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              placeholder="Ex : Meaux"
              value={form.ville}
              onChange={(e) => set("ville", e.target.value)}
              className={cn("text-lg h-14 pl-11", showErrors && !form.ville.trim() && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
            />
          </div>
          <FieldError show={showErrors && !form.ville.trim()} />
        </div>

        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Qu&apos;est-ce qui rend votre établissement unique ?
          </FieldLabel>
          <Input
            placeholder="Ex : Cuisine italienne familiale depuis 3 générations"
            value={form.differentiation}
            onChange={(e) => set("differentiation", e.target.value)}
            className={cn("text-lg h-14", showErrors && !form.differentiation.trim() && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
          />
          <FieldError show={showErrors && !form.differentiation.trim()} />
        </div>
      </div>
    </>
  );
}

function StepTon({
  form, set, showErrors,
}: {
  form: FormData;
  set: (f: keyof FormData, v: string) => void;
  showErrors: boolean;
}) {
  return (
    <>
      <div className="text-sm font-semibold text-amber-600 uppercase tracking-[0.08em] mb-2">Étape 3 sur 5</div>
      <h1 className="text-5xl tracking-[-0.025em] font-bold">Ton de vos réponses</h1>
      <p className="mt-3 text-xl text-slate-500 leading-relaxed">
        L&apos;IA reproduira ce registre dans chaque réponse. Modifiable à tout moment.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {TONES.map((t) => {
          const active = form.ton === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => set("ton", t.id)}
              className={cn(
                "p-6 rounded-xl text-left transition-all cursor-pointer",
                active
                  ? "bg-amber-50 border-[1.5px] border-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.08)]"
                  : "bg-white border border-slate-200 hover:border-slate-300",
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("size-10 rounded-[9px] inline-flex items-center justify-center", active ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500")}>
                  <Icon className="size-5" strokeWidth={2.2} />
                </div>
                <div className={cn("size-5 rounded-full inline-flex items-center justify-center", active ? "bg-amber-500" : "border-2 border-slate-300")}>
                  {active && <Check className="size-3 text-white" strokeWidth={3.5} />}
                </div>
              </div>
              <div className="text-xl font-semibold text-slate-900">{t.title}</div>
              <div className="text-base text-slate-500 mt-1 leading-snug">{t.desc}</div>
            </button>
          );
        })}
      </div>
      <FieldError show={showErrors && !form.ton} />

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Votre note Google actuelle
          </FieldLabel>
          <Select value={form.note_google} onChange={(e) => set("note_google", e.target.value)} className="text-lg h-14">
            <option value="1">⭐ 1 étoile</option>
            <option value="2">⭐⭐ 2 étoiles</option>
            <option value="3">⭐⭐⭐ 3 étoiles</option>
            <option value="4">⭐⭐⭐⭐ 4 étoiles</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 étoiles</option>
          </Select>
          <FieldError show={showErrors && !form.note_google} />
        </div>
        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Avis sans réponse actuellement
          </FieldLabel>
          <Select value={form.avis_sans_reponse} onChange={(e) => set("avis_sans_reponse", e.target.value)} className="text-lg h-14">
            <option value="0-10">0 – 10</option>
            <option value="10-30">10 – 30</option>
            <option value="30-100">30 – 100</option>
            <option value="100+">Plus de 100</option>
          </Select>
          <FieldError show={showErrors && !form.avis_sans_reponse} />
        </div>
      </div>
    </>
  );
}

function StepMotivation({
  form, set, showErrors,
}: {
  form: FormData;
  set: (f: keyof FormData, v: string) => void;
  showErrors: boolean;
}) {
  return (
    <>
      <div className="text-sm font-semibold text-amber-600 uppercase tracking-[0.08em] mb-2">Étape 4 sur 5</div>
      <h1 className="text-5xl tracking-[-0.025em] font-bold">Dernière étape avant de commencer</h1>
      <p className="mt-3 text-xl text-slate-500 leading-relaxed">
        Ces informations nous aident à mieux vous accompagner dès le départ.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Pourquoi avoir choisi Reviewz ?
          </FieldLabel>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              placeholder="Ex : Je n'ai pas le temps de répondre à mes avis"
              value={form.pourquoi_reviewz}
              onChange={(e) => set("pourquoi_reviewz", e.target.value)}
              className={cn("text-lg h-14 pl-11", showErrors && !form.pourquoi_reviewz.trim() && "border-red-400 focus:border-red-400 focus:ring-red-400/15")}
            />
          </div>
          <FieldError show={showErrors && !form.pourquoi_reviewz.trim()} />
        </div>

        <div>
          <FieldLabel className="text-lg normal-case tracking-normal font-semibold text-slate-700 mb-2">
            Comment avez-vous entendu parler de nous ?
          </FieldLabel>
          <Select value={form.source} onChange={(e) => set("source", e.target.value)} className="text-lg h-14">
            <option value="bouche_a_oreille">Bouche à oreille</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="prospection">Prospection téléphonique</option>
            <option value="google">Google</option>
            <option value="autre">Autre</option>
          </Select>
          <FieldError show={showErrors && !form.source} />
        </div>
      </div>
    </>
  );
}

function StepGoogle() {
  return (
    <div className="text-center py-6">
      <div className="size-20 rounded-2xl bg-slate-100 inline-flex items-center justify-center mb-7">
        <svg viewBox="0 0 24 24" className="size-11">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>
      <h1 className="text-5xl tracking-[-0.025em] font-bold">Connectez votre fiche Google</h1>
      <p className="mt-4 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
        Reviewz accède à vos avis en lecture pour générer les réponses. Aucune modification n&apos;est publiée sans votre accord pour les avis critiques.
      </p>
      <div className="mt-10 border border-slate-200 rounded-xl p-7 text-left flex flex-col gap-5">
        {[
          "Lecture de vos avis Google Business",
          "Publication des réponses validées par l'IA",
          "Aucun accès à vos données de paiement",
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-4 text-xl text-slate-700">
            <Check className="size-6 text-green-600 flex-shrink-0" strokeWidth={2.5} />
            {t}
          </div>
        ))}
      </div>
      <p className="mt-5 text-base text-slate-400">
        La connexion OAuth se fera dans votre espace après l&apos;inscription.
      </p>
    </div>
  );
}
