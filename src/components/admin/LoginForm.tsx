"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Gabim");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Gabim në lidhje");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Email</label>
        <input
          type="email"
          className="input-luxe"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@roomloungecafe.com"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">Fjalëkalimi</label>
        <input
          type="password"
          className="input-luxe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="text-sm text-red-400 border border-red-500/30 bg-red-500/10 p-3">{error}</div>
      )}
      <button disabled={loading} className="btn-gold w-full justify-center disabled:opacity-60">
        {loading ? "Duke u kyçur..." : "Kyçu"}
      </button>
    </form>
  );
}
