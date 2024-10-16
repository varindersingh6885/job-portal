export interface ApplicationManualPayload {
  jobId: number;
  candidateId: string;
  resumeUrl: string;
  resumeName: string;
  manualApplication: true;
  expectedSalary: number;
  candidateNote?: string;
}
