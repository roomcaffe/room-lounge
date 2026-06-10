export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
}

export function buildConfirmedMessage(r: {
  fullName: string;
  date: Date | string;
  time: string;
  guests: number;
}) {
  const d = typeof r.date === "string" ? new Date(r.date) : r.date;
  const dateStr = d.toLocaleDateString("sq-AL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return `Përshëndetje ${r.fullName}, rezervimi juaj në Room Lounge Cafe është konfirmuar për ${dateStr} në orën ${r.time} për ${r.guests} persona. Ju presim te Room. ☕`;
}

export function buildRejectedMessage(r: {
  fullName: string;
  date: Date | string;
  time: string;
}) {
  const d = typeof r.date === "string" ? new Date(r.date) : r.date;
  const dateStr = d.toLocaleDateString("sq-AL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return `Përshëndetje ${r.fullName}, për fat të keq nuk kemi disponueshmëri për ${dateStr} në orën ${r.time}. Ju lutem zgjidhni një orar tjetër ose na kontaktoni drejtpërdrejt. Faleminderit.`;
}

export function buildWhatsAppLink(phone: string, text: string) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(text)}`;
}
