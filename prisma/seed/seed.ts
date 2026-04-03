import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { BcryptService } from '../../src/common/bcrypt/bcrypt.service.ts';
import { PERMISSIONS_ADMIN } from './permissions-admin.sample.ts';
import { PERMISSIONS_USER } from './permissions-user.sample.ts';
import { Permission } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  // USER - Create the "System Administrator" User
  const bscrypt = new BcryptService();
  if (!process.env.PASS_ADMIN) {
    throw new Error('PASS_ADMIN environment variable is not defined');
  }
  if (!process.env.NAME_ADMIN) {
    throw new Error('NAME_ADMIN environment variable is not defined');
  }
  const hashedPassword = await bscrypt.hashPassword(process.env.PASS_ADMIN!);
  const sysAdminUser = await prisma.user.upsert({
    where: { name: process.env.NAME_ADMIN! },
    update: {},
    create: {
      id: '111111111111111111111111111a',
      label: 'System Administrator',
      email: process.env.EMAIL_ADMIN,
      name: process.env.NAME_ADMIN!,
      password: hashedPassword,
      needToResetPassword: false,
      active: true,
      createdById: '111111111111111111111111111a',
      updatedById: '111111111111111111111111111a',
    },
  });

  console.log(`${sysAdminUser.name} User created`);

  const testUser = await prisma.user.upsert({
    where: { name: 'test_user' },
    update: {},
    create: {
      label: 'Test User',
      email: '',
      name: 'test_user',
      password: await bscrypt.hashPassword('test_user123'),
      needToResetPassword: true,
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  console.log(`${testUser.name} User created`);

  // GROUP - Create the "Administrators" Group
  if (!process.env.NAME_GROUP) {
    throw new Error('NAME_GROUP environment variable is not defined');
  }
  if (!process.env.DESCRIPTION_GROUP) {
    throw new Error('DESCRIPTION_GROUP environment variable is not defined');
  }
  const adminGroup = await prisma.group.upsert({
    where: { name: process.env.NAME_GROUP },
    update: {},
    create: {
      label: 'System Administration Group',
      name: process.env.NAME_GROUP!,
      description: process.env.DESCRIPTION_GROUP!,
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  console.log(`${adminGroup.name} Group created`);

  // GROUP - Create the "Test" Group
  const testGroup = await prisma.group.upsert({
    where: { name: 'test' },
    update: {},
    create: {
      label: 'Test Group',
      name: 'test',
      description: 'Test Group for testing purpose',
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });
  console.log(`${testGroup.name} Group created`);

  // ROLE - Create an "admin" role
  if (!process.env.NAME_ROLE) {
    throw new Error('NAME_GROUP environment variable is not defined');
  }
  if (!process.env.DESCRIPTION_ROLE) {
    throw new Error('DESCRIPTION_ROLE environment variable is not defined');
  }
  const adminRole = await prisma.role.upsert({
    where: { name: process.env.NAME_ROLE },
    update: {},
    create: {
      label: 'Admin Role',
      name: process.env.NAME_ROLE!,
      description: process.env.DESCRIPTION_ROLE!,
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  console.log(`${adminRole.name} Role created`);

  // ROLE - Create an "test" role
  const testRole = await prisma.role.upsert({
    where: { name: 'test' },
    update: {},
    create: {
      label: 'Test Role',
      name: 'test',
      description: 'Test Role for testing purpose',
      active: true,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  console.log(`${testRole.name} Role created`);

  //PERMISSIONS - Create permissions for admin
  const dbPermissionsForAdmin: Permission[] = [];
  for (const p of PERMISSIONS_ADMIN) {
    const upsertedPermissionAdmin = await prisma.permission.upsert({
      where: {
        action_resource_scope_fields: {
          action: p.action,
          resource: p.resource,
          scope: p.scope,
          fields: p.fields,
        },
      },
      update: {
        description: p.description,
        fields: p.fields,
      },
      create: {
        label: p.action + '_' + p.resource + '_' + p.scope + '_' + p.fields,
        action: p.action,
        resource: p.resource,
        scope: p.scope,
        description: p.description,
        fields: p.fields,
        active: true,
        createdById: sysAdminUser.id,
        updatedById: sysAdminUser.id,
      },
    });
    dbPermissionsForAdmin.push(upsertedPermissionAdmin);
  }

  console.log(`Permissions for admin are created`);

  //PERMISSIONS - Create permissions for user
  const dbPermissionsForUser: Permission[] = [];

  for (const p of PERMISSIONS_USER) {
    const upsertedPermissionUser = await prisma.permission.upsert({
      where: {
        action_resource_scope_fields: {
          action: p.action,
          resource: p.resource,
          scope: p.scope,
          fields: p.fields,
        },
      },
      update: {
        description: p.description,
        fields: p.fields,
      },
      create: {
        label: p.action + '_' + p.resource + '_' + p.scope + '_' + p.fields,
        action: p.action,
        resource: p.resource,
        scope: p.scope,
        description: p.description,
        fields: p.fields,
        active: true,
        createdById: sysAdminUser.id,
        updatedById: sysAdminUser.id,
      },
    });
    dbPermissionsForUser.push(upsertedPermissionUser);
  }
  console.log(`Permissions for test user are created`);

  // --- Create MANY-TO-MANY ---
  // MMGroupRole
  // Admin
  await prisma.mMGroupRole.upsert({
    where: {
      groupId_roleId: { groupId: adminGroup.id, roleId: adminRole.id },
    },
    update: {},
    create: {
      groupId: adminGroup.id,
      roleId: adminRole.id,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  // User
  await prisma.mMGroupRole.upsert({
    where: {
      groupId_roleId: { groupId: testGroup.id, roleId: testRole.id },
    },
    update: {},
    create: {
      groupId: testGroup.id,
      roleId: testRole.id,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });

  console.log(`Roles are added for Admin and Test Group`);

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
      updatedById: sysAdminUser.id,
    },
  });

  await prisma.mMUserGroup.upsert({
    where: {
      userId_groupId: { userId: testUser.id, groupId: testGroup.id },
    },
    update: {},
    create: {
      userId: testUser.id,
      groupId: testGroup.id,
      createdById: sysAdminUser.id,
      updatedById: sysAdminUser.id,
    },
  });
  console.log(`Admin and Test User are added for Admin and Test Group`);

  //MMRolePermission
  for (const dbPerm of dbPermissionsForAdmin) {
    await prisma.mMRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: dbPerm.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: dbPerm.id,
        createdById: sysAdminUser.id,
        updatedById: sysAdminUser.id,
      },
    });
  }

  for (const dbPerm of dbPermissionsForUser) {
    await prisma.mMRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: testRole.id,
          permissionId: dbPerm.id,
        },
      },
      update: {},
      create: {
        roleId: testRole.id,
        permissionId: dbPerm.id,
        createdById: sysAdminUser.id,
        updatedById: sysAdminUser.id,
      },
    });
  }

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
