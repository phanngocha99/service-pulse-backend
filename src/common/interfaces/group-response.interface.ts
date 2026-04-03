export interface GroupResponse {
  id: string;
  name: string;
  label: string | null;
  description: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;
}
