import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { BcryptService } from '../src/common/bcrypt/bcrypt.service.ts';
import { PERMISSIONS } from '../src/permissions/enum/permissions.enum.ts';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  // USER - Create the "System Administrator" User
  const bscrypt = new BcryptService();
  if (process.env.PASS_ADMIN) {
    throw new Error('PASS_ADMIN environment variable is not defined');
  }
  if (process.env.PASS_NAME) {
    throw new Error('PASS_NAME environment variable is not defined');
  }
  const hashedPassword = await bscrypt.hashPassword(process.env.PASS_ADMIN!);
  const sysAdminUser = await prisma.user.upsert({
    where: { name: process.env.NAME_ADMIN! },
    update: {},
    create: {
      email: process.env.EMAIL_ADMIN,
      name: process.env.NAME_ADMIN!,
      password: hashedPassword,
      needToResetPassword: false,
      active: true,
    },
  });

  console.log(`${sysAdminUser.name} User created: ${sysAdminUser.email}`);

  // GROUP - Create the "Administrators" Group
  if (process.env.NAME_GROUP) {
    throw new Error('NAME_GROUP environment variable is not defined');
  }
  if (process.env.DESCRIPTION_GROUP) {
    throw new Error('DESCRIPTION_GROUP environment variable is not defined');
  }
  const adminGroup = await prisma.group.upsert({
    where: { name: process.env.NAME_GROUP },
    update: {},
    create: {
      name: process.env.NAME_GROUP!,
      description: process.env.DESCRIPTION_GROUP!,
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  // ROLE - Create an "admin" role
  if (process.env.NAME_ROLE) {
    throw new Error('NAME_GROUP environment variable is not defined');
  }
  if (process.env.DESCRIPTION_ROLE) {
    throw new Error('DESCRIPTION_ROLE environment variable is not defined');
  }
  const adminRole = await prisma.role.upsert({
    where: { name: process.env.NAME_ROLE },
    update: {},
    create: {
      name: process.env.NAME_ROLE!,
      description: process.env.DESCRIPTION_ROLE!,
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  //ROLE - Create permission set for USER table

  for (const p of PERMISSIONS) {
    await prisma.permission.upsert({
      where: {
        action_resource_scope: {
          action: p.action,
          resource: p.resource,
          scope: p.scope,
        },
      },
      update: {},
      create: { ...p },
    });
  }

  // --- Create MANY-TO-MANY ---

  //MMRolePermission
  for (const permision of PERMISSIONS) {
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

  console.log('...Seeding complete');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
