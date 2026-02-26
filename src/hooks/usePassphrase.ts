"use client";

import { useState, useCallback, useEffect } from "react";
import { generatePassphrase } from "@/lib/generate";
import { WORD_COUNT_DEFAULT, WORDLIST_DEFAULT } from "@/lib/constants";
import type {
  PassphraseConfig,
  PassphraseResult,
  SeparatorOption,
  WordlistType,
} from "@/types";

export function usePassphrase() {
  const [config, setConfig] = useState<PassphraseConfig>({
    wordCount: WORD_COUNT_DEFAULT,
    capitalize: false,
    includeNumbers: false,
    separator: "~",
    wordlistType: WORDLIST_DEFAULT,
  });

  const [result, setResult] = useState<PassphraseResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isWordlistLoading, setIsWordlistLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const passphrase = await generatePassphrase(config);
      setResult(passphrase);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsGenerating(false);
      setIsWordlistLoading(false);
    }
  }, [config]);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setWordCount = (count: number) =>
    setConfig((prev) => ({ ...prev, wordCount: count }));
  const setCapitalize = (value: boolean) =>
    setConfig((prev) => ({ ...prev, capitalize: value }));
  const setIncludeNumbers = (value: boolean) =>
    setConfig((prev) => ({ ...prev, includeNumbers: value }));
  const setSeparator = (value: SeparatorOption) =>
    setConfig((prev) => ({ ...prev, separator: value }));
  const setWordlistType = (value: WordlistType) =>
    setConfig((prev) => ({ ...prev, wordlistType: value }));

  return {
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
  };
}
