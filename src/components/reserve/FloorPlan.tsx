"use client";

import { useState } from "react";

/**
 * FloorPlan V2 — Bazuar në planin real arkitektonik (archiEDU, 02.4.2.33)
 * 60 tavolina total, 4 zona:
 *  - Salla Kryesore (indoor, mes/majtas)
 *  - Bar Lounge (djathtas, curve)
 *  - VIP Lounge (S-shape, poshtë majtas)
 *  - Terrace (jug, outdoor)
 *
 * Tipet:
 *  hr85   → tavolinë katrore E LARTË 85×60cm (cocktail) — 4 persona
 *  hr55   → tavolinë rrethore E LARTË 55cm (bar high) — 2 persona
 *  lr60   → tavolinë rrethore E ULËT 60cm (lounge) — 4 persona
 *  ls85   → tavolinë katrore E ULËT 85×60cm (lounge) — 4 persona
 *  hr75   → tavolinë rrethore E LARTË 75cm — 4 persona
 *  old    → e vjetër (riparu) — 4 persona
 */

export type FloorTableType = "hr85" | "hr55" | "lr60" | "ls85" | "hr75" | "old";
export type FloorArea = "main" | "bar" | "vip" | "terrace";

export type FloorTable = {
  id: string;
  name: string;
  capacity: number;
  area: FloorArea;
  type: FloorTableType;
  x: number; // 0-100
  y: number; // 0-100
  rotation?: number;
};

const CAPACITY: Record<FloorTableType, number> = {
  hr85: 4,
  hr55: 2,
  lr60: 4,
  ls85: 4,
  hr75: 4,
  old: 4,
};

const SHAPE: Record<FloorTableType, "circle" | "rect"> = {
  hr85: "rect",
  hr55: "circle",
  lr60: "circle",
  ls85: "rect",
  hr75: "circle",
  old: "circle",
};

// Color palette (matches plan legend, but tuned to our brand)
const TYPE_COLOR: Record<FloorTableType, { fill: string; stroke: string; label: string }> = {
  hr85: { fill: "rgba(193, 79, 80, 0.55)", stroke: "rgba(255,200,200,0.55)", label: "Katrore e lartë" },
  hr55: { fill: "rgba(105, 178, 122, 0.55)", stroke: "rgba(200,255,210,0.55)", label: "Rrethore e lartë 55" },
  lr60: { fill: "rgba(167, 110, 198, 0.55)", stroke: "rgba(230,200,255,0.55)", label: "Rrethore e ulët" },
  ls85: { fill: "rgba(72, 187, 168, 0.55)", stroke: "rgba(200,255,240,0.55)", label: "Katrore e ulët" },
  hr75: { fill: "rgba(231, 191, 76, 0.65)", stroke: "rgba(255,235,180,0.65)", label: "Rrethore e lartë 75" },
  old:  { fill: "rgba(91, 137, 197, 0.55)", stroke: "rgba(200,225,255,0.55)", label: "Riparu" },
};

const AREA_LABEL: Record<FloorArea, string> = {
  main: "SALLA KRYESORE",
  bar: "BAR LOUNGE",
  vip: "VIP LOUNGE",
  terrace: "TERRACE",
};

// ── Layout ──────────────────────────────────────────────────────────────
// Coordinates derived from architecture plan (archiEDU 02.4.2.33).
// SVG viewBox 100×72 (≈ 4:3 width-to-height of the plan).

function makeTable(
  id: string,
  type: FloorTableType,
  area: FloorArea,
  x: number,
  y: number,
  rotation = 0,
): FloorTable {
  return {
    id,
    name: id,
    capacity: CAPACITY[type],
    area,
    type,
    x,
    y,
    rotation,
  };
}

