/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from "classnames";
import _ from "lodash";
import { ArrowLeft } from "phosphor-react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import Loading from "../../components/loading/loading";
import useMergeState from "../../utils/customHook/useMergeState";
import useUpdateEffect from "../../utils/customHook/useUpdateEffect";
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
    checked: false,
    isLoading: true,
    isOpenModal: true,
  });

  console.log("test data", jobDetail, state.detailJob);

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
    });
    console.log('testtest')
  };

  const onBackToHome = () => {
    navigate("/");
  };

  const handleClick = (stepData: any, isClickNext: boolean) => {
    if (!_.isEmpty(stepData)) {
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

  const handleOpenModal = (isOpenModal: boolean) => {
    setState({ isOpenModal });
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
            isOpenModal={state.isOpenModal}
            handleClick={handleClick}
            handleOpenModal={handleOpenModal}
            handleCancel={onBackToHome}
          />
        );
      }
    }
  };

  useUpdateEffect(() => {
    createIntitialData();
    setState({ isLoading: false });
    console.log('testtesttest')
  }, [state.detailJob]);

  console.log("test1", newForm.current);

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
