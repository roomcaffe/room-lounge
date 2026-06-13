"use client";

import { useEffect, useState } from "react";

type Vibe = {
  status: "open" | "closing-soon" | "closed";
  message: string;
  detail: string;
};

function computeVibe(now: Date): Vibe {
  // Kosovo time UTC+2 (CEST = UTC+2 standard summer; assume always +2 for now)
  // Convert local time → Pristina
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ksHour = (new Date(utc + 2 * 3600000)).getHours();
  const ksMin = (new Date(utc + 2 * 3600000)).getMinutes();
  const dow = (new Date(utc + 2 * 3600000)).getDay(); // 0 sun .. 6 sat

  // Hours: 08:00 → 01:00 weekdays, → 03:00 weekend
  const isWeekend = dow === 5 || dow === 6;
  const openHour = 8;
  const closeHour = isWeekend ? 3 : 1; // next day

  const decimal = ksHour + ksMin / 60;
  const isOpen =
    decimal >= openHour || decimal < closeHour;

  if (!isOpen) {
    return {
      status: "closed",
      message: "Tani: Mbyllur",
      detail: "Hapemi në 08:00",
    };
  }

  // Closing soon (last hour)
  const beforeClose = decimal < closeHour ? closeHour - decimal : 24 - decimal + closeHour;
  if (beforeClose < 1) {
    return {
      status: "closing-soon",
      message: "Po mbyllim së shpejti",
      detail: `Mbyllim ora ${closeHour.toString().padStart(2, "0")}:00`,
    };
  }

  // Vibe by hour
  let detail = "Atmosferë e qetë";
  if (decimal >= 18 && decimal < 22) detail = "Hapur · DJ live së shpejti";
  else if (decimal >= 22) detail = "Lounge night në vazhdim";
  else if (decimal >= 12 && decimal < 17) detail = "Lunch hours · live music ndonjëherë";
  else if (decimal >= 8 && decimal < 12) detail = "Morning coffee · breakfast";

  return {
    status: "open",
    message: "Hapur Tani",
    detail,
  };
}

export function LiveVibe() {
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setVibe(computeVibe(now));
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ks = new Date(utc + 2 * 3600000);
      setTime(
        ks.toLocaleTimeString("sq-AL", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) + " Lipjan"
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  if (!vibe) return null;

  const dotColor =
    vibe.status === "open"
      ? "var(--ember)"
      : vibe.status === "closing-soon"
        ? "var(--gold)"
        : "rgba(244,234,216,0.3)";

  return (
    <div className="glass rounded-2xl px-4 py-3 inline-flex items-center gap-3">
      <span
        className="inline-block w-2 h-2 rounded-full animate-pulse-soft"
        style={{ background: dotColor, boxShadow: `0 0 12px ${dotColor}` }}
      />
      <div className="leading-tight">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--cream)]">
          {vibe.message}
        </div>
        <div className="text-[10px] text-[color:var(--cream-soft)]/60 mt-0.5">
          {vibe.detail} · {time}
        </div>
      </div>
    </div>
  );
}
