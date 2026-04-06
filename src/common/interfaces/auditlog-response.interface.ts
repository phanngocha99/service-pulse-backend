export interface AuditLogResponse {
  id: string;
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
  incidentId: string;
  createdAt: Date;
  createdById: string;
}
