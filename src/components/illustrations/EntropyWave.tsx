export function EntropyWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 50 C50 20, 100 80, 150 50 S250 20, 300 50 S400 80, 450 50 S550 20, 600 50 S700 80, 750 50 S800 30, 800 50"
        stroke="#a5b4fc"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M0 50 C60 75, 120 25, 180 50 S300 75, 360 50 S480 25, 540 50 S660 75, 720 50 S800 35, 800 50"
        stroke="#5eead4"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M0 50 C40 35, 80 65, 120 50 S200 35, 240 50 S320 65, 360 50 S440 35, 480 50 S560 65, 600 50 S680 35, 720 50 S800 55, 800 50"
        stroke="#818cf8"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}
