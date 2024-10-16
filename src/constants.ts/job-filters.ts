export const enum WORK_MODE {
  REMOTE = "remote",
  ONSITE = "onsite",
  HYBRID = "hybrid",
}

export const enum JOB_STATUS {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export const WORK_MODE_SELECT_ITEMS = [
  { value: WORK_MODE.REMOTE, label: "Remote" },
  { value: WORK_MODE.HYBRID, label: "Hybrid" },
  { value: WORK_MODE.ONSITE, label: "Onsite" },
];

export const enum APPLICATION_STATUS {
  APPLIED = "applied",
  INTERVIEWING = "interviewing",
  HIRED = "hired",
  REJECTED = "rejected",
}

export const APPLICATION_STATUS_SELECT_ITEMS = [
  { value: APPLICATION_STATUS.APPLIED, label: "Applied" },
  { value: APPLICATION_STATUS.INTERVIEWING, label: "Interviewing" },
  { value: APPLICATION_STATUS.HIRED, label: "Hired" },
  { value: APPLICATION_STATUS.REJECTED, label: "Rejected" },
];
