import { UISelectItem } from "../components/UISelect";

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileDescription: string;
  countryId: number;
  stateId: number;
  cityId: number;
  skills: number[];
  experience: number | string;
  resumeUrl: string;
  resumeName: string;
  githubUsername: string;
}

export interface CandidateProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileDescription: string;
  country: UISelectItem;
  state: UISelectItem;
  city: UISelectItem;
  skills: UISelectItem[];
  experience: number;
  resumeUrl: string;
  githubUsername: string;
  phoneNumber: string;
  resumeName: string;
  expectedSalary: number;
  userId: string;
}
