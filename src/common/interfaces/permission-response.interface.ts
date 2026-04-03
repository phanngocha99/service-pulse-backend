export interface PermissionResponse {
  id: string;
  label: string | null;
  action: string;
  resource: string;
  scope: string;
  fields: string[];
  active: boolean;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;
}
