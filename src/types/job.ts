import { WORK_MODE } from "../constants.ts/job-filters";

export interface JobCreatePayload {
  title: string;
  description: string;
  descriptionDocumentUrl: string;
  descriptionDocumentFileName: string;
  cityId: number;
  stateId: number;
  countryId: number;
  maxExperience: number;
  minExperience: number;
  minSalary: number;
  maxSalary: number;
  // skills: number[]; // ! need to implement
  companyId: number;
  workMode: WORK_MODE;
  contactEmail: string;
  contactNumber: string;
}

export interface JobListItem {
  id: number;
  title: string;
  country: string;
  city: string;
  state: string;
  company: string;
  companyUrl: string;
  createdAt: string;
  workMode: string;
  jobStatus: boolean;
}
