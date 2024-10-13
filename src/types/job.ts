import { WORK_MODE } from "../constants.ts/job-filters";

export interface JobCreatePayload {
  title: string;
  description: string;
  cityId: number;
  stateId: number;
  countryId: number;
  experience: number;
  minSalary: number;
  skills: number[];
  companyId: number;
  workMode: WORK_MODE;
  salary: number;
  contactEmail: string;
  contactNumber: string;
}
