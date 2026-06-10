import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <Link href="/" className="group inline-flex items-center gap-2">
      <span className="relative">
        <span className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          className="relative"
        >
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="url(#g)"
            strokeWidth="1.2"
          />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="14"
            fill="url(#g)"
            fontWeight="500"
          >
            R
          </text>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#e8dcc4" />
              <stop offset="50%" stopColor="#c9a86a" />
              <stop offset="100%" stopColor="#8f7344" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display ${sz} text-gradient-gold font-medium tracking-wide`}
        >
          Room
        </span>
        <span className="text-[9px] tracking-[0.35em] text-[var(--gold-deep)] uppercase">
          Lounge · Lipjan
        </span>
      </span>
    </Link>
  );
}
