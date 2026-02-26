export function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield body */}
      <path
        d="M60 8L16 30V68C16 98 38 124 60 132C82 124 104 98 104 68V30L60 8Z"
        fill="#eef2ff"
        stroke="#818cf8"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner shield highlight */}
      <path
        d="M60 20L26 38V68C26 92 44 114 60 120C76 114 94 92 94 68V38L60 20Z"
        fill="#f0fdf9"
        stroke="#2dd4bf"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.6"
      />
      {/* Lock body */}
      <rect
        x="44"
        y="62"
        width="32"
        height="26"
        rx="4"
        fill="#818cf8"
        stroke="#4338ca"
        strokeWidth="2"
      />
      {/* Lock shackle */}
      <path
        d="M50 62V52C50 46.48 54.48 42 60 42V42C65.52 42 70 46.48 70 52V62"
        stroke="#4338ca"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="60" cy="72" r="4" fill="#eef2ff" />
      <rect x="58.5" y="74" width="3" height="6" rx="1.5" fill="#eef2ff" />
    </svg>
  );
}
