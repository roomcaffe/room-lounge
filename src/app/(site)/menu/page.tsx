import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuView } from "@/components/menu/MenuView";

export const metadata: Metadata = {
  title: "Menu",
  description: "Coffee, cocktails, fresh drinks dhe më shumë në Room Lounge, Lipjan.",
};

export const revalidate = 60;

export default async function MenuPage() {
  let items: {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string | null;
  }[] = [];
  try {
    items = await prisma.menuItem.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        description: true,
      },
    });
  } catch (err) {
    console.error("[menu] failed", err);
  }

  return <MenuView items={items} />;
}
