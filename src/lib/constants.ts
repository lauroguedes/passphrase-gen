import type {
  Language,
  SeparatorChoice,
  WordlistChoice,
  WordlistType,
} from "@/types";

export interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "pt-br", label: "Portuguese", flag: "🇧🇷" },
];

export const LANGUAGE_DEFAULT: Language = "en";

export function getDefaultWordlistForLanguage(lang: Language): WordlistType {
  const map: Record<string, WordlistType> = {
    en: "long",
    "pt-br": "pt-br-long",
  };
  return map[lang] ?? "long";
}

export const WORDLISTS: WordlistChoice[] = [
  // --- English ---
  {
    value: "long",
    label: "Long List",
    icon: "L",
    tooltip: "7,776 words, 5 dice per word. Maximum security.",
    url: "/wordlists/en/eff_large_wordlist.txt",
    diceCount: 5,
    language: "en",
    wordCount: 7776,
  },
  {
    value: "short1",
    label: "Short #1",
    icon: "S#1",
    tooltip: "1,296 short words, 4 dice. Easier to type.",
    url: "/wordlists/en/eff_short_wordlist_1.txt",
    diceCount: 4,
    language: "en",
    wordCount: 1296,
  },
  {
    value: "short2",
    label: "Short #2",
    icon: "S#2",
    tooltip: "1,296 memorable words, 4 dice. Easy to remember.",
    url: "/wordlists/en/eff_short_wordlist_2.txt",
    diceCount: 4,
    language: "en",
    wordCount: 1296,
  },
  // --- Portuguese (BR) ---
  {
    value: "pt-br-long",
    label: "Lista Longa",
    icon: "L",
    tooltip: "7.776 palavras, 5 dados por palavra. Segurança máxima.",
    url: "/wordlists/pt-br/diceware_pt_br_large.txt",
    diceCount: 5,
    language: "pt-br",
    wordCount: 7776,
  },
  {
    value: "pt-br-short",
    label: "Lista Curta",
    icon: "S",
    tooltip: "1.296 palavras memoráveis, 4 dados. Fácil de lembrar.",
    url: "/wordlists/pt-br/diceware_pt_br_short.txt",
    diceCount: 4,
    language: "pt-br",
    wordCount: 1296,
  },
];

export const WORDLIST_DEFAULT: WordlistType = "long";

export const WORD_COUNT_MIN = 3;
export const WORD_COUNT_MAX = 10;
export const WORD_COUNT_DEFAULT = 6;

// Symbol set: excludes characters that overlap with separators (~ | : ! _ - . /)
export const SYMBOLS = [
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "+",
  "=",
  "?",
] as const;

// Curated emoji set: universally supported, visually distinct
export const EMOJIS = [
  "🔥",
  "⚡",
  "🌟",
  "💎",
  "🎯",
  "🚀",
  "🎲",
  "🔑",
  "🛡️",
  "🎪",
  "🌈",
  "🍀",
  "🦊",
  "🐉",
  "🌸",
  "🎵",
  "🌊",
  "🏔️",
  "🎭",
  "🧩",
  "🦋",
  "🌙",
  "☀️",
  "🍎",
  "🎈",
  "🔔",
  "🧲",
  "🪐",
  "🦚",
  "🌻",
  "🍄",
  "🦜",
  "🐋",
  "🌵",
  "🧊",
  "🔮",
  "🎸",
  "🏆",
  "🦁",
  "🐺",
  "🌴",
  "🍊",
  "🎃",
  "❄️",
  "🌺",
  "🐬",
  "🦅",
  "🌾",
  "🎨",
  "🧭",
  "🪴",
  "🦑",
  "🐝",
  "🌽",
  "🍉",
  "🎻",
  "🦩",
  "🐙",
  "🌿",
  "🍋",
  "🦎",
  "🐧",
  "🌲",
  "🎪",
  "🐡",
] as const;

export const SEPARATORS: SeparatorChoice[] = [
  { value: "~", label: "Tilde", icon: "~", tooltip: "Tilde (~)" },
  { value: "|", label: "Pipe", icon: "|", tooltip: "Pipe (|)" },
  {
    value: "::",
    label: "Double Colon",
    icon: "::",
    tooltip: "Double Colon (::)",
  },
  { value: "!", label: "Bang", icon: "!", tooltip: "Exclamation (!)" },
  { value: "_", label: "Underscore", icon: "_", tooltip: "Underscore (_)" },
  { value: "-", label: "Hyphen", icon: "-", tooltip: "Hyphen (-)" },
  { value: ".", label: "Dot", icon: ".", tooltip: "Dot (.)" },
  { value: "/", label: "Slash", icon: "/", tooltip: "Slash (/)" },
  { value: " ", label: "Space", icon: "⎵", tooltip: "Space ( )" },
  { value: "", label: "None", icon: "🚫", tooltip: "No separator" },
];
