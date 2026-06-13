"use client";

import { motion } from "framer-motion";

export type FloorTable = {
  id: string;
  name: string;
  capacity: number;
  area: "indoor" | "outdoor" | "vip" | "stage";
  x: number; // 0-100
  y: number; // 0-100
  shape: "circle" | "rect";
  rotation?: number;
};

// Pre-defined layout — matches the seeded tables
export const TABLES: FloorTable[] = [
  // VIP (top-left, two big lounge tables)
  { id: "VIP-01", name: "VIP-01", capacity: 8, area: "vip", x: 12, y: 18, shape: "rect" },
  { id: "VIP-02", name: "VIP-02", capacity: 6, area: "vip", x: 12, y: 42, shape: "rect" },

  // Stage (top-right, near performance area)
  { id: "S-01", name: "S-01", capacity: 4, area: "stage", x: 75, y: 18, shape: "circle" },
  { id: "S-02", name: "S-02", capacity: 4, area: "stage", x: 88, y: 32, shape: "circle" },

  // Indoor (middle area)
  { id: "T-01", name: "T-01", capacity: 4, area: "indoor", x: 35, y: 30, shape: "circle" },
  { id: "T-02", name: "T-02", capacity: 4, area: "indoor", x: 52, y: 30, shape: "circle" },
  { id: "T-03", name: "T-03", capacity: 2, area: "indoor", x: 42, y: 50, shape: "circle" },
  { id: "T-04", name: "T-04", capacity: 6, area: "indoor", x: 60, y: 50, shape: "rect" },
  { id: "T-05", name: "T-05", capacity: 4, area: "indoor", x: 35, y: 65, shape: "circle" },

  // Outdoor (bottom strip, like a verandah)
  { id: "O-01", name: "O-01", capacity: 4, area: "outdoor", x: 22, y: 84, shape: "circle" },
  { id: "O-02", name: "O-02", capacity: 4, area: "outdoor", x: 45, y: 84, shape: "circle" },
  { id: "O-03", name: "O-03", capacity: 2, area: "outdoor", x: 68, y: 84, shape: "circle" },
];

type Props = {
  selected?: string;
  onSelect: (table: FloorTable) => void;
  guests: number;
  occupied?: string[]; // ids already reserved at requested time
};

export function FloorPlan({ selected, onSelect, guests, occupied = [] }: Props) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-strong">
      {/* Background floor */}
      <div className="absolute inset-0 bg-noise opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(217,121,66,0.08),transparent_70%)]" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Area zones (subtle backgrounds) */}
        {/* VIP */}
        <rect
          x="2" y="6" width="22" height="50"
          rx="3"
          fill="rgba(201,168,106,0.06)"
          stroke="rgba(201,168,106,0.18)"
          strokeWidth="0.15"
          strokeDasharray="0.6 0.6"
        />
        <text x="13" y="3.5" fontSize="2" fill="rgba(201,168,106,0.7)" textAnchor="middle" fontFamily="JetBrains Mono">VIP LOUNGE</text>

        {/* Stage */}
        <rect
          x="65" y="6" width="33" height="35"
          rx="3"
          fill="rgba(217,121,66,0.06)"
          stroke="rgba(217,121,66,0.18)"
          strokeWidth="0.15"
          strokeDasharray="0.6 0.6"
        />
        <text x="81" y="3.5" fontSize="2" fill="rgba(217,121,66,0.7)" textAnchor="middle" fontFamily="JetBrains Mono">STAGE</text>
        {/* Stage line */}
        <line x1="65" y1="11" x2="98" y2="11" stroke="rgba(217,121,66,0.4)" strokeWidth="0.3" />

        {/* Indoor */}
        <rect
          x="26" y="20" width="38" height="58"
          rx="3"
          fill="rgba(244,234,216,0.03)"
          stroke="rgba(244,234,216,0.10)"
          strokeWidth="0.15"
          strokeDasharray="0.6 0.6"
        />
        <text x="45" y="17.5" fontSize="2" fill="rgba(244,234,216,0.5)" textAnchor="middle" fontFamily="JetBrains Mono">INDOOR</text>

        {/* Outdoor */}
        <rect
          x="2" y="74" width="96" height="22"
          rx="3"
          fill="rgba(244,234,216,0.02)"
          stroke="rgba(244,234,216,0.08)"
          strokeWidth="0.15"
          strokeDasharray="0.6 0.6"
        />
        <text x="50" y="98.5" fontSize="2" fill="rgba(244,234,216,0.4)" textAnchor="middle" fontFamily="JetBrains Mono">OUTDOOR · VERANDA</text>

        {/* Tables */}
        {TABLES.map((t) => {
          const isSelected = selected === t.id;
          const isOccupied = occupied.includes(t.id);
          const tooSmall = t.capacity < guests;
          const disabled = isOccupied || tooSmall;
          const size = t.capacity >= 6 ? 5.5 : t.capacity >= 4 ? 4.5 : 3.5;

          const color = isSelected
            ? "#d97942"
            : disabled
              ? "rgba(244,234,216,0.12)"
              : t.area === "vip"
                ? "rgba(201,168,106,0.6)"
                : t.area === "stage"
                  ? "rgba(217,121,66,0.4)"
                  : "rgba(244,234,216,0.4)";

          const stroke = isSelected
            ? "#f4ead8"
            : disabled
              ? "rgba(244,234,216,0.15)"
              : "rgba(244,234,216,0.3)";

          return (
            <g
              key={t.id}
              transform={`translate(${t.x}, ${t.y})`}
              onClick={() => !disabled && onSelect(t)}
              style={{ cursor: disabled ? "not-allowed" : "pointer" }}
              className="transition-all"
            >
              {/* Glow when selected */}
              {isSelected && (
                <circle r={size + 3} fill="rgba(217,121,66,0.25)" className="animate-pulse-soft" />
              )}

              {t.shape === "circle" ? (
                <circle
                  r={size}
                  fill={color}
                  stroke={stroke}
                  strokeWidth="0.25"
                />
              ) : (
                <rect
                  x={-size * 1.1}
                  y={-size * 0.7}
                  width={size * 2.2}
                  height={size * 1.4}
                  rx="0.5"
                  fill={color}
                  stroke={stroke}
                  strokeWidth="0.25"
                />
              )}

              {/* Capacity */}
              <text
                fontSize="2.4"
                fill={isSelected ? "#0d0a08" : "rgba(13,10,8,0.7)"}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="JetBrains Mono"
                fontWeight="500"
                style={{ pointerEvents: "none" }}
              >
                {t.capacity}
              </text>

              {/* Label below */}
              <text
                fontSize="1.5"
                y={size + 2.5}
                fill={isSelected ? "#d97942" : disabled ? "rgba(244,234,216,0.3)" : "rgba(244,234,216,0.6)"}
                textAnchor="middle"
                fontFamily="JetBrains Mono"
                style={{ pointerEvents: "none" }}
              >
                {t.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend (bottom-left overlay) */}
      <div className="absolute bottom-3 left-3 glass rounded-2xl px-3 py-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[color:var(--ember)]" />
          E zgjedhur
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(244,234,216,0.4)" }} />
          E lirë
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: "rgba(244,234,216,0.12)" }} />
          E zënë
        </span>
      </div>
    </div>
  );
}
