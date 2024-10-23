interface JobUpdate {
  update: boolean;
  delta?: {
    company?: string | number | { id: number; description: string };
    candidate?: string | number | { id: number; description: string };
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

export interface Attachments {
  id: number;
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

export interface RequestApplicationForm {
  jobId: number;
  jobTypeId: number;
  jobTitle: JobUpdate;
  workplaceType: JobUpdate;
  workingPeriodStart: JobUpdate;
  workingPeriodEnd: JobUpdate;
  workHoursPerWeek: JobUpdate;
  tasks: Task[];
  portfolio: string;
  email: string;
  phoneNumber: string;
  personalWebsites: string[];
  introduction: string;
  selectedAttachmentId: number;
  attachmentIds: number[];
  applicationId?: number;
}

export interface RequestSendEmail {
  applicationId: number;
  contactNumber: {
    phoneValue: string;
    extension: string;
  };
  contactEmail: string;
  message: string;
}

export interface RequestScheduleInterview {
  applicationId: number;
  position: string;
  interviewDate: string;
  interviewTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  timezoneId: number;
  contactNumber: string;
  contactEmail: string;
  message: string;
}
