import { JobDetail } from "./home";

interface JobApplication {
  jobId: number;
  applicationId: number;
  jobTitle: string;
  negotiable: boolean;
  companyName: string;
  companyAvatarUrl: string;
  statusId: number;
  cityName: string;
  stateName: string;
  countryName: string;
  lastUpdateDate: string;
}

export interface JobApplicationBody {
  totalPages: number;
  totalElements: number;
  size: number;
  content: JobApplication[];
  totalElements: number;
}

interface JobApplicationDetail {
    applicationId: number;
    statusId: number;
    job: JobDetail;
    jobId: number;
    jobNegotiable: boolean;
    jobType: {
      id: number;
      name: string;
    };
    jobTitle: {
      negotiable: boolean;
      deltal: {
        company: string;
        candidate: string;
      };
    };
    workplaceType: {
      negotiable: boolean;
      deltal: {
        company: number;
        candidate: number;
      };
    };
    workPeriodStart: {
      negotiable: boolean;
      deltal: {
        company: string;
        candidate: string;
      };
    };
    workPeriodEnd: {
      negotiable: boolean;
      deltal: {
        company: string;
        candidate: string;
      };
    };
    workHoursPerWeek: {
      negotiable: boolean;
      deltal: {
        company: number;
        candidate: number;
      };
    };
    tasks: {
      negotiable: boolean;
      delta: {
        company: {
          id: number;
          description: string;
        };
        candidate: {
          id: number;
          description: string;
        };
      };
    }[];
    qualifications: {
      id: number;
      description: string;
    }[];
    attachment: {
      id: number;
      md5: string;
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
    }[];
    email: string;
    phoneNumber: string;
    portfolio: string;
    personalWebsites: string[];
    introduction: string;
    lastUpdateDate: string;
  }
  
