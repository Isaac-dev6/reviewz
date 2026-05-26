import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <div className="px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:flex gap-7 text-[13.5px] font-medium text-slate-700">
            <Link href="#produit" className="hover:text-slate-900">Produit</Link>
            <Link href="#tarifs" className="hover:text-slate-900">Tarifs</Link>
            <Link href="#cas-clients" className="hover:text-slate-900">Cas clients</Link>
            <Link href="#faq" className="hover:text-slate-900">FAQ</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="link" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button variant="primary" asChild>
            <Link href="/onboarding">Démarrer</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
