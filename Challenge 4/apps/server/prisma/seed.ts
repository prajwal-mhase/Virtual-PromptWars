import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const roleNames = ["ADMIN", "MANAGER", "VOLUNTEER", "VENDOR", "VISITOR"] as const;
type RoleName = (typeof roleNames)[number];

async function main() {
  const passwordHash = await bcrypt.hash("StadiumOS2026!", 12);
  for (const name of roleNames) {
    await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
  }

  const roles = await prisma.role.findMany();
  const roleId = (name: RoleName) => roles.find((role) => role.name === name)!.id;

  const users = [
    ["Avery Chen", "admin@stadiumos.ai", "ADMIN"],
    ["Maya Singh", "manager@stadiumos.ai", "MANAGER"],
    ["Lena Ortiz", "volunteer@stadiumos.ai", "VOLUNTEER"],
    ["Noah Kim", "vendor@stadiumos.ai", "VENDOR"],
    ["Sam Carter", "visitor@stadiumos.ai", "VISITOR"]
  ] as const;

  for (const [name, email, role] of users) {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { name, email, roleId: roleId(role), passwordHash }
    });
  }

  const stadium = await prisma.stadium.upsert({
    where: { id: "stadium-metlife" },
    update: {},
    create: {
      id: "stadium-metlife",
      name: "MetLife Stadium",
      city: "East Rutherford",
      country: "USA",
      capacity: 82500,
      latitude: 40.8135,
      longitude: -74.0745
    }
  });

  await prisma.match.upsert({
    where: { id: "match-final-2026" },
    update: {},
    create: { id: "match-final-2026", stadiumId: stadium.id, homeTeam: "Finalist A", awayTeam: "Finalist B", kickoff: new Date("2026-07-19T19:00:00Z") }
  });

  await prisma.gate.createMany({
    data: ["Gate A", "Gate B", "Gate C", "Gate D", "Gate E", "Gate F"].map((name, index) => ({ stadiumId: stadium.id, name, latitude: 40.81 + index / 1000, longitude: -74.07 - index / 1000 })),
    skipDuplicates: true
  });

  await prisma.crowdZone.createMany({
    data: [
      { stadiumId: stadium.id, name: "North Plaza", density: 88, predictedDensity: 93, congestionRisk: "HIGH", x: 24, y: 18 },
      { stadiumId: stadium.id, name: "Gate C", density: 82, predictedDensity: 89, congestionRisk: "HIGH", x: 72, y: 30 },
      { stadiumId: stadium.id, name: "Family Zone", density: 41, predictedDensity: 47, congestionRisk: "LOW", x: 33, y: 70 }
    ],
    skipDuplicates: true
  });

  await prisma.parkingLot.createMany({
    data: [
      { stadiumId: stadium.id, name: "Lot A", capacity: 2100, occupancy: 1850, walkingMinutes: 7, latitude: 40.815, longitude: -74.079 },
      { stadiumId: stadium.id, name: "Lot B", capacity: 2200, occupancy: 1260, walkingMinutes: 11, latitude: 40.818, longitude: -74.083 },
      { stadiumId: stadium.id, name: "Accessible South", capacity: 420, occupancy: 310, walkingMinutes: 5, latitude: 40.807, longitude: -74.071 }
    ],
    skipDuplicates: true
  });

  const vendorOwner = await prisma.user.findUniqueOrThrow({ where: { email: "vendor@stadiumos.ai" } });
  await prisma.foodVendor.createMany({
    data: [
      { stadiumId: stadium.id, ownerId: vendorOwner.id, name: "Global Grill", cuisine: "International", queueMinutes: 9, inventory: { chicken: 420, wraps: 310, water: 900 } },
      { stadiumId: stadium.id, name: "Pitchside Tacos", cuisine: "Mexican", queueMinutes: 17, inventory: { tortillas: 780, beef: 280, salsa: 210 } }
    ],
    skipDuplicates: true
  });

  await prisma.incident.create({
    data: {
      title: "Medical assistance requested",
      description: "Guest fainted near section 239. Aisle is clear and staff are present.",
      location: "Section 239 Row K",
      severity: "HIGH",
      status: "IN_PROGRESS",
      assignedTeam: "Medical Alpha",
      timeline: { create: [{ message: "Medical Alpha dispatched; closest exit E2." }] }
    }
  });

  await prisma.equipment.createMany({
    data: [
      { stadiumId: stadium.id, name: "Escalator E7", category: "Vertical transport", healthScore: 64, failureRisk: "HIGH", nextMaintenanceAt: new Date("2026-07-11T20:10:00Z") },
      { stadiumId: stadium.id, name: "Chiller Plant 2", category: "HVAC", healthScore: 81, failureRisk: "MEDIUM", nextMaintenanceAt: new Date("2026-07-12T04:30:00Z") }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
