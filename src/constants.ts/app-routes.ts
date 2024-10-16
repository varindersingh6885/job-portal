export enum APP_ROUTES {
  LANDING = "/",

  // Job Seeker routes
  JOB_SEEKER_ONBOARDING = "/onboarding",
  JOB_SEEKER_DASHBOARD = "/dashboard",
  JOB_SEEKER_SEARCH_JOBS = "/search",
  JOB_SEEKER_VIEW_JOB = "/job/:jobId",

  JOB_SEEKER_APPLY_JOB = "/apply/:jobId",

  // Employer routes
  EMPLOYER_ONBOARDING = "/employer/onboarding",
  EMPLOYER_DASHBOARD = "/employer/dashboard",
  EMPLOYER_CREATE_JOB = "/employer/create-job",

  USER_PROFILE = "/profile",
}
