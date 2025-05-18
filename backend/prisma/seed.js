import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedData() {
  const hashAdminPassword = await bcrypt.hash("adminpassword", 10);
  const hashUserPassword = await bcrypt.hash("userpassword", 10);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: hashAdminPassword,
      role: "Admin",
    },
  });

  await prisma.user.create({
    data: {
      name: "User",
      email: "user@example.com",
      password: hashUserPassword,
      role: "User",
    },
  });

  console.log("Seed data created");
}

seedData()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