export const TABLES: FloorTable[] = [
  // ── BAR LOUNGE — djathtas, lakuara me banquette curve ──
  // 9 lr60 (purple) sipas banquette
  makeTable("BAR-01", "lr60", "bar", 73, 12),
  makeTable("BAR-02", "lr60", "bar", 80, 14),
  makeTable("BAR-03", "lr60", "bar", 86, 18),
  makeTable("BAR-04", "lr60", "bar", 90, 25),
  makeTable("BAR-05", "lr60", "bar", 91, 33),
  makeTable("BAR-06", "lr60", "bar", 90, 41),
  makeTable("BAR-07", "lr60", "bar", 86, 48),
  makeTable("BAR-08", "lr60", "bar", 80, 52),
  makeTable("BAR-09", "lr60", "bar", 73, 54),
  // 2 ls85 (teal) afër bar
  makeTable("BAR-10", "ls85", "bar", 67, 50),
  makeTable("BAR-11", "ls85", "bar", 67, 56),

  // ── SALLA KRYESORE — mes/majtas ──
  // 8 hr55 (green) majtas, përgjatë murit perëndimor
  makeTable("M-G01", "hr55", "main", 6, 11),
  makeTable("M-G02", "hr55", "main", 13, 8),
  makeTable("M-G03", "hr55", "main", 20, 9),
  makeTable("M-G04", "hr55", "main", 27, 11),
  makeTable("M-G05", "hr55", "main", 8, 22),
  makeTable("M-G06", "hr55", "main", 16, 22),
  makeTable("M-G07", "hr55", "main", 23, 22),
  makeTable("M-G08", "hr55", "main", 31, 22),
  // 6 hr85 (red squares) — kolonë vertikale qendrore
  makeTable("M-R01", "hr85", "main", 14, 32),
  makeTable("M-R02", "hr85", "main", 26, 32),
  makeTable("M-R03", "hr85", "main", 14, 42),
  makeTable("M-R04", "hr85", "main", 26, 42),
  makeTable("M-R05", "hr85", "main", 14, 52),
  makeTable("M-R06", "hr85", "main", 26, 52),
  // 6 blue (old) — radhitur në qendër, riparu
  makeTable("M-O01", "old", "main", 38, 38),
  makeTable("M-O02", "old", "main", 38, 45),
  makeTable("M-O03", "old", "main", 38, 52),
  makeTable("M-O04", "old", "main", 46, 38),
  makeTable("M-O05", "old", "main", 46, 45),
  makeTable("M-O06", "old", "main", 46, 52),
  // 4 hr55 (green) — qendër lart, banquette veriore
  makeTable("M-G09", "hr55", "main", 40, 14),
  makeTable("M-G10", "hr55", "main", 47, 14),
  makeTable("M-G11", "hr55", "main", 54, 14),
  makeTable("M-G12", "hr55", "main", 61, 14),

  // ── VIP LOUNGE — S-shape, poshtë-majtas ──
  // 2 hr75 (yellow) — feature high tables
  makeTable("VIP-Y01", "hr75", "vip", 9, 62),
  makeTable("VIP-Y02", "hr75", "vip", 14, 67),
  // 4 hr55 (green) sipas mure VIP
  makeTable("VIP-G01", "hr55", "vip", 3, 56),
  makeTable("VIP-G02", "hr55", "vip", 3, 64),
  makeTable("VIP-G03", "hr55", "vip", 20, 64),
  makeTable("VIP-G04", "hr55", "vip", 24, 58),
  // 3 blue (old) afër VIP
  makeTable("VIP-O01", "old", "vip", 18, 70),
  makeTable("VIP-O02", "old", "vip", 26, 68),
  makeTable("VIP-O03", "old", "vip", 30, 64),

  // ── TERRACE — jug, outdoor strip ──
  // 6 blue (old, riparu) — rresht poshtë afër interior boundary
  makeTable("T-O01", "old", "terrace", 36, 60),
  makeTable("T-O02", "old", "terrace", 44, 60),
  makeTable("T-O03", "old", "terrace", 52, 60),
  makeTable("T-O04", "old", "terrace", 60, 60),
  makeTable("T-O05", "old", "terrace", 68, 60),
  makeTable("T-O06", "old", "terrace", 76, 60),
  // 10 hr85 (red squares) — rresht poshtë terrace
  makeTable("T-R01", "hr85", "terrace", 36, 68),
  makeTable("T-R02", "hr85", "terrace", 42, 68),
  makeTable("T-R03", "hr85", "terrace", 48, 68),
  makeTable("T-R04", "hr85", "terrace", 54, 68),
  makeTable("T-R05", "hr85", "terrace", 60, 68),
  makeTable("T-R06", "hr85", "terrace", 66, 68),
  makeTable("T-R07", "hr85", "terrace", 72, 68),
  makeTable("T-R08", "hr85", "terrace", 78, 68),
  makeTable("T-R09", "hr85", "terrace", 84, 68),
  makeTable("T-R10", "hr85", "terrace", 90, 68),
];

type Props = {
  selected?: string;
  onSelect: (table: FloorTable) => void;
  guests: number;
  occupied?: string[];
};

