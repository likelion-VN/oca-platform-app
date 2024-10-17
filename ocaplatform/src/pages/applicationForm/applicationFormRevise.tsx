/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EllipsisOutlined } from "@ant-design/icons";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckIcon, EditFormIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import InputDefault from "../../components/input/inputDefault/inputDefault";
import InputPrefix from "../../components/input/inputPrefix/inputPrefix";
import ModalComponent from "../../components/modal/modal";
import { LOADING_TYPES } from "../../constants/loadingTypes";
import { WorkTypeOptions } from "../../constants/selectOptions";
import { handleResubmitLApplicationForm } from "../../services/handleResubmitApplicationForm";
import loadingPage from "../../store/actions/loading";
import { getLabelByValue } from "../../utils";
import useActions from "../../utils/customHook/useActions";
import useMergeState from "../../utils/customHook/useMergeState";
import { formatDate } from "../../utils/formatter";
import { newFormDataFormatter } from "./applicationForm.h";
import "./applicationFormRevise.s.scss";
import NegotiableForm from "./form/negotiable";
import ResumeForm from "./form/resume";

const ApplicationFormRevise = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();
  const location = useLocation();
  const { jobDetailReview } = location.state || {};
  const newForm = useRef({
    step1: {},
    step2: {},
    jobId: 0,
    jobTypeId: 0,
    applicationId: 0,
  });

  const [state, setState] = useMergeState({
    step: 1,
    detailJob: jobDetailReview,
    isOpenModal: false,
    isOpenGuideModal: false,
    isRevising: true,
  });

  const createIntitialData = async () => {
    const { detailJob } = state;
    _.assign(newForm.current, {
      step1: {
        currentJobTitle: detailJob.jobTitle?.delta?.company || "",
        currentJobType: detailJob.jobType?.name || "",
        currentStartDate: detailJob.workPeriodStart?.delta?.company
          ? dayjs(detailJob.workPeriodStart.delta.company).toISOString()
          : "",
        currentEndDate: detailJob.workPeriodEnd?.delta?.company
          ? dayjs(detailJob.workPeriodEnd.delta.company).toISOString()
          : "",
        currentWorkplaceType: getLabelByValue(
          WorkTypeOptions,
          detailJob.workplaceType?.delta?.company
        ),
        currentHoursPerWeek: detailJob.workHoursPerWeek?.delta?.company || "",
        currentDescription: detailJob.job?.description || "",
        currentTasks: _.map(detailJob.tasks, (task) => ({
          id: task?.delta?.company?.id || "",
          idNewTask: task?.delta?.candidate?.id || null,
          description: task?.delta?.company?.description || "",
          newTask: task?.delta?.candidate?.description || "",
          isRemove:
            task.negotiable && _.isEmpty(task.delta.candidate.description),
        })),
        currentQualifications: _.map(
          detailJob.qualifications,
          (qualification) => qualification.description
        ).join("\n"),
        jobTitle: detailJob.jobTitle?.delta?.candidate || "",
        startDate: detailJob.workPeriodStart?.delta?.candidate || "",
        endDate: detailJob.workPeriodEnd?.delta?.candidate || "",
        workplaceType: getLabelByValue(
          WorkTypeOptions,
          detailJob.workplaceType?.delta?.candidate
        ),
        hoursPerWeek: detailJob.workHoursPerWeek?.delta?.candidate || "",
        negotiable: detailJob.jobNegotiable || false,
      },
      step2: {
        email: detailJob.email || "",
        phoneNumber: detailJob.phoneNumber || "",
        portfolio: detailJob.portfolio || "",
        personalWebsite: detailJob.personalWebsites || [],
        selfIntroduction: detailJob.introduction || "",
        listAttachment: detailJob.attachments || [],
        selectedResumeId: detailJob.selectedAttachment?.id || null,
      },
      jobId: detailJob.job?.id || 0,
      jobTypeId: detailJob.jobType?.id || 0,
      applicationId: detailJob.applicationId || 0,
    });
  };

  const onBackToHome = () => {
    navigate("/dash-board");
  };

  const handleRevise = () => {
    setState({ isRevising: false, isOpenModal: false });
  };

  const handleApply = async (input: any) => {
    try {
      loadingPageAction(LOADING_TYPES.APPLYING);
      const isSuccess = await handleResubmitLApplicationForm(
        newForm.current.applicationId,
        input
      );
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

  const handleOpenModal = (isOpenModal: boolean) => {
    setState({ isOpenModal });
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
    loadingPageAction();
  }, [state.detailJob]);

  const { detailJob } = state || {};

  return (
    <>
      <ModalComponent
        className="modal-revise"
        open={state.isOpenModal}
        onCancel={() => handleOpenModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="revise-btn"
              title="Start revising"
              size="large"
              type="primary"
              onClick={handleRevise}
            />
            <ButtonComponent
              className="cancel-btn"
              title="Cancel"
              size="large"
              type="default"
              onClick={() => handleOpenModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <img src={EditFormIcon} alt="edit-form" />
          <div className="title">Will you start revising your application?</div>
          <div className="title-content">
            You can revise your application here and submit again.
          </div>
          <div className="title-caution">
            <strong>Cautious:</strong> Resubmitting your application after
            making changes without consulting the company may lead to issues in
            the process.
          </div>
        </div>
      </ModalComponent>
      <div className="background-application-form-revise">
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
        {state.isRevising ? (
          <div className="content-revise">
            <div className="content-title">
              <div className="title-step">Application</div>
            </div>
            <div className="form-application">
              <InputPrefix
                value={detailJob.jobTitle.delta.candidate}
                title="Job Title"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                valuePrefix={detailJob.jobTitle.delta.company}
                disabled={!detailJob.jobNegotiable}
                type="input"
                onClick={
                  detailJob.jobNegotiable
                    ? () => handleOpenModal(true)
                    : undefined
                }
                readOnly
              />
              <InputPrefix
                title="Job Type"
                valuePrefix={detailJob.jobType.name}
                type="input"
                disabled
              />
              <div className="double-input">
                <InputPrefix
                  value={
                    detailJob.workPeriodStart.delta.candidate
                      ? formatDate(detailJob.workPeriodStart.delta.candidate)
                      : ""
                  }
                  title="Start working date"
                  placeholder=""
                  subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                  type="date"
                  disabled={!detailJob.jobNegotiable}
                  valuePrefix={formatDate(
                    detailJob.workPeriodStart.delta.company
                  )}
                  onClick={
                    detailJob.jobNegotiable
                      ? () => handleOpenModal(true)
                      : undefined
                  }
                />
                <InputPrefix
                  value={
                    detailJob.workPeriodEnd.delta.candidate
                      ? formatDate(detailJob.workPeriodEnd.delta.candidate)
                      : ""
                  }
                  title="End working date"
                  subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                  type="date"
                  disabled={!detailJob.jobNegotiable}
                  placeholder=""
                  valuePrefix={formatDate(
                    detailJob.workPeriodEnd.delta.company
                  )}
                  onClick={
                    detailJob.jobNegotiable
                      ? () => handleOpenModal(true)
                      : undefined
                  }
                />
              </div>
              <div className="double-input">
                <InputPrefix
                  value={getLabelByValue(
                    WorkTypeOptions,
                    detailJob.workplaceType.delta.candidate
                  )}
                  title="Workplace type"
                  subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                  type="select"
                  valuePrefix={getLabelByValue(
                    WorkTypeOptions,
                    detailJob.workplaceType.delta.company
                  )}
                  onClick={
                    detailJob.jobNegotiable
                      ? () => handleOpenModal(true)
                      : undefined
                  }
                />
                <InputPrefix
                  value={detailJob.workHoursPerWeek.delta?.candidate}
                  title="Hours per week"
                  subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                  valuePrefix={detailJob.workHoursPerWeek.delta?.company}
                  disabled={!detailJob.jobNegotiable}
                  readOnly
                  type="input"
                  onClick={
                    detailJob.jobNegotiable
                      ? () => handleOpenModal(true)
                      : undefined
                  }
                />
              </div>
              <InputPrefix
                value={detailJob.job.description}
                title="About the job"
                disabled
                type="text-area"
              />
              {/* <InputPrefix
                value={_.map(detailJob.tasks, (task) => ({
                  ...task.delta.company,
                  newTask: task.delta.candidate?.description,
                  isRemove:
                    task.negotiable &&
                    _.isEmpty(task.delta.candidate.description),
                }))}
                title="Task"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                type="text-area-input"
                disabled={!detailJob.jobNegotiable}
                readOnly
                onClick={
                  detailJob.jobNegotiable
                    ? () => handleOpenModal(true)
                    : undefined
                }
              /> */}
              <div
                onClick={
                  detailJob.jobNegotiable
                    ? () => handleOpenModal(true)
                    : undefined
                }
              >
                <InputPrefix
                  title="Task"
                  type="mutiple-input-quill"
                  disabled={!detailJob.jobNegotiable}
                  listDataMutipleInput={_.map(detailJob.tasks, (task) => ({
                    ...task.delta.company,
                    newTask: task.delta.candidate?.description,
                    isRemove:
                      task.negotiable &&
                      _.isEmpty(task.delta.candidate.description),
                  }))}
                  subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                />
              </div>
              <InputPrefix
                value={_.map(
                  detailJob.job.qualifications,
                  (qualification) => qualification.description
                ).join("\n")}
                title="Minimum Qualifications"
                disabled
                type="text-area"
              />
              <div className="resume">
                <div className="resume-title">Resume</div>
                <div
                  className="resume-content"
                  onClick={() => handleOpenModal(true)}
                >
                  <div className="resume-content-left">
                    <div className="resume-name">
                      {detailJob.selectedAttachment.name}
                    </div>
                    <div className="resume-upload-date">
                      Upload on{" "}
                      {formatDate(detailJob.selectedAttachment.uploadDate)}
                    </div>
                  </div>
                  <div className="resume-content-right">
                    <EllipsisOutlined />
                  </div>
                </div>
              </div>
              <InputDefault
                onClick={() => handleOpenModal(true)}
                value={detailJob.email}
                title="Email"
                type="input"
                placeholder="Enter email"
                readonly
              />
              <InputDefault
                onClick={() => handleOpenModal(true)}
                value={detailJob.phoneNumber}
                title="Phone number"
                type="input"
                placeholder="Enter phone number"
                readonly
              />
              <InputDefault
                onClick={() => handleOpenModal(true)}
                value={detailJob.portfolio}
                title="Portfolio (Optional)"
                type="input"
                addonBefore="http://"
                optional
                readonly
              />
              {_.map(detailJob.personalWebsites, (website) => (
                <InputDefault
                  onClick={() => handleOpenModal(true)}
                  value={website}
                  title="Personal website (Optional)"
                  type="input"
                  addonBefore="http://"
                  optional
                  readonly
                />
              ))}
              <InputDefault
                onClick={() => handleOpenModal(true)}
                value={detailJob.introduction}
                title="Self-Introduction (Optional)"
                type="text-area"
                optional
                placeholder="Describe yourself in your own words..."
                readonly
              />
            </div>
            <div className="action">
              <div className="action-left"></div>
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
                  title="Revising"
                  disabled={
                    detailJob.statusId !== 1 && detailJob.statusId !== 2
                  }
                  onClick={() => handleOpenModal(true)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="content-form">
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
        )}
      </div>
    </>
  );
};

export default ApplicationFormRevise;
