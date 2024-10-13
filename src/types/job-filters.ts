import { JOB_STATUS, WORK_MODE } from "../constants.ts/job-filters";

export interface JobFilters {
  cityIds?: number[];
  stateIds?: number[];
  countryIds?: number[];
  companyIds?: number[];
  experience?: number;
  minSalary?: number;
  keyword?: string;
  title?: string;
  workMode?: WORK_MODE;
  jobStatus?: JOB_STATUS;
}
