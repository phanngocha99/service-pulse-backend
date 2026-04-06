export const PERMISSIONS_GLOBAL = {
  // -- USER -- //

  // ADMIN
  ADMIN_READ_USER: {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read new users',
    fields: ['all'],
  },
  ADMIN_CREATE_USER: {
    action: 'create',
    resource: 'user',
    scope: 'global',
    description: 'Can create new users',
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

  ADMIN_CREATE_MMUSERGROUP: {
    action: 'create',
    resource: 'mMUserGroup',
    scope: 'global',
    description: 'Can assign user to group',
    fields: ['all'],
  },

  ADMIN_DELETE_MMUSERGROUP: {
    action: 'delete',
    resource: 'mMUserGroup',
    scope: 'global',
    description: 'Remove assign user to group',
    fields: ['all'],
  },

  //   SELFSERVICE
  SELFSERVICE_READ_USER: {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read my profile',
    fields: ['active', 'createdAt', 'email', 'id', 'label', 'name'],
  },

  SELFSERVICE_UPDATE_USER: {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read my profile',
    fields: ['email', 'id', 'label'],
  },

  /// -- GROUP -- //

  // ADMIN
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

  //  SELFSERVICE

  SELFSERVICE_READ_GROUP: {
    action: 'read',
    resource: 'group',
    scope: 'global',
    description: 'Can read group of me',
    fields: [
      'active',
      'createdAt',
      'createdById',
      'description',
      'id',
      'label',
      'name',
      'updatedAt',
      'updatedById',
    ],
  },

  // -- ROLE -- //

  // ADMIN
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

  // SELFSERVICE

  SELFSERVICE_READ_ROLE: {
    action: 'read',
    resource: 'role',
    scope: 'global',
    description: 'Can read role of me',
    fields: [
      'active',
      'createdAt',
      'createdById',
      'description',
      'id',
      'label',
      'name',
      'updatedAt',
      'updatedById',
    ],
  },

  // -- PERMISSION -- //

  // ADMIN
  ADMIN_READ_PERMISSION: {
    action: 'read',
    resource: 'permission',
    scope: 'global',
    description: 'Can read permissions for users/groups/roles',
    fields: ['all'],
  },

  ADMIN_UPDATE_PERMISSION: {
    action: 'update',
    resource: 'permission',
    scope: 'global',
    description: 'Can update permissions for users/groups/roles',
    fields: ['all'],
  },

  ADMIN_CREATE_PERMISSION: {
    action: 'create',
    resource: 'permission',
    scope: 'global',
    description: 'Can create permissions for users/groups/roles',
    fields: ['all'],
  },

  ADMIN_DELETE_PERMISSION: {
    action: 'delete',
    resource: 'permission',
    scope: 'global',
    description: 'Can delete permissions for users/groups/roles',
    fields: ['all'],
  },

  // SELFSERVICE

  SELFSERVICE_READ_PERMISSION: {
    action: 'read',
    resource: 'permission',
    scope: 'global',
    description: 'Can read own permissions',
    fields: [
      'action',
      'active',
      'description',
      'fields',
      'id',
      'label',
      'resource',
      'scope',
    ],
  },

  // -- CATEGORY --
  ADMIN_CREATE_CATEGORY: {
    action: 'create',
    resource: 'category',
    scope: 'global',
    description: 'Can create new categories',
    fields: ['all'],
  },
  ADMIN_READ_CATEGORY: {
    action: 'read',
    resource: 'category',
    scope: 'global',
    description: 'Can read categories',
    fields: ['all'],
  },
  ADMIN_UPDATE_CATEGORY: {
    action: 'update',
    resource: 'category',
    scope: 'global',
    description: 'Can update categories',
    fields: ['all'],
  },
  ADMIN_DELETE_CATEGORY: {
    action: 'delete',
    resource: 'category',
    scope: 'global',
    description: 'Can delete categories',
    fields: ['all'],
  },

  // -- SUBCATEGORY --

  ADMIN_CREATE_SUBCATEGORY: {
    action: 'create',
    resource: 'subcategory',
    scope: 'global',
    description: 'Can create new subcategories',
    fields: ['all'],
  },
  ADMIN_READ_SUBCATEGORY: {
    action: 'read',
    resource: 'subcategory',
    scope: 'global',
    description: 'Can read subcategories',
    fields: ['all'],
  },
  ADMIN_UPDATE_SUBCATEGORY: {
    action: 'update',
    resource: 'subcategory',
    scope: 'global',
    description: 'Can update subcategories',
    fields: ['all'],
  },
  ADMIN_DELETE_SUBCATEGORY: {
    action: 'delete',
    resource: 'subcategory',
    scope: 'global',
    description: 'Can delete subcategories',
    fields: ['all'],
  },

  // -- INCIDENT --
  ADMIN_CREATE_INCIDENT: {
    action: 'create',
    resource: 'incident',
    scope: 'global',
    description: 'Can create new incidents',
    fields: ['all'],
  },
  ADMIN_READ_INCIDENT: {
    action: 'read',
    resource: 'incident',
    scope: 'global',
    description: 'Can read incidents',
    fields: ['all'],
  },
  ADMIN_UPDATE_INCIDENT: {
    action: 'update',
    resource: 'incident',
    scope: 'global',
    description: 'Can update incidents',
    fields: ['all'],
  },
  ADMIN_DELETE_INCIDENT: {
    action: 'delete',
    resource: 'incident',
    scope: 'global',
    description: 'Can delete incidents',
    fields: ['all'],
  },
};
