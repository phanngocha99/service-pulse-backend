export const PERMISSIONS_USER = [
  // USER
  {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read my profile',
    fields: ['active', 'createdAt', 'email', 'id', 'label', 'name'],
    createdById: '111111111111111111111111111a',
    updatedById: '111111111111111111111111111a',
  },
  {
    action: 'read',
    resource: 'user',
    scope: 'global',
    description: 'Can read my profile',
    fields: ['email', 'id', 'label'],
    createdById: '111111111111111111111111111a',
    updatedById: '111111111111111111111111111a',
  },

  // GROUP

  {
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
    createdById: '111111111111111111111111111a',
    updatedById: '111111111111111111111111111a',
  },

  // ROLE
  {
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
    createdById: '111111111111111111111111111a',
    updatedById: '111111111111111111111111111a',
  },

  // PERMISSION
  {
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
    createdById: '111111111111111111111111111a',
    updatedById: '111111111111111111111111111a',
  },
];
