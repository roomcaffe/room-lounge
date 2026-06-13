# Room Lounge — Redesign V2 "Immersive"

> Drejtimi i zgjedhur: **C** — eksperiencë interaktive, jo faqe.

## 🎯 Vizioni
RoomCaffe nuk është një website. Është **një hyrje virtuale në lounge**. Vizitori e ndjen vendin para se të vijë.

## 🧱 Stack Additions
- `three` + `@react-three/fiber` + `@react-three/drei` — 3D hero/floor plan
- `@studio-freight/lenis` — smooth scroll inertia
- `framer-motion` ✓ (instaluar) — micro-animations, page transitions
- `motion-canvas` ose CSS Houdini — vibe meter
- `partysocket` ose Pusher — live vibe sync (opsional, faza 3)

## 🗺️ Site Map (i ri)
```
/                   → Immersive entry (3D, scroll-jacked)
/reserve            → Interactive floor plan reservation
/menu               → Interactive menu (categories on rotation cylinder)
/events             → Events feed + ticketing
/story              → 18 vite në kapituj (ish /about, story-driven)
/visit              → Visit (ish /contact, me map embed live)
/gallery            → Cinematic gallery (masonry + lightbox 3D)
/member             → Member's Lounge (loyalty, perks) — Faza 3
/admin/*            → Admin (e ruajmë, e përmirësojmë)
```

## 🎨 Design System V2
**Palette (re-thought):**
- `obsidian`: `#0d0a08` (më e errët se aktuali)
- `cream`: `#f4ead8` (kontrast i fortë)
- `ember`: `#d97942` (accent i ngrohtë — espresso glow)
- `gold`: `#c9a86a` (i ruajmë por sekondar tani)
- `smoke`: `rgba(255,255,255,0.04)` (glassmorphism)

**Tipografi:**
- Display: **Fraunces** (variable, më modern se Cormorant)
- Body: **Inter** (i mbajmë)
- Accent/Mono: **JetBrains Mono** (për "live now" widget, timestamps)

**Motion principles:**
- Çdo gjë lëviz por **ngadalë** dhe me **ease-out-expo**
- Cursor follows me lag 0.08
- Hover states me magnetic pull
- Page transitions me View Transitions API

## 🚀 Komponente Hero (faqja kryesore)
1. **3D Hero** — interior i stilizuar i lounge-it, kamera lëviz me scroll
2. **Live Vibe Widget** — top-right, sticky: çfarë po ndodh tani
3. **Chapter Scroll** — secila section një kapitull (1, 2, 3...)
4. **Interactive Floor Plan** — për prenotim, tap mbi tavolinë
5. **Cinematic Gallery Reel** — auto-scroll horizontal me parallax
6. **Sound Toggle** — ambient lounge audio (off by default)

## 📐 Faza e implementimit

### Phase 1 — Foundation (sot)
- [x] Install: three, fiber, drei, lenis
- [ ] Re-write `globals.css` me design system V2
- [ ] Update `layout.tsx` me fonts të reja + Lenis provider
- [ ] Custom cursor component
- [ ] Page transition wrapper

### Phase 2 — Home (sot/nesër)
- [ ] 3D Hero scene (lounge interior, low-poly stilizuar)
- [ ] Scroll-driven camera path
- [ ] Chapter system me Framer
- [ ] Live Vibe Widget (mock data, pastaj DB-driven)

### Phase 3 — Reservation Reinvented
- [ ] Floor plan 2D top-view interaktiv (SVG, jo 3D — më i shpejtë)
- [ ] Time picker me circular dial
- [ ] Real-time availability nga DB
- [ ] Konfirmim me WhatsApp deep-link (e ruajmë)

### Phase 4 — Menu & Events
- [ ] Menu si "cards on cylinder" 3D scroll
- [ ] Events grid me cover image full-bleed + countdown
- [ ] Ticket booking (Stripe ose Cashless?)

### Phase 5 — Story / Visit / Gallery
- [ ] Story: 18 vite në kapituj scroll-jacked
- [ ] Visit: Google Maps embed + opening hours live ("open now")
- [ ] Gallery: masonry me lightbox premium

### Phase 6 — Polish & Performance
- [ ] Bilingual SQ/EN toggle
- [ ] PWA me push notifications
- [ ] OG images dinamike
- [ ] Lighthouse 95+
- [ ] Analytics (Plausible)

## 🎬 Vibe references
- **rosewoodhotels.com** (cinematic luxury)
- **noma.dk** (chapter storytelling)
- **boscobakes.com** (3D playful)
- **studiomalka.com** (immersive)
- **bruno-simon.com** (3D mastery — referencë teknike)

---

*Krijuar: 2026-06-12 · Berix / Arlind*
