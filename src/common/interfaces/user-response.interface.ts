export interface UserResponse {
  id: string;
  needToResetPassword: boolean;
  label: string | null;
  email: string | null;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;
}
