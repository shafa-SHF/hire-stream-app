const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");
  // This clears old data so you don't get duplicates
  await prisma.job.deleteMany(); 

  await prisma.job.create({
    data: {
      title: "IT Staff / IT Officer",
      company: "PT. FM Global Logistics",
      location: "Jakarta",
      salary: "Rp 6.000.000 – Rp 8.000.000",
      description: "Join PT. FM Global Logistics as an IT Staff."
    }
  });

  await prisma.job.create({
    data: {
      title: "Senior Software Engineer",
      company: "HireStream Tech",
      location: "Remote",
      salary: "Rp 15.000.000 – Rp 25.000.000",
      description: "Build the future of recruitment."
    }
  });
  console.log("✅ Seed successful!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });