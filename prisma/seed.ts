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

  // Tables
  const tableData = [
    // Indoor
    { name: "T-01", capacity: 4, area: "indoor" },
    { name: "T-02", capacity: 4, area: "indoor" },
    { name: "T-03", capacity: 2, area: "indoor" },
    { name: "T-04", capacity: 6, area: "indoor" },
    { name: "T-05", capacity: 4, area: "indoor" },
    // Outdoor
    { name: "O-01", capacity: 4, area: "outdoor" },
    { name: "O-02", capacity: 4, area: "outdoor" },
    { name: "O-03", capacity: 2, area: "outdoor" },
    // VIP
    { name: "VIP-01", capacity: 8, area: "vip", notes: "Lounge area me sofa" },
    { name: "VIP-02", capacity: 6, area: "vip" },
    // Stage
    { name: "S-01", capacity: 4, area: "stage" },
    { name: "S-02", capacity: 4, area: "stage" },
  ];
  for (const t of tableData) {
    await prisma.table.upsert({
      where: { id: t.name },
      update: {},
      create: { ...t, id: t.name },
    });
  }
  console.log(`✓ ${tableData.length} tables created`);

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
