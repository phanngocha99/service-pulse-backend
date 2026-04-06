export interface CommentResponse {
  id: string;
  text: string;
  isInternal: boolean;
  incidentId: string;
  active: boolean;
  createdAt: Date;
  createdById: string;
}
