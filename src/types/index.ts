export interface GeneratedWord {
  word: string;
  display: string;
  diceIndex: string;
}

export type WordlistType = "long" | "short1" | "short2";

export interface WordlistChoice {
  value: WordlistType;
  label: string;
  icon: string;
  tooltip: string;
  url: string;
  diceCount: number;
}

export interface PassphraseConfig {
  wordCount: number;
  capitalize: boolean;
  includeNumbers: boolean;
  separator: SeparatorOption;
  wordlistType: WordlistType;
}

export type SeparatorOption = "~" | "|" | "::" | "!" | "_" | "-" | "." | "/" | " " | "";

export interface SeparatorChoice {
  value: SeparatorOption;
  label: string;
  icon: string;
  tooltip: string;
}

export interface PassphraseResult {
  words: GeneratedWord[];
  formatted: string;
}
