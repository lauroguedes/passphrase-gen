import type { WordlistType } from "@/types";

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

const WORDLIST_SIZES: Record<WordlistType, number> = {
  long: 7776,
  short1: 1296,
  short2: 1296,
};

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

  // For extremely large numbers, use scientific notation
  return { value: years.toExponential(2), unit: "years" };
}

/**
 * Classify entropy strength into tiers.
 * Percent is clamped to 0–100, scaled against 130 bits as "max" reference.
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
 * Compute all entropy-related statistics for a given word count and wordlist type.
 *
 * @param wordCount Number of words in the passphrase (3–10)
 * @param wordlistType Which EFF wordlist is used
 * @returns Full entropy breakdown
 */
export function computeEntropy(
  wordCount: number,
  wordlistType: WordlistType,
): EntropyResult {
  const wordlistSize = WORDLIST_SIZES[wordlistType];
  const bitsPerWord = Math.log2(wordlistSize);
  const totalBits = bitsPerWord * wordCount;

  // BigInt keyspace: wordlistSize ^ wordCount
  const keyspace = BigInt(wordlistSize) ** BigInt(wordCount);
  const keyspaceDisplay = formatBigIntScientific(keyspace);

  // Crack time: average guesses = keyspace / 2, at 1 trillion guesses/sec
  const GUESSES_PER_SECOND = 1_000_000_000_000; // 1 trillion
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
