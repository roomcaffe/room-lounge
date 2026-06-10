# Room Lounge Cafe

Premium website + reservation system + admin dashboard për **Room Lounge Cafe** (Lipjan, Kosovë).

## Stack
- Next.js 16 (App Router · TypeScript · Turbopack)
- Tailwind CSS v4
- Prisma + SQLite
- JWT auth (jose) për admin panel
- WhatsApp deep-link confirmation workflow

## Setup

```bash
npm install
npx prisma generate
npx prisma db push
npm run seed       # krijon admin + tables + menu + events default
npm run dev        # http://localhost:3000
```

## Admin

- URL: `/admin/login`
- Email: `admin@roomloungecafe.com`
- Password: `room2007` ← **ndrysho në production**

## Faqet Publike

| Path | Përshkrim |
|------|-----------|
| `/` | Homepage premium (hero + brand story + drinks + events + gallery + map) |
| `/about` | Story 18-vjeçar + vlerat + timeline |
| `/menu` | Menu i plotë (DB-driven, me fallback) |
| `/events` | Live music, DJ nights, sports |
| `/gallery` | Galeri (DB-driven, me fallback tiles) |
| `/reservation` | Form rezervimi me 9 fusha + validim |
| `/contact` | Kontakt + Google Maps embed |

## Admin Panel

| Path | Përshkrim |
|------|-----------|
| `/admin` | Dashboard me statistika + rezervime për sot |
| `/admin/reservations` | Menaxhim i plotë (approve, reject, complete, no-show, note, WA confirm) |
| `/admin/events` | CRUD eventeve · publish/draft |
| `/admin/menu` | CRUD menu items |
| `/admin/tables` | CRUD tavolinash · zona, kapacitet, disponueshmëri |
| `/admin/gallery` | Upload + delete fotosh (në `public/uploads/`) |

## WhatsApp Workflow

Çdo rezervim ka 2 butona në admin panel:
- **Konfirmo + WhatsApp** → ndryshon statusin në `confirmed` + hap deep-link me mesazh konfirmimi
- **Refuzo + WhatsApp** → ndryshon statusin në `rejected` + hap deep-link me mesazh refuzimi

Mesazhet janë në Shqip, me datën formatuar `sq-AL`.

## Database Models

`AdminUser` · `Table` · `Reservation` · `Event` · `MenuItem` · `GalleryImage` · `Setting`

## Production Notes

1. Ndrysho `.env`:
   - `DATABASE_URL` (Postgres për prod, p.sh. Supabase / Neon)
   - `JWT_SECRET` (random string i ri)
   - `NEXT_PUBLIC_BUSINESS_*` (numri real, social handles)
2. Për Postgres: ndrysho `prisma/schema.prisma` `provider = "postgresql"` dhe re-migro.
3. Ndrysho admin password përmes seed ose direkt në DB.
4. Konsidero rate-limit në `/api/reservations` (Upstash Redis ose Vercel KV).
5. Për WhatsApp Business API: zëvendëso deep-link me Twilio/Meta Cloud API call.

## SEO

- Open Graph + Twitter cards në `layout.tsx`
- Keywords në Shqip + English
- Server-rendered pa hidratim të nevojshëm për content statik
- Albanian-first; English version mund të shtohet me i18n routing

---

**18 vite në zemër të Lipjanit. ☕**
