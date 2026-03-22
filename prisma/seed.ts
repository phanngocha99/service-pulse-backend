import { PrismaClient } from '../generated/prisma';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  // USER - Create the "System Administrator" User
  const sysAdminUser = await prisma.user.upsert({
    where: { email: 'systemAdmin@servicepulse.be' },
    update: {},
    create: {
      email: 'systemAdmin@servicepulse.be',
      name: 'System Administrator',
      password: 'Admin@123',
      needToResetPassword: false,
      active: true,
    },
  });

  console.log(`"System Administrator" User created: ${sysAdminUser.email}`);

  // GROUP - Create the "Administrators" Group
  const adminGroup = await prisma.group.upsert({
    where: { name: 'Administrators' },
    update: {},
    create: {
      name: 'Administrators',
      description: 'Users with system-wide management rights',
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  // ROLE - Create an "admin" role
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Full system capabilities',
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  //ROLE - Create permission set for USER table
  const permissions = [
    {
      action: 'user:create',
      description: 'Can create new users',
      active: true,
    },
    { action: 'user:read', description: 'Can read user list', active: true },
    {
      action: 'user:update',
      description: 'Can update user list',
      active: true,
    },
    { action: 'user:delete', description: 'Can remove users', active: true },
  ];

  const createdPermissions = await Promise.all(
    permissions.map((p) =>
      prisma.permission.upsert({
        where: { action: p.action },
        update: {},
        create: {
          ...p,
          createdById: sysAdminUser.id,
          updatedById: sysAdminUser.id,
        },
      }),
    ),
  );

  // --- Create MANY-TO-MANY ---

  //MMRolePermission
  for (const permision of createdPermissions) {
    await prisma.mMRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permision.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permision.id,
        createdById: sysAdminUser.id,
      },
    });
  }

  // MMGroupRole
  await prisma.mMGroupRole.upsert({
    where: {
      groupId_roleId: { groupId: adminGroup.id, roleId: adminRole.id },
    },
    update: {},
    create: {
      groupId: adminGroup.id,
      roleId: adminRole.id,
      createdById: sysAdminUser.id,
    },
  });

  // MMUserGroup
  await prisma.mMUserGroup.upsert({
    where: {
      userId_groupId: { userId: sysAdminUser.id, groupId: adminGroup.id },
    },
    update: {},
    create: {
      userId: sysAdminUser.id,
      groupId: adminGroup.id,
      createdById: sysAdminUser.id,
    },
  });

  console.log(
    '...Seeding complete: System Administrator is in the Administrators group with admin role.',
  );
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
