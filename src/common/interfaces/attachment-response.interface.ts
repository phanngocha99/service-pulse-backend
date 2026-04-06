export interface AttachmentResponse {
  id: string;
  description: string | null;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  incidentId: string;
  active: boolean;
  createdAt: Date;
}
