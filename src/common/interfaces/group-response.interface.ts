export interface GroupResponse {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: number;
  updatedById: number;
}
