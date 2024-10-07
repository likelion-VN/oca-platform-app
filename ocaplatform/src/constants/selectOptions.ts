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
  { value: -1, label: "All" },
  { value: 0, label: "Interested" },
  { value: 1, label: "Applied" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Accepted" },
  { value: 5, label: "Closed" },
];

export {
  ApplicationTab,
  ApplicationTermsOptions,
  JobTypeOptions,
  WorkTypeOptions
};

