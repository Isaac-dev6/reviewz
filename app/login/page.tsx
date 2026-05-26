"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {sent ? (
            <Confirmation email={email} onReset={() => setSent(false)} />
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-[22px] font-bold tracking-[-0.018em] text-slate-900">
                  Connexion
                </h1>
                <p className="mt-1.5 text-[14.5px] text-slate-500 leading-relaxed">
                  Entrez votre email, on vous envoie un lien magique.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <FieldLabel>Adresse email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-[14px] text-slate-400" />
                    <Input
                      type="email"
                      placeholder="vous@exemple.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-8"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[13px] text-red-600 leading-snug">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  block
                  disabled={loading || !email}
                >
                  {loading ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[12.5px] text-slate-400">
          Sans mot de passe · Lien sécurisé à usage unique
        </p>
      </div>
    </div>
  );
}

function Confirmation({
  email,
  onReset,
}: {
  email: string;
  onReset: () => void;
}) {
  return (
    <div className="text-center py-2">
      <div className="size-14 rounded-full bg-green-50 border border-green-200 inline-flex items-center justify-center mb-5">
        <Mail className="size-6 text-green-600" strokeWidth={1.8} />
      </div>
      <h2 className="text-[20px] font-bold tracking-[-0.018em] text-slate-900">
        Vérifiez votre boîte mail !
      </h2>
      <p className="mt-2 text-[14px] text-slate-500 leading-relaxed">
        Un lien de connexion a été envoyé à{" "}
        <span className="font-semibold text-slate-700">{email}</span>.
        <br />
        Cliquez dessus pour accéder à votre tableau de bord.
      </p>
      <button
        onClick={onReset}
        className="mt-5 text-[13px] text-slate-400 hover:text-slate-600 underline underline-offset-2"
      >
        Utiliser une autre adresse
      </button>
    </div>
  );
}
