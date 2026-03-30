export const PERMISSIONS = [
  // USER
  {
    action: 'create',
    resource: 'user',
    scope: 'global',
    description: 'Can create new susers',
    fields: ['all'],
  },
  {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read new users',
    fields: ['all'],
  },
  {
    action: 'update',
    resource: 'user',
    scope: 'global',
    description: 'Can update new users',
    fields: ['all'],
  },
  {
    action: 'delete',
    resource: 'user',
    scope: 'global',
    description: 'Can delete new users',
    fields: ['all'],
  },

  // GROUP
  {
    action: 'create',
    resource: 'group',
    scope: 'global',
    description: 'Can create new groups',
    fields: ['all'],
  },
  {
    action: 'read',
    resource: 'group',
    scope: 'global',
    description: 'Can read new groups',
    fields: ['all'],
  },
  {
    action: 'update',
    resource: 'group',
    scope: 'global',
    description: 'Can update new groups',
    fields: ['all'],
  },
  {
    action: 'delete',
    resource: 'group',
    scope: 'global',
    description: 'Can delete new groups',
    fields: ['all'],
  },

  // ROLE
  {
    action: 'create',
    resource: 'role',
    scope: 'global',
    description: 'Can create new roles',
    fields: ['all'],
  },
  {
    action: 'read',
    resource: 'role',
    scope: 'global',
    description: 'Can read new roles',
    fields: ['all'],
  },
  {
    action: 'update',
    resource: 'role',
    scope: 'global',
    description: 'Can update new roles',
    fields: ['all'],
  },
  {
    action: 'delete',
    resource: 'role',
    scope: 'global',
    description: 'Can delete new roles',
    fields: ['all'],
  },
];
