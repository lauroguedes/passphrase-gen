"use client";

import { useRef } from "react";
import { usePassphrase } from "@/hooks/usePassphrase";
import { useClipboard } from "@/hooks/useClipboard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Toast } from "@/components/ui/Toast";
import { PassphraseDisplay } from "./PassphraseDisplay";
import { WordCountStepper } from "./WordCountStepper";
import { WordlistSelector } from "./WordlistSelector";
import { OptionSwitches } from "./OptionSwitches";
import { SeparatorSelector } from "./SeparatorSelector";
import { GenerateButton } from "./GenerateButton";
import { CopyButton } from "./CopyButton";
import { Loader2, Settings } from "lucide-react";

export function PassphraseGenerator() {
  const {
    config,
    result,
    isGenerating,
    isWordlistLoading,
    error,
    generate,
    setWordCount,
    setCapitalize,
    setIncludeNumbers,
    setSeparator,
    setWordlistType,
  } = usePassphrase();

  const { copied, copiedText, copy } = useClipboard();
  const generationCounter = useRef(0);

  const handleGenerate = () => {
    generationCounter.current += 1;
    generate();
  };

  const currentFormatted = result
    ? result.words.map(({ display }) => display).join(config.separator)
    : "";

  const handleCopy = () => {
    if (result) {
      copy(currentFormatted);
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
        {/* Left Panel — Settings */}
        <GlassCard className="p-5 md:w-72 flex-shrink-0">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={16} className="text-slate-400" />
            <span className="text-xs font-display font-bold text-slate-400 uppercase tracking-wider">
              Settings
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <WordlistSelector
              selected={config.wordlistType}
              onChange={setWordlistType}
            />

            <div className="h-px bg-slate-200/60" />

            <WordCountStepper
              count={config.wordCount}
              onChange={setWordCount}
            />

            <div className="h-px bg-slate-200/60" />

            <SeparatorSelector
              selected={config.separator}
              onChange={setSeparator}
            />

            <div className="h-px bg-slate-200/60" />

            <OptionSwitches
              capitalize={config.capitalize}
              includeNumbers={config.includeNumbers}
              onCapitalizeChange={setCapitalize}
              onIncludeNumbersChange={setIncludeNumbers}
            />
          </div>
        </GlassCard>

        {/* Right Panel — Passphrase Output */}
        <GlassCard className="p-6 md:p-10 flex-1 flex flex-col justify-center">
          {isWordlistLoading && !result ? (
            <div className="min-h-[120px] flex items-center justify-center">
              <Loader2 size={32} className="animate-spin text-indigo-400" />
            </div>
          ) : error ? (
            <div className="min-h-[120px] flex flex-col items-center justify-center gap-3">
              <p className="text-red-500 font-body text-sm">{error}</p>
              <button
                onClick={handleGenerate}
                className="text-indigo-500 font-body text-sm underline hover:text-indigo-600"
              >
                Try again
              </button>
            </div>
          ) : result ? (
            <PassphraseDisplay
              words={result.words}
              separator={config.separator}
              generationKey={generationCounter.current}
            />
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <GenerateButton
              onClick={handleGenerate}
              isGenerating={isGenerating}
            />
            {result && <CopyButton copied={copied} onCopy={handleCopy} />}
          </div>
        </GlassCard>
      </div>

      {/* Toast Notification */}
      <Toast show={copied} text={copiedText} />
    </>
  );
}
