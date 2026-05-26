import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { ThreeSteps } from "@/components/landing/three-steps";
import { Pricing } from "@/components/landing/pricing";
import { CaseStudy } from "@/components/landing/case-study";
import { FaqAndCta } from "@/components/landing/faq-cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      <Nav />
      <Hero />
      <ProblemSolution />
      <ThreeSteps />
      <Pricing />
      <CaseStudy />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
