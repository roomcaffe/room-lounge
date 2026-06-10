import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryStrip } from "@/components/site/StoryStrip";

export const metadata = { title: "Rreth Nesh" };

const values = [
  { t: "Community First", d: "Klientët tanë janë familje. Lidhjet ndërtohen me kohë, jo me marketing." },
  { t: "Hospitality", d: "Çdo person që hyn në Room duhet të largohet duke u ndjerë më mirë se kur erdhi." },
  { t: "Consistency", d: "E njëjta cilësi e kafesë, e njëjta atmosferë, e njëjta dashuri — çdo ditë." },
  { t: "Local Culture", d: "Mbështesim artistë lokalë, biznese lokale, dhe zëra lokalë. Lipjani na ka rritur." },
];

const timeline = [
  { y: "2007", t: "Hapja", d: "Room hapet si një kafene e thjeshtë në qendër të Lipjanit." },
  { y: "2012", t: "Growth Phase", d: "Transformohet në lounge modern. Atmosferë e re, klientelë e re." },
  { y: "2017", t: "Entertainment Era", d: "Net e para live music. Lipjani gjen skenën e tij." },
  { y: "2025", t: "18 Vjet", d: "Festohet 18-vjetori me eventet më të mëdha të historisë sonë." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-50" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6">
            — Rreth Room Lounge Cafe
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#f5ede0]">
            Mbi 18 vite në <br />
            <span className="italic text-gradient-gold">zemër të Lipjanit.</span>
          </h1>
          <div className="divider-gold" />
          <p className="text-[#cbbfa6] text-lg leading-relaxed max-w-3xl mx-auto">
            Çfarë filloi si kafene e thjeshtë në 2007, u bë sot pikë takimi për
            gjenerata. Kjo është story-a jonë.
          </p>
        </div>
      </section>

      <StoryStrip />

      {/* Brand story long */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Story Jonë" title="Vendi ku Lipjani takohet" />
          <div className="mt-12 space-y-6 text-[#cbbfa6] leading-relaxed text-lg">
            <p>
              Për gati dy dekada, Room Lounge Cafe ka qenë pjesë e jetës së
              përditshme në Lipjan. Mijëra kafe janë shërbyer. Mijëra biseda
              kanë ndodhur. Miqësi janë krijuar. Festime janë ndarë. Kujtime
              janë krijuar.
            </p>
            <p>
              Ajo që filloi si një destinacion lokal për kafe, gradualisht u
              bë një nga vendet më të njohura të takimit në qytet. Përmes
              përmirësimit të vazhdueshëm, përkushtimit ndaj eksperiencës së
              klientëve, dhe lidhjeve të forta me komunitetin, Room ka fituar
              një vend special në zemrat e klientëve të vet.
            </p>
            <p className="font-display text-2xl italic text-gradient-gold pt-4">
              Sot, Room është më shumë se një kafene. Është pikë takimi për
              gjenerata.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 lg:px-10 bg-[var(--bg-soft)] border-y border-[var(--line)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Çfarë na bën Room"
            title="Vlerat tona"
          />
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card-luxe p-10">
                <div className="font-display text-3xl text-gradient-gold italic">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl mt-4 text-[#f5ede0]">{v.t}</h3>
                <p className="mt-4 text-[#a99c80] leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Rrugëtimi" title="Milestone-t" />
          <div className="mt-16 relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent" />
            {timeline.map((t, i) => (
              <div
                key={i}
                className={`relative pl-16 md:pl-0 mb-16 md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
                }`}
              >
                <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-2 w-6 h-6 rounded-full border-2 border-[var(--gold)] bg-[var(--bg)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                </div>
                <div className={i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}>
                  <div className="font-display text-5xl text-gradient-gold italic">{t.y}</div>
                  <h3 className="font-display text-2xl text-[#f5ede0] mt-2">{t.t}</h3>
                  <p className="text-[#a99c80] mt-3">{t.d}</p>
                </div>
                <div />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
