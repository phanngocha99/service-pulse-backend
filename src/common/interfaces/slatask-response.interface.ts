import { SLAType, SLAStatus } from '@prisma/client';

export interface SLATaskResponse {
  id: string;
  incidentId: string;
  description: string;
  active: boolean;
  type: SLAType;
  startTime: Date;
  endTime: Date | null;
  actualEndTime: Date | null;
  status: SLAStatus;
  pausedDuration: number;
  lastPausedAt: Date | null;
}
