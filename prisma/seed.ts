import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminEmail = "admin@roomloungecafe.com";
  const adminPass = "room2007"; // CHANGE in production
  const hashed = await bcrypt.hash(adminPass, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      name: "Admin Room",
      role: "admin",
    },
  });
  console.log(`✓ Admin user: ${adminEmail} / ${adminPass}`);

  // Tables — 60 total, sipas planit arkitektonik archiEDU 02.4.2.33
  // Zonat: main (Salla Kryesore), bar (Bar Lounge), vip (VIP Lounge), terrace (Terrace)
  // Tipet: hr85 (katror i lartë 85x60), hr55 (rrethor i lartë 55),
  //        lr60 (rrethor i ulët 60), ls85 (katror i ulët 85x60),
  //        hr75 (rrethor i lartë 75 — feature), old (vjetër, riparu)
  const tableData: {
    name: string;
    capacity: number;
    area: string;
    notes?: string;
  }[] = [
    // BAR LOUNGE — 9 lr60 + 2 ls85
    ...["BAR-01","BAR-02","BAR-03","BAR-04","BAR-05","BAR-06","BAR-07","BAR-08","BAR-09"]
      .map(n => ({ name: n, capacity: 4, area: "bar", notes: "Rrethore e ulët 60cm · banquette" })),
    { name: "BAR-10", capacity: 4, area: "bar", notes: "Katrore e ulët 85×60 · banquette" },
    { name: "BAR-11", capacity: 4, area: "bar", notes: "Katrore e ulët 85×60 · banquette" },

    // SALLA KRYESORE — 12 hr55 + 6 hr85 + 6 old
    ...["M-G01","M-G02","M-G03","M-G04","M-G05","M-G06","M-G07","M-G08","M-G09","M-G10","M-G11","M-G12"]
      .map(n => ({ name: n, capacity: 2, area: "main", notes: "Rrethore e lartë 55cm" })),
    ...["M-R01","M-R02","M-R03","M-R04","M-R05","M-R06"]
      .map(n => ({ name: n, capacity: 4, area: "main", notes: "Katrore e lartë 85×60cm" })),
    ...["M-O01","M-O02","M-O03","M-O04","M-O05","M-O06"]
      .map(n => ({ name: n, capacity: 4, area: "main", notes: "Tavolinë e vjetër · për riparim" })),

    // VIP LOUNGE — 2 hr75 + 4 hr55 + 3 old
    { name: "VIP-Y01", capacity: 4, area: "vip", notes: "Feature · Rrethore e lartë 75cm" },
    { name: "VIP-Y02", capacity: 4, area: "vip", notes: "Feature · Rrethore e lartë 75cm" },
    ...["VIP-G01","VIP-G02","VIP-G03","VIP-G04"]
      .map(n => ({ name: n, capacity: 2, area: "vip", notes: "Rrethore e lartë 55cm · VIP" })),
    ...["VIP-O01","VIP-O02","VIP-O03"]
      .map(n => ({ name: n, capacity: 4, area: "vip", notes: "Tavolinë e vjetër · për riparim" })),

    // TERRACE — 6 old + 10 hr85
    ...["T-O01","T-O02","T-O03","T-O04","T-O05","T-O06"]
      .map(n => ({ name: n, capacity: 4, area: "terrace", notes: "Tavolinë e vjetër · për riparim" })),
    ...["T-R01","T-R02","T-R03","T-R04","T-R05","T-R06","T-R07","T-R08","T-R09","T-R10"]
      .map(n => ({ name: n, capacity: 4, area: "terrace", notes: "Katrore e lartë 85×60cm · outdoor" })),
  ];

  const wantedIds = new Set(tableData.map(t => t.name));

  for (const t of tableData) {
    await prisma.table.upsert({
      where: { id: t.name },
      update: {
        capacity: t.capacity,
        area: t.area,
        notes: t.notes,
      },
      create: { ...t, id: t.name },
    });
  }

  // Përpiqu të fshish tavolinat e vjetra që nuk janë më në plan,
  // por vetëm ato pa rezervime të lidhura (që mos të humbim historik).
  const existing = await prisma.table.findMany({
    where: { id: { notIn: Array.from(wantedIds) } },
    include: { _count: { select: { reservations: true } } },
  });
  for (const old of existing) {
    if (old._count.reservations === 0) {
      await prisma.table.delete({ where: { id: old.id } });
    } else {
      // Lëje, por shenjë-ja si "arkiv"
      await prisma.table.update({
        where: { id: old.id },
        data: { available: false, notes: `[arkiv] ${old.notes ?? ""}`.trim() },
      });
    }
  }

  console.log(`✓ ${tableData.length} tables upserted (legacy cleaned)`);

  // Menu items - sample
  const existingMenu = await prisma.menuItem.count();
  if (existingMenu === 0) {
    const menu = [
      { name: "Espresso", category: "coffee", price: 1.2, description: "Single shot · italian roast" },
      { name: "Espresso Doppio", category: "coffee", price: 1.8, description: "Double shot" },
      { name: "Cappuccino", category: "coffee", price: 1.8, description: "Espresso · milk foam · cocoa dust" },
      { name: "Caffè Latte", category: "coffee", price: 2.0, description: "Smooth · creamy" },
      { name: "Macchiato", category: "coffee", price: 1.5, description: "Espresso me njolla qumështi" },
      { name: "Iced Coffee", category: "coffee", price: 2.2, description: "Cold brew · ice · syrup" },
      { name: "Aperol Spritz", category: "cocktails", price: 4.5, description: "Aperol · prosecco · soda · orange" },
      { name: "Old Fashioned", category: "cocktails", price: 6.0, description: "Bourbon · sugar · angostura" },
      { name: "Mojito Royale", category: "cocktails", price: 5.0, description: "Rum · mint · lime · prosecco" },
      { name: "Negroni", category: "cocktails", price: 5.5, description: "Gin · campari · vermut" },
      { name: "Espresso Martini", category: "cocktails", price: 6.0, description: "Vodka · espresso · kahlua" },
      { name: "Fresh Lemonade", category: "soft", price: 2.5, description: "Lemon · mint · house syrup" },
      { name: "Orange Juice", category: "soft", price: 2.5, description: "Squeezed fresh" },
    ];
    for (let i = 0; i < menu.length; i++) {
      await prisma.menuItem.create({ data: { ...menu[i], sortOrder: i } });
    }
    console.log(`✓ ${menu.length} menu items created`);
  }

  // Events - sample
  const existingEvents = await prisma.event.count();
  if (existingEvents === 0) {
    const events = [
      {
        title: "Saturday Live Sessions",
        artist: "Roli & Band",
        date: new Date(Date.now() + 86400000 * 3),
        time: "22:00",
        description: "Net live music me energji premium.",
        status: "published",
      },
      {
        title: "Acoustic Nights",
        artist: "Edita Krasniqi",
        date: new Date(Date.now() + 86400000 * 7),
        time: "21:30",
        description: "Akustika më e bukur që ka mbajtur Room.",
        status: "published",
      },
      {
        title: "DJ Sunset Lounge",
        artist: "DJ Aksi",
        date: new Date(Date.now() + 86400000 * 10),
        time: "20:00",
        description: "House · deep · groove.",
        status: "published",
      },
    ];
    for (const e of events) await prisma.event.create({ data: e });
    console.log(`✓ ${events.length} events created`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
