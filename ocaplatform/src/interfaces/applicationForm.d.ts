interface JobTitle {
  update: boolean;
  delta?: {
    company: string;
    candidate: string;
  };
}

interface WorkplaceType {
  update: boolean;
  delta?: {
    company?: number;
    candidate?: number;
  };
}

interface WorkingPeriod {
  update: boolean;
  delta?: {
    company: string;
    candidate: string;
  };
}

interface WorkHoursPerWeek {
  update: boolean;
  delta?: {
    company: number;
    candidate: number;
  };
}

interface Task {
  update: boolean;
  delta?: {
    company: {
      id: number | null;
      description?: string;
    };
    candidate: {
      id: number | null;
      description?: string;
    };
  };
}

export interface RequestApplicationForm {
  jobId: number;
  jobTypeId: number;
  jobTitle: JobTitle;
  workplaceType: WorkplaceType;
  workingPeriodStart: WorkingPeriod;
  workingPeriodEnd: WorkingPeriod;
  workHoursPerWeek: WorkHoursPerWeek;
  tasks: Task[];
  portfolio: string;
  email: string;
  phoneNumber: string;
  personalWebsites: string[];
  introduction: string;
  attachmentIds: number[];
}

export interface ResponseAttachments {
  id: number;
  md5: null;
  name: string;
  format: string;
  size: number;
  uploadUser: {
    userId: number;
    name: string;
    email: string;
  };
  uploadDate: string;
  downloadLink: string;
}
