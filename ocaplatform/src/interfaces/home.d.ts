export interface RequestHomePageBody {
  jobTitle?: string;
  jobTypeId: number;
  negotiable: boolean | null;
  workplaceTypeIds: number[];
  cityId: number;
  stateId: number;
  countryId: number;
  searchOptionId: number;
}

export interface Job {
  jobId: number;
  jobTitle: string;
  companyName: string;
  countryName: string;
  stateName: string;
  cityName: string;
  keywords: string;
  negotiable: string;
  postDateTime: string;
  marked: boolean;
  companyAvatarUrl: string;
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort[];
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface JobBody {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Job[];
  // number: number;
  // sort: Sort[];
  // pageable: Pageable;
  // numberOfElements: number;
  // first: boolean;
  // last: boolean;
  // empty: boolean;
}

export interface City {
  countryId: number;
  country: string;
  stateId: number;
  state: string;
  cityId: number;
  city: string;
}

export interface JobDetail {
  id: number;
  title: string;
  location: {
    country: string;
    state: string;
    city: string;
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
  marked: boolean;
  applied: boolean;
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

export interface AutoCompletedBody {
  totalPages: number;
  size: number;
  content: { name: string }[];
  number: number;
  sort: Sort[];
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface LocationBody {
  totalPages: number;
  size: number;
  content: City[];
  number: number;
  sort: Sort[];
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
