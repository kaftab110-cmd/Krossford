export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="40"
      height="40"
      className={`w-10 h-10 shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx="12"
        stroke="#eab308"
        strokeWidth="2.5"
      />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="42"
        fontWeight="700"
        fill="#eab308"
        letterSpacing="-2"
      >
        KF
      </text>
    </svg>
  );
}