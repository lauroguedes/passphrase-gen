import type { SeparatorChoice, WordlistChoice, WordlistType } from "@/types";

export const WORDLISTS: WordlistChoice[] = [
  {
    value: "long",
    label: "Long List",
    icon: "L",
    tooltip: "7,776 words, 5 dice per word. Maximum security.",
    url: "/eff_large_wordlist.txt",
    diceCount: 5,
  },
  {
    value: "short1",
    label: "Short #1",
    icon: "S#1",
    tooltip: "1,296 short words, 4 dice. Easier to type.",
    url: "/eff_short_wordlist_1.txt",
    diceCount: 4,
  },
  {
    value: "short2",
    label: "Short #2",
    icon: "S#2",
    tooltip: "1,296 memorable words, 4 dice. Easy to remember.",
    url: "/eff_short_wordlist_2.txt",
    diceCount: 4,
  },
];

export const WORDLIST_DEFAULT: WordlistType = "long";

export const WORD_COUNT_MIN = 3;
export const WORD_COUNT_MAX = 10;
export const WORD_COUNT_DEFAULT = 6;

export const SEPARATORS: SeparatorChoice[] = [
  { value: "~", label: "Tilde", icon: "~", tooltip: "Tilde (~)" },
  { value: "|", label: "Pipe", icon: "|", tooltip: "Pipe (|)" },
  { value: "::", label: "Double Colon", icon: "::", tooltip: "Double Colon (::)" },
  { value: "!", label: "Bang", icon: "!", tooltip: "Exclamation (!)" },
  { value: "_", label: "Underscore", icon: "_", tooltip: "Underscore (_)" },
  { value: "-", label: "Hyphen", icon: "-", tooltip: "Hyphen (-)" },
  { value: ".", label: "Dot", icon: ".", tooltip: "Dot (.)" },
  { value: "/", label: "Slash", icon: "/", tooltip: "Slash (/)" },
  { value: " ", label: "Space", icon: "⎵", tooltip: "Space ( )" },
  { value: "", label: "None", icon: "🚫", tooltip: "No separator" },
];
