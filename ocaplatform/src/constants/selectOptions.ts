const JobTypeOptions = [
  { value: 1, label: "Internship" },
  { value: 2, label: "Full-time", isDisabled: true },
  { value: 3, label: "Part-time", isDisabled: true },
];

const ApplicationTermsOptions = [
  { value: "nonnegotiable", label: "Non-negotiable" },
  { value: "negotiable", label: "Negotiable" },
];

const WorkTypeOptions = [
  { value: 1, label: "Remote" },
  { value: 2, label: "Hybrid" },
  { value: 3, label: "Onsite" },
];

const ApplicationTab = [
  { value: "all", label: "All" },
  { value: "interested", label: "Interested" },
  { value: "applied", label: "Applied" },
  { value: "inProgress", label: "In Progress" },
  { value: "accepted", label: "Accepted" },
  { value: "closed", label: "Closed" },
];

export {
  ApplicationTab,
  ApplicationTermsOptions,
  JobTypeOptions,
  WorkTypeOptions
};

