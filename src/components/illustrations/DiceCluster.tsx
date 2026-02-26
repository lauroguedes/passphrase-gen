export function DiceCluster({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Die 1 — front, slightly rotated */}
      <g transform="translate(60, 30) rotate(-8, 35, 35)">
        <rect
          width="70"
          height="70"
          rx="12"
          fill="#eef2ff"
          stroke="#334155"
          strokeWidth="2.5"
        />
        {/* Face: 5 */}
        <circle cx="18" cy="18" r="5" fill="#334155" />
        <circle cx="52" cy="18" r="5" fill="#334155" />
        <circle cx="35" cy="35" r="5" fill="#334155" />
        <circle cx="18" cy="52" r="5" fill="#334155" />
        <circle cx="52" cy="52" r="5" fill="#334155" />
      </g>

      {/* Die 2 — behind left, tilted */}
      <g transform="translate(10, 50) rotate(12, 30, 30)">
        <rect
          width="60"
          height="60"
          rx="10"
          fill="#f0fdf9"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* Face: 3 */}
        <circle cx="15" cy="15" r="4.5" fill="#0d9488" />
        <circle cx="30" cy="30" r="4.5" fill="#0d9488" />
        <circle cx="45" cy="45" r="4.5" fill="#0d9488" />
      </g>

      {/* Die 3 — behind right, tilted other way */}
      <g transform="translate(120, 60) rotate(-5, 28, 28)">
        <rect
          width="56"
          height="56"
          rx="10"
          fill="#e0e7ff"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* Face: 6 */}
        <circle cx="14" cy="14" r="4" fill="#4f46e5" />
        <circle cx="14" cy="28" r="4" fill="#4f46e5" />
        <circle cx="14" cy="42" r="4" fill="#4f46e5" />
        <circle cx="42" cy="14" r="4" fill="#4f46e5" />
        <circle cx="42" cy="28" r="4" fill="#4f46e5" />
        <circle cx="42" cy="42" r="4" fill="#4f46e5" />
      </g>
    </svg>
  );
}
