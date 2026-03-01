"use client";

import { usePassphrase } from "@/hooks/usePassphrase";
import { PassphraseGenerator } from "./PassphraseGenerator";
import { EntropyStats } from "@/components/EntropyStats";

export function PassphraseSection() {
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
    setIncludeSymbols,
    setIncludeEmojis,
    setSeparator,
    setWordlistType,
    setLanguage,
  } = usePassphrase();

  return (
    <>
      <PassphraseGenerator
        config={config}
        result={result}
        isGenerating={isGenerating}
        isWordlistLoading={isWordlistLoading}
        error={error}
        generate={generate}
        setWordCount={setWordCount}
        setCapitalize={setCapitalize}
        setIncludeNumbers={setIncludeNumbers}
        setIncludeSymbols={setIncludeSymbols}
        setIncludeEmojis={setIncludeEmojis}
        setSeparator={setSeparator}
        setWordlistType={setWordlistType}
        setLanguage={setLanguage}
      />

      <div className="mt-8">
        <EntropyStats
          wordCount={config.wordCount}
          wordlistType={config.wordlistType}
          includeNumbers={config.includeNumbers}
          includeSymbols={config.includeSymbols}
          includeEmojis={config.includeEmojis}
        />
      </div>
    </>
  );
}
