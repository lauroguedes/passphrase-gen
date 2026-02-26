# Passphrase Generator

A cryptographically secure passphrase generator built with the **EFF Dice-Roll Method**. Generate memorable, high-entropy passphrases entirely in your browser — no data ever leaves your device.

## Features

- **Three EFF wordlists** — Long List (7,776 words), Short List #1 (short words), Short List #2 (memorable words)
- **Cryptographic randomness** — Uses `crypto.getRandomValues()` with rejection sampling for unbiased dice rolls
- **Configurable** — Adjust word count (3–10), separators, capitalization, and number inclusion
- **Dark mode** — System-aware theme with manual light/dark/system toggle
- **Copy to clipboard** — One-click copy with toast notification feedback
- **Responsive** — Mobile-first layout with passphrase output prioritized on small screens
- **Zero server dependency** — All generation happens client-side; no API calls, no telemetry
- **Educational content** — Entropy explanations, best practices, and EFF methodology overview

## The EFF Dice-Roll Method

The [Electronic Frontier Foundation (EFF)](https://www.eff.org/dice) developed the dice-roll passphrase method as a transparent, verifiable way to generate strong passwords without trusting opaque software.

**How it works:**

1. A curated wordlist maps every possible dice combination to a unique word
2. Roll physical dice (or use a cryptographic random number generator) to select words
3. Each word from the 7,776-word list adds ~12.9 bits of entropy
4. Six random words produce ~77.5 bits of entropy — resistant to brute-force attacks for decades

This generator digitally reproduces the physical dice-roll process. Instead of rolling real dice, it uses the browser's `crypto.getRandomValues()` API with **rejection sampling** to ensure each die face (1–6) has exactly equal probability — the digital equivalent of perfectly fair dice.

**Wordlist options:**

| List | Words | Dice | Use case |
|------|-------|------|----------|
| Long List | 7,776 | 5 per word | Maximum entropy (~12.9 bits/word) |
| Short #1 | 1,296 | 4 per word | Shorter words, easier to type |
| Short #2 | 1,296 | 4 per word | Longer memorable words, easier to remember |

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [Tailwind CSS 4](https://tailwindcss.com) — CSS-first configuration via `@theme`
- [Framer Motion](https://motion.dev) — Animations and transitions
- [Lucide React](https://lucide.dev) — Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode with SSR support
- **Google Fonts** — Space Grotesk (display), DM Sans (body), JetBrains Mono (passphrase output)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18.17 or later
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/passphrase-gen.git
cd passphrase-gen

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme config, dark mode, component classes
│   ├── layout.tsx           # Root layout, fonts, ThemeProvider
│   └── page.tsx             # Page assembly: hero, generator, educational sections
├── components/
│   ├── HeroSection.tsx      # Animated hero with title, badge, dice icon, theme toggle
│   ├── Providers.tsx        # Client-side ThemeProvider wrapper
│   ├── generator/
│   │   ├── PassphraseGenerator.tsx  # Main orchestrator (two-panel layout)
│   │   ├── PassphraseDisplay.tsx    # Animated word-by-word passphrase display
│   │   ├── WordlistSelector.tsx     # L / S#1 / S#2 wordlist picker
│   │   ├── WordCountStepper.tsx     # Word count -/+ stepper (3–10)
│   │   ├── SeparatorSelector.tsx    # Separator character grid
│   │   ├── OptionSwitches.tsx       # Capitalize + Numbers toggle switches
│   │   ├── GenerateButton.tsx       # Roll Passphrase button with dice animation
│   │   └── CopyButton.tsx          # Copy to clipboard with feedback
│   ├── educational/
│   │   ├── WhyRandomPassphrases.tsx # Entropy explanation + table
│   │   ├── BestPractices.tsx        # Security tips grid
│   │   └── EffResearchSummary.tsx   # EFF methodology overview
│   ├── illustrations/
│   │   ├── ShieldIcon.tsx           # Custom SVG shield illustration
│   │   ├── DiceCluster.tsx          # Custom SVG dice cluster
│   │   └── EntropyWave.tsx          # Custom SVG wave pattern
│   └── ui/
│       ├── GlassCard.tsx            # Glassmorphic card wrapper
│       ├── ThemeToggle.tsx          # Light/dark/system theme switcher
│       ├── Tooltip.tsx              # Hover tooltip
│       ├── Toast.tsx                # Copy confirmation toast
│       └── SectionHeading.tsx       # Section heading with gradient accent
├── hooks/
│   ├── usePassphrase.ts     # Central state: config, result, generate action
│   └── useClipboard.ts      # Clipboard API wrapper with auto-reset
├── lib/
│   ├── constants.ts         # Wordlists, separators, defaults
│   ├── generate.ts          # Dice rolling with rejection sampling
│   └── wordlist.ts          # Fetch, parse, and cache EFF wordlists
└── types/
    └── index.ts             # TypeScript type definitions
```

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and ensure the build passes:
   ```bash
   npm run build
   npm run lint
   ```
4. **Commit** with a clear, descriptive message
5. **Push** to your fork and open a **Pull Request**

### Guidelines

- Follow the existing code style and patterns
- Use Tailwind CSS utility classes (with `dark:` variants for new UI elements)
- Keep components small and focused
- All randomness must use `crypto.getRandomValues()` — never `Math.random()`
- Test both light and dark mode for any UI changes
- Ensure mobile responsiveness

## License

This project is licensed under the [MIT License](LICENSE).
