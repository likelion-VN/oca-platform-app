/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ButtonComponent from "@/app/components/button/button";
import InputPrefix from "@/app/components/input/inputPrefix/inputPrefix";
import { WorkTypeOptions } from "@/app/constants/selectOptions";
import useMergeState from "@/app/utils/customHook/useMergeState";
import { formatDate } from "@/app/utils/formatter";
import dayjs from "dayjs";
import { ArrowLeft } from "phosphor-react";
import React from "react";

interface ResumeFormProps {
  defaultData: any;
  handleClick: (stepData: any, isClickNext: boolean) => void;
  handleCancel: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  defaultData,
  handleClick,
  handleCancel,
}) => {
  const [state, setState] = useMergeState({
    ...defaultData,
  });

  const handleInputChange = (
    keyValue: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ [keyValue]: e.target.value });
  };

  const handleDateChange = (keyValue: string, date: dayjs.Dayjs | null) => {
    if (date) {
      const isoDate = dayjs(date).toISOString();
      setState({ [keyValue]: isoDate });
    } else {
      setState({ [keyValue]: null });
    }
  };

  const handleSelectChange = (keyValue: string, value: string) => {
    setState({ [keyValue]: value });
  };

  const handleBack = () => {
    handleClick(state, false);
  };

  const handleApply = () => {
    handleClick(state, true);
  };

  return (
    <>
      <div className="content-title">
        <div className="title-step">Resume</div>
        <div className="subtitle-step">
          Upload your resume and portfolio to highlight your skills and
          achievements.
        </div>
      </div>
      <div className="form-application">
        <InputPrefix
          value={state.jobTitle}
          title="Job Title"
          subTitle="(Negotiable)"
          valuePrefix={defaultData.currentJobTitle}
          type="input"
          onChange={(e) => handleInputChange("jobTitle", e)}
        />
        <InputPrefix
          title="Job Type"
          valuePrefix={defaultData.currentJobType}
          type="input"
          disabled
        />
        <div className="double-input">
          <InputPrefix
            value={state.startDate}
            title="Start working date"
            subTitle="(Negotiable)"
            type="date"
            valuePrefix={formatDate(defaultData.currentWorkStart)}
            onChange={(date) => handleDateChange("startDate", date)}
          />
          <InputPrefix
            value={state.endDate}
            title="End working date"
            subTitle="(Negotiable)"
            type="date"
            valuePrefix={formatDate(defaultData.currentWorkEnd)}
            onChange={(date) => handleDateChange("endDate", date)}
          />
        </div>
        <div className="double-input">
          <InputPrefix
            value={state.workType}
            title="Workplace type"
            subTitle="(Negotiable)"
            type="select"
            valuePrefix={defaultData.currentWorkplaceType}
            options={WorkTypeOptions}
            onChange={(value) => handleSelectChange("workType", value)}
          />
          <InputPrefix
            value={state.hours}
            title="Hours per week"
            subTitle="(Negotiable)"
            valuePrefix={defaultData.currentHoursPerWeek}
            type="input"
            onChange={(e) => handleInputChange("hours", e)}
          />
        </div>
        <InputPrefix
          value={defaultData.currentDescription}
          title="About the job"
          disabled
          type="text-area"
        />
        <InputPrefix
          value={state.currentTask}
          title="Task"
          subTitle="(Negotiable)"
          type="text-area"
          onChange={(e) => handleInputChange("tasks", e)}
        />
        <InputPrefix
          value={defaultData.currentQualifications}
          title="Minimum Qualifications"
          disabled
          type="text-area"
        />
      </div>
      <div className="action">
        <div className="action-left">
          <ButtonComponent
            className="go-back-btn"
            title="Go Back"
            type="link"
            onClick={handleBack}
            icon={<ArrowLeft size={20} />}
            iconPosition="start"
          />
        </div>
        <div className="action-right">
          <ButtonComponent title="Cancel" size="large" onClick={handleCancel} />
          <ButtonComponent
            className="continue-btn"
            type="primary"
            size="large"
            title="Continue"
            onClick={handleApply}
          />
        </div>
      </div>
    </>
  );
};

export default ResumeForm;
