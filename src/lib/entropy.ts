import { WORDLISTS, SYMBOLS, EMOJIS } from "./constants";

export interface EntropyResult {
  wordlistSize: number;
  bitsPerWord: number;
  totalBits: number;
  keyspace: bigint;
  keyspaceDisplay: string;
  crackSeconds: number;
  crackDisplay: { value: string; unit: string };
  strength: { label: string; color: string; percent: number };
}

export interface EntropyOptions {
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  includeEmojis?: boolean;
}

/**
 * Look up the word count for a given wordlist type from the WORDLISTS registry.
 */
function getWordlistSize(wordlistType: string): number {
  const wl = WORDLISTS.find((w) => w.value === wordlistType);
  if (!wl) throw new Error(`Unknown wordlist: ${wordlistType}`);
  return wl.wordCount ?? (wl.diceCount === 5 ? 7776 : 1296);
}

/**
 * Format a BigInt into scientific notation: "X.XX × 10^Y"
 */
function formatBigIntScientific(n: bigint): string {
  const str = n.toString();
  const len = str.length;

  if (len <= 3) return str;

  const exponent = len - 1;
  const mantissa = `${str[0]}.${str.slice(1, 3)}`;
  return `${mantissa} × 10^${exponent}`;
}

/**
 * Pick the best human-readable time unit for a duration in seconds.
 */
function formatCrackTime(seconds: number): { value: string; unit: string } {
  if (!isFinite(seconds) || seconds <= 0) {
    return { value: "∞", unit: "" };
  }

  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const year = 365.25 * day;

  if (seconds < 1) {
    return { value: "< 1", unit: "second" };
  }
  if (seconds < minute) {
    return { value: seconds.toFixed(1), unit: "seconds" };
  }
  if (seconds < hour) {
    return { value: (seconds / minute).toFixed(1), unit: "minutes" };
  }
  if (seconds < day) {
    return { value: (seconds / hour).toFixed(1), unit: "hours" };
  }
  if (seconds < year) {
    return { value: (seconds / day).toFixed(1), unit: "days" };
  }

  const years = seconds / year;

  if (years < 1_000) {
    return { value: years.toFixed(1), unit: "years" };
  }
  if (years < 1_000_000) {
    return { value: (years / 1_000).toFixed(1), unit: "thousand years" };
  }
  if (years < 1_000_000_000) {
    return { value: (years / 1_000_000).toFixed(1), unit: "million years" };
  }
  if (years < 1_000_000_000_000) {
    return { value: (years / 1_000_000_000).toFixed(1), unit: "billion years" };
  }
  if (years < 1e15) {
    return { value: (years / 1_000_000_000_000).toFixed(1), unit: "trillion years" };
  }

  return { value: years.toExponential(2), unit: "years" };
}

/**
 * Classify entropy strength into tiers.
 * Percent is clamped to 0-100, scaled against 130 bits as "max" reference.
 */
function getStrength(totalBits: number): {
  label: string;
  color: string;
  percent: number;
} {
  const percent = Math.min(100, Math.round((totalBits / 130) * 100));

  if (totalBits < 50) {
    return { label: "Weak", color: "text-red-500", percent };
  }
  if (totalBits < 65) {
    return { label: "Moderate", color: "text-amber-500", percent };
  }
  if (totalBits < 80) {
    return { label: "Strong", color: "text-emerald-500", percent };
  }
  if (totalBits < 100) {
    return { label: "Very Strong", color: "text-blue-500", percent };
  }
  return { label: "Excellent", color: "text-indigo-500", percent };
}

/**
 * Compute all entropy-related statistics for a given configuration.
 *
 * Each enabled option adds independent randomness per word:
 * - includeNumbers: +log2(10)             = ~3.32 bits/word
 * - includeSymbols: +log2(SYMBOLS.length) = ~3.32 bits/word
 * - includeEmojis:  +log2(EMOJIS.length)  = ~6.02 bits/word
 *
 * Capitalize is NOT counted (deterministic transform, not random selection).
 */
export function computeEntropy(
  wordCount: number,
  wordlistType: string,
  options: EntropyOptions = {},
): EntropyResult {
  const wordlistSize = getWordlistSize(wordlistType);
  const baseBitsPerWord = Math.log2(wordlistSize);

  let bonusBitsPerWord = 0;
  if (options.includeNumbers) {
    bonusBitsPerWord += Math.log2(10);
  }
  if (options.includeSymbols) {
    bonusBitsPerWord += Math.log2(SYMBOLS.length);
  }
  if (options.includeEmojis) {
    bonusBitsPerWord += Math.log2(EMOJIS.length);
  }

  const bitsPerWord = baseBitsPerWord + bonusBitsPerWord;
  const totalBits = bitsPerWord * wordCount;

  // Keyspace: (wordlistSize * bonusMultiplier) ^ wordCount
  const bonusMultiplier =
    (options.includeNumbers ? 10 : 1) *
    (options.includeSymbols ? SYMBOLS.length : 1) *
    (options.includeEmojis ? EMOJIS.length : 1);
  const effectivePerWord = BigInt(wordlistSize) * BigInt(bonusMultiplier);
  const keyspace = effectivePerWord ** BigInt(wordCount);
  const keyspaceDisplay = formatBigIntScientific(keyspace);

  // Crack time: average guesses = keyspace / 2, at 1 trillion guesses/sec
  const GUESSES_PER_SECOND = 1_000_000_000_000;
  const halfKeyspace = keyspace / BigInt(2);
  const crackSeconds = Number(halfKeyspace) / GUESSES_PER_SECOND;
  const crackDisplay = formatCrackTime(crackSeconds);

  const strength = getStrength(totalBits);

  return {
    wordlistSize,
    bitsPerWord,
    totalBits,
    keyspace,
    keyspaceDisplay,
    crackSeconds,
    crackDisplay,
    strength,
  };
}
