/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef } from "react";
import ButtonComponent from "../components/button/button";
import useMergeState from "../utils/customHook/useMergeState";
import useUpdateEffect from "../utils/customHook/useUpdateEffect";
import "./application-form.s.scss";
import NegotiableForm from "./create-form/negotiable";
import ResumeForm from "./create-form/resume";

const ApplicationForm = () => {
  const router = useRouter();
  const newForm = useRef({
    step1: {},
    step2: {},
  });

  const [state, setState] = useMergeState({
    step: 1,
    detailJob: {},
    checked: false,
    isOpenConfirm: false,
  });

  const createIntitialData = () => {
    const { detailJob } = state;
    _.assign(newForm.current, {
      step1: {
        currentJobTitle: detailJob.title,
        currentJobType: detailJob.jobType.name,
        currentStartDate: detailJob.workStart,
        currentStartEnd: detailJob.workEnd,
        currentWorkplaceType: detailJob.workplaceType.name,
        currentHoursPerWeek: detailJob.hoursPerWeek,
        currentDescription: detailJob.description,
        currentTask: _.map(detailJob.tasks, (task) => task.description).join(
          "\n"
        ),
        currentQualifications: _.map(
          detailJob.qualifications,
          (qualification) => qualification.description
        ).join("\n"),
        jobTitle: "",
        startDate: null,
        endDate: null,
        workplaceType: null,
        hoursPerWeek: "",
        task: "",
      },
      step2: {
        resume: [],
        email: "",
        phoneNumber: "",
        portfolio: "",
        personalWebsite: [],
        selftIntroduction: "",
      },
    });
  };

  const onBackToHome = () => {
    sessionStorage.removeItem("detailJob");
    router.push("./dashboard");
  };

  const handleClick = (stepData: any, isClickNext: boolean) => {
    if (_.isEmpty(stepData)) {
      _.merge(newForm.current, stepData);
    }
    if (isClickNext) {
      if (state.step < 2) {
        setState({ step: state.step + 1 });
      } else {
        console.log("finish form", newForm.current);
      }
    } else {
      setState({ step: state.step - 1 });
    }
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 2: {
        return (
          <ResumeForm
            defaultData={newForm.current.step2}
            handleClick={handleClick}
            handleCancel={onBackToHome}
          />
        );
      }
      default: {
        return (
          <NegotiableForm
            defaultData={newForm.current.step1}
            handleClick={handleClick}
            handleCancel={onBackToHome}
          />
        );
      }
    }
  };

  useEffect(() => {
    const storedDetailJob = sessionStorage.getItem("detailJob");
    if (storedDetailJob) {
      setState({ detailJob: JSON.parse(storedDetailJob) });
    }
  }, []);

  useUpdateEffect(() => {
    createIntitialData();
  }, [state.detailJob]);

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
        {renderStep(state.step)}
      </div>
    </div>
  );
};

export default ApplicationForm;