export function FloorPlan({ selected, onSelect, guests, occupied = [] }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filterArea, setFilterArea] = useState<FloorArea | "all">("all");

  const stats = {
    total: TABLES.length,
    available: TABLES.filter(t => !occupied.includes(t.id) && t.capacity >= guests).length,
  };

  return (
    <div className="space-y-4">
      {/* Zone filter pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-eyebrow text-[color:var(--cream-soft)]/60 mr-2">Zona:</span>
        {(["all", "main", "bar", "vip", "terrace"] as const).map((z) => (
          <button
            key={z}
            onClick={() => setFilterArea(z)}
            className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all ${
              filterArea === z
                ? "bg-[color:var(--brass)] text-[color:var(--obsidian)]"
                : "glass hover:bg-[color:var(--cream)]/8"
            }`}
          >
            {z === "all" ? "Të gjitha" : AREA_LABEL[z]}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-[color:var(--cream-soft)]/50">
          {stats.available}/{stats.total} të lira
        </span>
      </div>

      <div className="relative w-full aspect-[100/72] rounded-3xl overflow-hidden glass-strong">
        {/* Atmosphere */}
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(198,155,84,0.10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(217,121,66,0.08),transparent_60%)]" />

        <svg
          viewBox="0 0 100 72"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Architecture: walls & permanent fixtures ── */}
          {/* Outer wall */}
          <rect x="1" y="3" width="98" height="63" rx="1.5"
            fill="none" stroke="rgba(244,234,216,0.25)" strokeWidth="0.35" />

          {/* Bar/counter (top-center) */}
          <rect x="42" y="3" width="22" height="6" rx="0.5"
            fill="rgba(198,155,84,0.18)" stroke="rgba(198,155,84,0.5)" strokeWidth="0.2" />
          <text x="53" y="7" fontSize="1.6" fill="rgba(198,155,84,0.9)"
            textAnchor="middle" fontFamily="JetBrains Mono" letterSpacing="0.2">BAR</text>

          {/* Curved banquette around BAR LOUNGE */}
          <path d="M 70 9 Q 96 9 96 36 Q 96 58 70 58"
            fill="rgba(167,110,198,0.05)"
            stroke="rgba(167,110,198,0.35)" strokeWidth="0.25" strokeDasharray="0.8 0.4" />

          {/* S-shaped VIP wall (decorative) */}
          <path d="M 2 54 Q 14 54 14 60 Q 14 66 26 66 Q 32 66 32 71"
            fill="none" stroke="rgba(231,191,76,0.4)" strokeWidth="0.3" strokeDasharray="0.8 0.4" />

          {/* DJ / Stage panel center-top */}
          <rect x="32" y="3" width="9" height="4.5" rx="0.5"
            fill="rgba(107,31,36,0.18)" stroke="rgba(107,31,36,0.5)" strokeWidth="0.2" />
          <text x="36.5" y="6.2" fontSize="1.3" fill="rgba(232,161,101,0.9)"
            textAnchor="middle" fontFamily="JetBrains Mono">DJ</text>

          {/* Entry (south-center) */}
          <rect x="46" y="65" width="8" height="3" rx="0.3"
            fill="rgba(244,234,216,0.05)" stroke="rgba(244,234,216,0.3)" strokeWidth="0.2"
            strokeDasharray="0.5 0.5" />
          <text x="50" y="71" fontSize="1.4" fill="rgba(244,234,216,0.5)"
            textAnchor="middle" fontFamily="JetBrains Mono">HYRJA</text>

          {/* Terrace strip (south) */}
          <rect x="34" y="56" width="62" height="14" rx="0.5"
            fill="rgba(72,187,168,0.03)" stroke="rgba(72,187,168,0.18)"
            strokeWidth="0.2" strokeDasharray="0.6 0.6" />
          <text x="65" y="59" fontSize="1.5" fill="rgba(72,187,168,0.55)"
            textAnchor="middle" fontFamily="JetBrains Mono" letterSpacing="0.15">TERRACE · VERANDA</text>

          {/* Tables */}
          {TABLES.map((t) => {
            const isSelected = selected === t.id;
            const isOccupied = occupied.includes(t.id);
            const tooSmall = t.capacity < guests;
            const muted = filterArea !== "all" && t.area !== filterArea;
            const disabled = isOccupied || tooSmall;
            const isHovered = hovered === t.id;

            const baseSize = t.type === "ls85" || t.type === "hr85" ? 2.6 : t.type === "hr75" ? 2.2 : 1.8;
            const c = TYPE_COLOR[t.type];

            let fill = c.fill;
            let stroke = c.stroke;
            let textColor = "rgba(13,10,8,0.85)";

            if (isSelected) {
              fill = "var(--brass)";
              stroke = "var(--cream)";
              textColor = "var(--obsidian)";
            } else if (disabled) {
              fill = "rgba(244,234,216,0.08)";
              stroke = "rgba(244,234,216,0.15)";
              textColor = "rgba(244,234,216,0.3)";
            } else if (muted) {
              fill = c.fill.replace(/0\.\d+/, "0.12");
              stroke = c.stroke.replace(/0\.\d+/, "0.2");
            }

            const shape = SHAPE[t.type];

            return (
              <g
                key={t.id}
                transform={`translate(${t.x}, ${t.y})${t.rotation ? ` rotate(${t.rotation})` : ""}`}
                onClick={() => !disabled && onSelect(t)}
                onMouseEnter={() => setHovered(t.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: muted ? 0.4 : 1,
                  transition: "opacity 0.3s",
                }}
              >
                {/* Glow when selected/hovered */}
                {(isSelected || (isHovered && !disabled)) && (
                  <circle
                    r={baseSize + (isSelected ? 2 : 1.2)}
                    fill={isSelected ? "rgba(198,155,84,0.30)" : "rgba(198,155,84,0.15)"}
                    className={isSelected ? "animate-pulse-soft" : ""}
                  />
                )}

                {shape === "circle" ? (
                  <circle r={baseSize} fill={fill} stroke={stroke} strokeWidth="0.18" />
                ) : (
                  <rect
                    x={-baseSize * 1.05}
                    y={-baseSize * 0.7}
                    width={baseSize * 2.1}
                    height={baseSize * 1.4}
                    rx="0.3"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="0.18"
                  />
                )}

                {/* Capacity */}
                <text
                  fontSize="1.6"
                  fill={textColor}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="JetBrains Mono"
                  fontWeight="600"
                  style={{ pointerEvents: "none" }}
                >
                  {t.capacity}
                </text>
              </g>
            );
          })}

          {/* Hovered table tooltip */}
          {hovered && (() => {
            const t = TABLES.find(x => x.id === hovered);
            if (!t) return null;
            const tx = Math.min(Math.max(t.x, 12), 88);
            const ty = t.y < 35 ? t.y + 6 : t.y - 6;
            return (
              <g transform={`translate(${tx}, ${ty})`} style={{ pointerEvents: "none" }}>
                <rect
                  x="-10" y="-2.5" width="20" height="5" rx="0.5"
                  fill="rgba(10,7,5,0.92)"
                  stroke="rgba(198,155,84,0.45)"
                  strokeWidth="0.15"
                />
                <text x="0" y="0.4" fontSize="1.5" fill="var(--cream)"
                  textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="500">
                  {t.name}
                </text>
                <text x="0" y="2" fontSize="1.1" fill="rgba(198,155,84,0.9)"
                  textAnchor="middle" fontFamily="JetBrains Mono">
                  {TYPE_COLOR[t.type].label} · {t.capacity} pers.
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Area labels overlay */}
        <div className="absolute top-3 left-3 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] text-[color:var(--cream-soft)]/40">
          Plani · archiEDU 02.4.2.33
        </div>
      </div>

      {/* Type legend */}
      <div className="glass rounded-2xl p-3 md:p-4 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 text-[10px] md:text-xs">
        {(Object.keys(TYPE_COLOR) as FloorTableType[]).map((k) => {
          const c = TYPE_COLOR[k];
          const count = TABLES.filter(t => t.type === k).length;
          return (
            <div key={k} className="flex items-center gap-2 min-w-0">
              <span
                className={`shrink-0 ${SHAPE[k] === "circle" ? "rounded-full" : "rounded-sm"}`}
                style={{ width: 12, height: 12, background: c.fill, border: `1px solid ${c.stroke}` }}
              />
              <span className="font-mono text-[color:var(--cream-soft)]/80 truncate">
                {c.label} <span className="text-[color:var(--cream-soft)]/40">× {count}</span>
              </span>
            </div>
          );
        })}
        <div className="flex items-center gap-2 col-span-2 md:col-span-3 pt-2 mt-1 border-t border-[color:var(--line)] text-[color:var(--cream-soft)]/60">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[color:var(--brass)]" /> E zgjedhur
          </span>
          <span className="flex items-center gap-1.5 ml-3">
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(244,234,216,0.12)", border: "1px solid rgba(244,234,216,0.2)" }} />
            E zënë / e vogël
          </span>
        </div>
      </div>
    </div>
  );
}
