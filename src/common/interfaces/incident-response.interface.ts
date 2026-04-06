import { IncidentStatus, Impact, Urgency, OnHoldReason } from '@prisma/client';

export interface IncidentResponse {
  id: string;
  number: number;
  active: boolean;
  title: string;
  shortDescription: string;
  description: string;
  status: IncidentStatus;
  categoryId: string;
  subCategoryId: string;
  impact: Impact;
  urgency: Urgency;
  priority: number;
  assignmentGroupId: string | null;
  assignedToId: string | null;
  openedById: string;
  callerId: string | null;
  resolutionNotes: string | null;
  resolvedAt: Date | null;
  closedAt: Date | null;
  onHoldReason: OnHoldReason | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  updatedById: string;
}
