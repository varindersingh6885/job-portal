export interface ApplicationManualPayload {
  jobId: number;
  candidateId: string;
  resumeUrl: string;
  resumeName: string;
  manualApplication: boolean;
  expectedSalary: number;
  candidateNote?: string;
}

export interface ApplicationDetails extends ApplicationManualPayload {
  id: number;
  status: string;
  createdAt: string;
  candidateFirstName: string;
}
