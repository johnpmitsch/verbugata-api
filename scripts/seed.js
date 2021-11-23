const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$connect();
  await prisma.language.upsert({
    where: {
      name: "portuguese",
    },
    update: {},
    create: {
      name: "portuguese",
    },
  });

  const lang = await prisma.language.findUnique({
    where: {
      name: "portuguese",
    },
  });

  console.log(lang);
};

seed();
