/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import Loading from "../../components/loading/loading";
import { putLApplicationForm } from "../../services/applicationForm";
import useMergeState from "../../utils/customHook/useMergeState";
import { newFormDataFormatter } from "./applicationForm.h";
import "./applicationForm.s.scss";
import NegotiableForm from "./form/negotiable";
import ResumeForm from "./form/resume";

const ApplicationForm = () => {
  const location = useLocation();
  const { jobDetail } = location.state || {};
  const navigate = useNavigate();
  const newForm = useRef({
    step1: {},
    step2: {},
  });

  const [state, setState] = useMergeState({
    step: 1,
    detailJob: jobDetail,
    isLoading: true,
    isOpenModal: true,
    isSuccess: false,
  });

  const createIntitialData = () => {
    const { detailJob } = state;
    _.assign(newForm.current, {
      step1: {
        currentJobTitle: detailJob.title,
        currentJobType: detailJob.jobType.name,
        currentStartDate: dayjs(detailJob.workStart).toISOString(),
        currentEndDate: dayjs(detailJob.workEnd).toISOString(),
        currentWorkplaceType: detailJob.workplaceType.name,
        currentHoursPerWeek: detailJob.hoursPerWeek,
        currentDescription: detailJob.description,
        currentTasks: _.map(detailJob.tasks, (task) => ({
          ...task,
          newTask: "",
          isRemove: false,
        })),
        currentQualifications: _.map(
          detailJob.qualifications,
          (qualification) => qualification.description
        ).join("\n"),
        jobTitle: "",
        startDate: null,
        endDate: null,
        workplaceType: null,
        hoursPerWeek: "",
        isOpenModal: detailJob.isOpenModal,
      },
      step2: {
        resume: [],
        email: "",
        phoneNumber: "",
        portfolio: "",
        personalWebsite: [""],
        selfIntroduction: "",
      },
      jobId: detailJob.id,
      jobTypeId: detailJob.jobType.id,
    });
    setState({ isLoading: false });
  };

  const onBackToHome = () => {
    navigate("/");
  };

  const handleClick = async (stepData: any, isClickNext: boolean) => {
    if (!_.isEmpty(stepData)) {
      _.merge(newForm.current, stepData);
    }
    if (isClickNext) {
      if (state.step < 2) {
        setState({ step: state.step + 1 });
      } else {
        setState({ isLoading: true });
        const formData = newFormDataFormatter(newForm.current);
        try {
          const isAppliedSuccess = await putLApplicationForm(formData);
          setState({ isSuccess: isAppliedSuccess, isLoading: false });
        } catch (error) {
          setState({ isLoading: false });
        }
      }
    } else {
      setState({ step: state.step - 1 });
    }
  };

  const handleOpenModal = (isOpenModal: boolean) => {
    setState({ isOpenModal });
  };

  const handleOpenSuccessModal = (isSuccess: boolean) => {
    setState({ isSuccess })
  }

  const renderStep = (step: number) => {
    switch (step) {
      case 2: {
        return (
          <ResumeForm
            defaultData={newForm.current.step2}
            handleClick={handleClick}
            handleCancel={onBackToHome}
            isSuccess={state.isSuccess}
            isLoading={state.isLoading}
            handleOpenSuccessModal={handleOpenSuccessModal}
          />
        );
      }
      default: {
        return (
          <NegotiableForm
            defaultData={newForm.current.step1}
            isOpenModal={state.isOpenModal}
            handleClick={handleClick}
            handleOpenModal={handleOpenModal}
            handleCancel={onBackToHome}
          />
        );
      }
    }
  };

  useEffect(() => {
    createIntitialData();
  }, [state.detailJob]);

  return (
    <>
      <Loading isLoading={state.isLoading} />
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
            <div
              className={classNames(
                "switch-item",
                state.step === 1 && "active"
              )}
            >
              <div className="switch-item-index">
                {state.step === 2 ? (
                  <img src={CheckIcon} alt="check-icon" />
                ) : (
                  1
                )}
              </div>
              <div className="switch-item-title">Negotiable</div>
            </div>
            <div
              className={classNames(
                "switch-item",
                state.step === 2 && "active"
              )}
            >
              <div className="switch-item-index">2</div>
              <div className="switch-item-title">Resume</div>
            </div>
          </div>
          {renderStep(state.step)}
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
