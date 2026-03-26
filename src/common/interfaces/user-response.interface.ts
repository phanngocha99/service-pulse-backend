export interface UserResponse {
  id: number;
  name: string;
  email: string | null;
  needToResetPassword: boolean;
  active: boolean;
  createdAt: Date;
}
