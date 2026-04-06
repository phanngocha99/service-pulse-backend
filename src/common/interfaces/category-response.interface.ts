export interface CategoryResponse {
  id: string;
  name: string;
  label: string | null;
  urlProject: string | null;
  description: string;
  defaultgroupId: string;
  subCategoryId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;
}
