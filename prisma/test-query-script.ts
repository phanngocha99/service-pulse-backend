import { prisma } from './prisma.js';

async function main() {
  if (process.env.NAME_GROUP) {
    throw new Error('NAME_GROUP environment variable is not defined');
  }
  const group = await prisma.group.findUnique({
    where: {
      name: process.env.NAME_GROUP,
    },
  });
  console.log('Group:', JSON.stringify(group));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
