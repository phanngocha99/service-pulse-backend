import { prisma } from '../lib/prisma';

async function main() {
  // Fetch group with group name
  const group = await prisma.group.findUnique({
    where: {
      name: 'Administrators',
    },
  });
  console.log('Group:', JSON.stringify(group, null, 2));
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
