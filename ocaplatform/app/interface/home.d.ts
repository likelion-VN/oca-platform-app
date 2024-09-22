export interface RequestHomePageBody {
  jobTitle?: string;
  jobTypeId: number;
  negotiable: boolean;
  workplaceTypeId: number;
  countryId: number;
  searchOptionId: number;
}

export interface Job {
  jobId: number;
  jobTitle: string;
  companyName: string;
  countryName: string;
  stateName: string;
  keywords: string;
  negotiable: string;
  postDateTime: string;
  marked: boolean;
  companyAvatarUrl: string;
}

export interface JobBody {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Job[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  pageable: {
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    unpaged: boolean;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface State {
  id: number;
  name: string;
}

export interface StateOption {
  label: string;
  value: string;
}

export interface JobDetail {
  id: number;
  title: string;
  location: {
    country: string;
    state: string;
  };
  keywords: {
    name: string;
  }[];
  negotiable: boolean;
  description: string;
  hoursPerWeek: number;
  workStart: string;
  workEnd: string;
  postDate: string;
  jobType: {
    id: number;
    name: string;
  };
  workplaceType: {
    id: number;
    name: string;
  };
  company: {
    id: number;
    name: string;
    companySize: string;
    companyOverview: string;
  };
  tasks: {
    id: number;
    description: string;
  }[];
  qualifications: {
    id: number;
    description: string;
  }[];
}
