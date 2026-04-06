export interface SubCategoryResponse {
  id: string;
  name: string;
  label: string | null;
  description: string;
  categoryId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;
}
