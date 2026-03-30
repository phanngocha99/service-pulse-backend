export const PERMISSIONS_GLOBAL = {
  // ADMIN
  ADMIN_CREATE_USER: {
    action: 'create',
    resource: 'user',
    scope: 'global',
    description: 'Can create new susers',
    fields: ['all'],
  },
  ADMIN_READ_USER: {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read new users',
    fields: ['all'],
  },
  ADMIN_UPDATE_USER: {
    action: 'update',
    resource: 'user',
    scope: 'global',
    description: 'Can update new users',
    fields: ['all'],
  },
  ADMIN_DELETE_USER: {
    action: 'delete',
    resource: 'user',
    scope: 'global',
    description: 'Can delete new users',
    fields: ['all'],
  },

  // GROUP
  ADMIN_CREATE_GROUP: {
    action: 'create',
    resource: 'group',
    scope: 'global',
    description: 'Can create new groups',
    fields: ['all'],
  },
  ADMIN_READ_GROUP: {
    action: 'read',
    resource: 'group',
    scope: 'global',
    description: 'Can read new groups',
    fields: ['all'],
  },
  ADMIN_UPDATE_GROUP: {
    action: 'update',
    resource: 'group',
    scope: 'global',
    description: 'Can update new groups',
    fields: ['all'],
  },
  ADMIN_DELETE_GROUP: {
    action: 'delete',
    resource: 'group',
    scope: 'global',
    description: 'Can delete new groups',
    fields: ['all'],
  },

  // ROLE
  ADMIN_CREATE_ROLE: {
    action: 'create',
    resource: 'role',
    scope: 'global',
    description: 'Can create new roles',
    fields: ['all'],
  },
  ADMIN_READ_ROLE: {
    action: 'read',
    resource: 'role',
    scope: 'global',
    description: 'Can read new roles',
    fields: ['all'],
  },
  ADMIN_UPDATE_ROLE: {
    action: 'update',
    resource: 'role',
    scope: 'global',
    description: 'Can update new roles',
    fields: ['all'],
  },
  ADMIN_DELETE_ROLE: {
    action: 'delete',
    resource: 'role',
    scope: 'global',
    description: 'Can delete new roles',
    fields: ['all'],
  },

  // MMUSERGROUP
  ADMIN_CREATE_MMUSERGROUP: {
    action: 'create',
    resource: 'mmUserGroup',
    scope: 'global',
    description: 'Can assign user to group',
    fields: ['all'],
  },

  ADMIN_DELETE_MMUSERGROUP: {
    action: 'delete',
    resource: 'mmUserGroup',
    scope: 'global',
    description: 'Remove assign user to group',
    fields: ['all'],
  },

  //   ME
  ME_READ_USER: {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read my profile',
    fields: ['name,email'],
  },
};
