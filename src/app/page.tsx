import { PassphraseSection } from "@/components/generator/PassphraseSection";
import { WhyRandomPassphrases } from "@/components/educational/WhyRandomPassphrases";
import { BestPractices } from "@/components/educational/BestPractices";
import { EffResearchSummary } from "@/components/educational/EffResearchSummary";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background decorations — page-wide */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-indigo-200/40 via-indigo-100/20 to-transparent dark:from-indigo-500/[0.15] dark:via-indigo-400/[0.08] dark:to-transparent blur-3xl" />
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-mint-200/30 to-transparent dark:from-mint-500/[0.12] dark:to-transparent blur-3xl" />
        <div className="absolute top-10 -right-20 w-[350px] h-[350px] rounded-full bg-gradient-to-l from-indigo-300/20 to-transparent dark:from-indigo-400/[0.10] dark:to-transparent blur-3xl" />
      </div>

      {/* Hero Section */}
      <HeroSection />

      <div className="px-4 max-w-4xl mx-auto">

      {/* Generator + Entropy Stats */}
      <PassphraseSection />

      {/* Educational Sections */}
      <div className="mt-24 space-y-16 md:space-y-24">
        <WhyRandomPassphrases />
        <BestPractices />
        <EffResearchSummary />
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-slate-400 font-body pb-8 space-y-3">
        <p>
          Created by{" "}
          <a
            href="https://lauroguedes.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-500 underline underline-offset-2"
          >
            artisan Lauro Guedes
          </a>
        </p>
        <p>
          Built with the{" "}
          <a
            href="https://www.eff.org/dice"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-500 underline underline-offset-2"
          >
            EFF Large Wordlist
          </a>
          . No data leaves your browser.
        </p>
        <p>
          All randomness generated locally via{" "}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            crypto.getRandomValues()
          </code>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs text-slate-400 dark:text-slate-500">
          <a
            href="https://diceware.rempe.us/#eff"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Inspired by Glenn Rempe&apos;s Diceware
          </a>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <a
            href="https://theworld.com/~reinhold/diceware.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Diceware&trade; by Arnold G. Reinhold
          </a>
        </div>
      </footer>
      </div>
    </main>
  );
}
