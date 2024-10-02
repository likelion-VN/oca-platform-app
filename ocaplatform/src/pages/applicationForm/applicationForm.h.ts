import _ from "lodash";
import { WorkTypeOptions } from "../../constants/selectOptions";
import { RequestApplicationForm } from "../../interfaces/applicationForm";

const newFormDataFormatter = (newFormData: any) => {
  const { jobId, jobTypeId, step1, step2 } = newFormData;
  const newListTask = _.filter(step1.currentTasks, task => !_.isNil(task.description) && !_.isNil(task.newTask));
  const formDataFormatted: RequestApplicationForm = {
    jobId,
    jobTypeId,
    jobTitle: {
      update: !!step1.jobTitle,
      delta: !!step1.jobTitle
        ? {
            company: step1.currentJobTitle,
            candidate: step1.jobTitle,
          }
        : undefined,
    },
    workplaceType: {
      update: !!step1.workplaceType,
      delta: !step1.workplaceType
        ? {
            company: _.find(WorkTypeOptions, item => item.label === step1.currentWorkplaceType)?.value,
            candidate: _.find(WorkTypeOptions, item => item.label === step1.workplaceType)?.value,
          }
        : undefined,
    },
    workingPeriodStart: {
      update: !!step1.startDate,
      delta: !!step1.startDate ? {
        company: step1.currentStartDate,
        candidate: step1.startDate,
      } : undefined,
    },
    workingPeriodEnd: {
      update: !!step1.endDate,
      delta: !!step1.endDate ? {
        company: step1.currentEndDate,
        candidate: step1.endDate,
      } : undefined,
    },
    workHoursPerWeek: {
      update: !!step1.hoursPerWeek,
      delta: !!step1.hoursPerWeek ? {
        company: step1.currentHoursPerWeek,
        candidate: Number(step1.hoursPerWeek),
      } : undefined,
    },
    tasks: _.map(newListTask, task => ({
        update: !!task.newTask.trim() || task.isRemove,
        delta: (!!task.newTask.trim() || task.isRemove) ? {
          company: {
            id: _.isNumber(task.id) ? task.id : null,
            description: task.description,
          },
          candidate: {
            id: _.isNumber(task.id) ? task.id : null,
            description: task.newTask.trim(),
          },
      } : undefined
    })),
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
