import { getWordlist } from "./wordlist";
import { WORDLISTS } from "./constants";
import type { GeneratedWord, PassphraseConfig, PassphraseResult } from "@/types";

/**
 * Generate a single unbiased random die value (1-6) using rejection sampling.
 * Values 0-251 map cleanly to 1-6 (252/6 = 42 exactly).
 * Values 252-255 are rejected to avoid modulo bias (~1.6% rejection rate).
 */
function rollDie(): number {
  const arr = new Uint8Array(1);
  for (;;) {
    crypto.getRandomValues(arr);
    if (arr[0] < 252) {
      return (arr[0] % 6) + 1;
    }
  }
}

function rollDice(count: number): string {
  return Array.from({ length: count }, () => rollDie()).join("");
}

function randomDigit(): number {
  const arr = new Uint8Array(1);
  for (;;) {
    crypto.getRandomValues(arr);
    if (arr[0] < 250) {
      return arr[0] % 10;
    }
  }
}

export async function generatePassphrase(
  config: PassphraseConfig
): Promise<PassphraseResult> {
  const wordlistMeta = WORDLISTS.find((w) => w.value === config.wordlistType);
  if (!wordlistMeta) {
    throw new Error(`Unknown wordlist type: ${config.wordlistType}`);
  }

  const wordlist = await getWordlist(wordlistMeta.url);
  const words: GeneratedWord[] = [];

  for (let i = 0; i < config.wordCount; i++) {
    const diceIndex = rollDice(wordlistMeta.diceCount);
    const word = wordlist.get(diceIndex);

    if (!word) {
      i--;
      continue;
    }

    let display = config.capitalize
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word;
    if (config.includeNumbers) {
      display += randomDigit();
    }

    words.push({ word, display, diceIndex });
  }

  const formatted = words.map(({ display }) => display).join(config.separator);

  return { words, formatted };
}
