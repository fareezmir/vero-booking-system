import { PrismaClient } from "@prisma/client";
import type { Physician } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Prepopulate physicians with mock data
  const physicians: Physician[] = await Promise.all([
    prisma.physician.create({
      data: { name: "Dr. Sarah Chen", specialty: "Cardiology" },
    }),
    prisma.physician.create({
      data: { name: "Dr. Faraz Khan", specialty: "Dermatology" },
    }),
    prisma.physician.create({
      data: { name: "Dr. Eric Mills", specialty: "Endocrinology" },
    }),
  ]);

  // Prepopulate times with mock data
  const slotTimes: Date[] = [
    new Date("2026-05-12T09:00:00"),
    new Date("2026-05-12T10:00:00"),
    new Date("2026-05-12T11:00:00"),
    new Date("2026-05-13T09:00:00"),
    new Date("2026-05-13T14:00:00"),
    new Date("2026-05-14T10:00:00"),
    new Date("2026-05-14T15:00:00"),
  ];

  for (const physician of physicians) {
    for (const datetime of slotTimes) {
      await prisma.slot.create({
        data: {
          physicianId: physician.id,
          datetime,
        },
      });
    }
  }

  console.log("Seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
