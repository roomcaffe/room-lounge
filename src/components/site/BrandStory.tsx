import Link from "next/link";

export function BrandStory() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-radial-gold opacity-50" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
            — Story Jonë
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-[#f5ede0]">
            18 vite në <span className="italic text-gradient-gold">zemër</span>
            <br />
            të Lipjanit.
          </h2>
          <div className="mt-8 space-y-5 text-[#cbbfa6] leading-relaxed">
            <p>
              Nga një coffee shop modest në vitin 2007, Room u rrit bashkë me
              qytetin. Çdo gjeneratë ka kaluar nëpër këto tavolina — gjyshët,
              prindërit, dhe tani fëmijët e tyre.
            </p>
            <p>
              Sot Room është më shumë se vend ku pihet kafe. Është skena ku
              luhet muzikë live, ekrani ku festohet golit, dhe qoshe ku
              biznesi lokal merr formë.
            </p>
            <p className="italic text-[var(--gold-soft)] font-display text-lg">
              "Kemi qenë këtu kur ti nuk kishe lindur. Do të jemi këtu kur
              fëmijët e tu të vijnë për kafenë e parë."
            </p>
          </div>
          <div className="mt-10">
            <Link href="/about" className="btn-outline">
              Lexo Story-n e Plotë
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Decorative frame */}
          <div className="relative aspect-[4/5] max-w-md mx-auto">
            <div className="absolute -inset-4 border border-[var(--line-strong)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3a2419] via-[#1a1614] to-[#0a0807] overflow-hidden">
              <div className="absolute inset-0 bg-radial-gold opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <svg width="60" height="60" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="15" stroke="url(#story-g)" strokeWidth="0.5" />
                  <text x="16" y="22" textAnchor="middle" fontFamily="serif" fontSize="18" fill="url(#story-g)" fontStyle="italic">
                    R
                  </text>
                  <defs>
                    <linearGradient id="story-g" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#e8dcc4" />
                      <stop offset="100%" stopColor="#8f7344" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="font-display text-6xl text-gradient-gold italic mt-6">2007</div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold-deep)] mt-3">
                  Established · Lipjan
                </div>
                <div className="w-12 h-px bg-[var(--gold)] mt-6 mb-6" />
                <div className="font-display text-2xl text-[#f5ede0] italic">
                  "Vendi ku takohemi."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
