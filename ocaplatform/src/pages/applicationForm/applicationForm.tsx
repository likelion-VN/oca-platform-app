/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CheckIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import { LOADING_TYPES } from "../../constants/loadingTypes";
import { handleSubmitLApplicationForm } from "../../services/handleSubmitApplicationForm";
import loadingPage from "../../store/actions/loading";
import useActions from "../../utils/customHook/useActions";
import useMergeState from "../../utils/customHook/useMergeState";
import { safeNavigate } from "../../utils/helper";
import { newFormDataFormatter } from "./applicationForm.h";
import "./applicationForm.s.scss";
import NegotiableForm from "./form/negotiable";
import ResumeForm from "./form/resume";

const ApplicationForm = () => {
  const loadingPageAction = useActions(loadingPage);
  const location = useLocation();
  const { jobDetail } = location.state || {};
  const newForm = useRef({
    step1: {},
    step2: {},
  });

  const [state, setState] = useMergeState({
    step: 1,
    detailJob: jobDetail,
    isSuccess: false,
    isLoading: true,
  });

  const createIntitialData = async () => {
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
        isOpenGuideModal: detailJob.isOpenModal,
        negotiable: detailJob.negotiable,
      },
      step2: {
        email: "",
        phoneNumber: "",
        portfolio: "",
        personalWebsite: [""],
        selfIntroduction: "",
        listAttachment: [],
        selectedResumeId: null,
      },
      jobId: detailJob.id,
      jobTypeId: detailJob.jobType.id,
    });
    setState({ isLoading: false });
    loadingPageAction();
  };

  const onBackToHome = () => {
    safeNavigate("/dash-board");
  };

  const handleApply = async (input: any) => {
    try {
      loadingPageAction(LOADING_TYPES.APPLYING);
      const isSuccess = await handleSubmitLApplicationForm(input);
      setState({ isSuccess });
    } catch (error) {
      console.error("Error", error);
    } finally {
      loadingPageAction();
    }
  };

  const handleClick = (stepData: any, isClickNext: boolean) => {
    if (!_.isEmpty(stepData)) {
      _.merge(newForm.current, stepData);
    }
    if (isClickNext) {
      if (state.step < 2) {
        setState({ step: state.step + 1 });
      } else {
        const formData = newFormDataFormatter(newForm.current);
        handleApply(formData);
      }
    } else {
      setState({ step: state.step - 1 });
    }
  };

  const handleOpenSuccessModal = (isSuccess: boolean) => {
    setState({ isSuccess });
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 2: {
        return (
          <ResumeForm
            defaultData={newForm.current.step2}
            handleClick={handleClick}
            handleCancel={onBackToHome}
            isSuccess={state.isSuccess}
            handleOpenSuccessModal={handleOpenSuccessModal}
          />
        );
      }
      default: {
        return (
          <NegotiableForm
            defaultData={newForm.current.step1}
            handleClick={handleClick}
            handleCancel={onBackToHome}
            isLoading={state.isLoading}
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
      <div className="background-application-form">
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
