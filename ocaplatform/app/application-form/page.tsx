/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "phosphor-react";
import { useEffect } from "react";
import ButtonComponent from "../components/button/button";
import InputPrefix from "../components/input/inputPrefix/inputPrefix";
import { WorkTypeOptions } from "../constants/selectOptions";
import useMergeState from "../utils/customHook/useMergeState";
import { formatDate } from "../utils/formatter";
import "./application-form.s.scss";

const ApplicationForm = () => {
  const router = useRouter();
  const [state, setState] = useMergeState({
    detailJob: {},
    jobTitle: "",
    startDate: null,
    endDate: null,
    hours: "",
    tasks: "",
    workType: null,
    checked: false,
    isOpenConfirm: false,
  });

  const onBackToHome = () => {
    sessionStorage.removeItem("detailJob");
    router.push("./dashboard");
  };

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
    setState({ [keyValue]: value})
  }

  useEffect(() => {
    const storedDetailJob = sessionStorage.getItem("detailJob");
    if (storedDetailJob) {
      setState({ detailJob: JSON.parse(storedDetailJob) });
    }
  });

  return (
    <div className="background">
      <div className="header">
        <ButtonComponent
          className="back-btn"
          title="Application"
          type="link"
          onClick={onBackToHome}
          icon={<ArrowLeft size={24} />}
          iconPosition="start"
        />
      </div>
      <div className="content">
        <div className="switch-component switch-background">
          <div className="switch-item active">
            <div className="switch-item-index">1</div>
            <div className="switch-item-title">Negotiable</div>
          </div>
          <div className="switch-item">
            <div className="switch-item-index">2</div>
            <div className="switch-item-title">Resume</div>
          </div>
        </div>
        <div className="content-title">
          <div className="title-step">Negotiable Your Application</div>
          <div className="subtitle-step">
            Adjust the fields below to propose changes and negotiate terms that
            better fit your needs
          </div>
        </div>
        <div className="form-application">
          <InputPrefix
            value={state.jobTitle}
            title="Job Title"
            subTitle="(Negotiable)"
            valuePrefix={state.detailJob.title}
            type="input"
            onChange={(e) => handleInputChange("jobTitle", e)}
          />
          <InputPrefix
            title="Job Type"
            valuePrefix={state.detailJob.jobType?.name}
            type="input"
            disabled
          />
          <div className="double-input">
            <InputPrefix
              value={state.startDate}
              title="Start working date"
              subTitle="(Negotiable)"
              type="date"
              valuePrefix={formatDate(state.detailJob.workStart)}
              onChange={(date) => handleDateChange("startDate", date)}
            />
            <InputPrefix
              value={state.endDate}
              title="End working date"
              subTitle="(Negotiable)"
              type="date"
              valuePrefix={formatDate(state.detailJob.workEnd)}
              onChange={(date) => handleDateChange("endDate", date)}
            />
          </div>
          <div className="double-input">
            <InputPrefix
              value={state.workType}
              title="Workplace type"
              subTitle="(Negotiable)"
              type="select"
              valuePrefix={state.detailJob.workplaceType?.name}
              options={WorkTypeOptions}
              onChange={(value) => handleSelectChange('workType', value)}
            />
            <InputPrefix
              value={state.hours}
              title="Hours per week"
              subTitle="(Negotiable)"
              valuePrefix={state.detailJob.hoursPerWeek}
              type="input"
              onChange={(e) => handleInputChange("hours", e)}
            />
          </div>
          <InputPrefix
            value={state.detailJob.description}
            title="About the job"
            disabled
            type="text-area"
          />
          <InputPrefix
            value={state.detailJob.tasks}
            title="Task"
            subTitle="(Negotiable)"
            type="text-area"
            onChange={(e) => handleInputChange("tasks", e)}
          />
          <InputPrefix
            value={state.detailJob.qualifications}
            title="Minimun Qualifications"
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
              onClick={onBackToHome}
              icon={<ArrowLeft size={20} />}
              iconPosition="start"
            />
          </div>
          <div className="action-right">
            <ButtonComponent
              title="Cancel"
              size="large"
              onClick={onBackToHome}
            />
            <ButtonComponent
              className="continue-btn"
              type="primary"
              size="large"
              title="Continue"
              onClick={onBackToHome}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
