import { RequestApplicationForm } from "../../interfaces/applicationForm";

const newFormDataFormatter = async (newFormData: any) => {
  const { step1, step2 } = newFormData;
  const formDataFormatted: RequestApplicationForm = {
    jobId: 0,
    jobTypeId: 0,
    jobTitle: {
      update: true,
      delta: {
        company: step1.currentJobTitle,
        candidate: step1.jobTitle,
      },
    },
    workplaceType: {
      update: true,
      delta: {
        company: 0,
        candidate: 0,
      },
    },
    workingPeriodStart: {
      update: true,
      delta: {
        company: "2024-09-30T07:01:19.907Z",
        candidate: "2024-09-30T07:01:19.907Z",
      },
    },
    workingPeriodEnd: {
      update: true,
      delta: {
        company: "2024-09-30T07:01:19.907Z",
        candidate: "2024-09-30T07:01:19.907Z",
      },
    },
    workHoursPerWeek: {
      update: true,
      delta: {
        company: step1.currentHoursPerWeek,
        candidate: step1.hoursPerWeek,
      },
    },
    tasks: [
      {
        update: true,
        delta: {
          company: {
            id: 0,
            description: "string",
          },
          candidate: {
            id: 0,
            description: "string",
          },
        },
      },
    ],
    portfolio: step2.portfolio,
    email: step2.email,
    phoneNumber: step2.phoneNumber,
    personalWebsites: step2.personalWebsite,
    introduction: step2.selfIntroduction,
    attachmentIds: step2.resume,
  };
  return formDataFormatted;
};

export { newFormDataFormatter };
