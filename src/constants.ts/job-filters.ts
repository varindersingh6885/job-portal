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
