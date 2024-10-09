/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import _ from "lodash";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EditFormIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import InputDefault from "../../components/input/inputDefault/inputDefault";
import InputPrefix from "../../components/input/inputPrefix/inputPrefix";
import ModalComponent from "../../components/modal/modal";
import { LOADING_TYPES } from "../../constants/loadingTypes";
import { WorkTypeOptions } from "../../constants/selectOptions";
import { handleSubmitLApplicationForm } from "../../services/handleSubmitApplicationForm";
import loadingPage from "../../store/actions/loading";
import { getLabelByValue } from "../../utils";
import useActions from "../../utils/customHook/useActions";
import useMergeState from "../../utils/customHook/useMergeState";
import { formatDate } from "../../utils/formatter";
import "./applicationFormRevise.s.scss";

const ApplicationFormRevise = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();
  const location = useLocation();
  const { jobDetailReview } = location.state || {};
  const newForm = useRef({
    step1: {},
    step2: {},
  });

  const [state, setState] = useMergeState({
    detailJob: jobDetailReview,
    isOpenModal: false,
  });

  const createIntitialData = async () => {
    const { detailJob } = state;
    _.assign(newForm.current, {
      step1: {
        currentJobTitle: detailJob.jobTitle.negotiable
          ? detailJob.jobTitle.delta.candidate
          : detailJob.jobTitle.delta.company,
        currentJobType: detailJob.jobType.name,
        currentStartDate: detailJob.workPeriodStart.negotiable
          ? detailJob.workPeriodStart.delta.candidate
          : detailJob.workPeriodStart.delta.company,
        currentEndDate: dayjs(
          detailJob.workPeriodEnd.negotiable
            ? detailJob.workPeriodEnd.delta.candidate
            : detailJob.workPeriodEnd.delta.company
        ).toISOString(),
        currentWorkplaceType: detailJob.workplaceType.negotiable
          ? detailJob.workplaceType.delta.candidate
          : detailJob.workplaceType.delta.company,
        currentHoursPerWeek: detailJob.workHoursPerWeek.negotiable
          ? detailJob.workHoursPerWeek.delta.candidate
          : detailJob.workHoursPerWeek.delta.company,
        currentDescription: detailJob.job.description,
        currentTasks: _(detailJob.tasks)
          .map((task) => {
            const item = task.negotiable
              ? _.get(task, "delta.candidate")
              : _.get(task, "delta.company");

            if (!item) return null;

            return {
              id: _.get(item, "id"),
              description: _.get(item, "description"),
              newTask: "",
              isRemove: false,
            };
          })
          .compact()
          .value(),
        currentQualifications: _.map(
          detailJob.qualifications,
          (qualification) => qualification.description
        ).join("\n"),
        jobTitle: "",
        startDate: null,
        endDate: null,
        workplaceType: null,
        hoursPerWeek: "",
        negotiable: detailJob.jobNegotiable,
      },
      step2: {
        email: "",
        phoneNumber: "",
        portfolio: "",
        personalWebsite: [""],
        selfIntroduction: "",
        listAttachment: detailJob.attachment,
        selectedResumeId: null,
      },
      jobId: detailJob.id,
      jobTypeId: detailJob.jobType.id,
    });
  };

  const onBackToHome = () => {
    navigate("/");
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

  const handleOpenModal = (isOpenModal: boolean) => {
    setState({ isOpenModal });
  };

  useEffect(() => {
    createIntitialData();
    loadingPageAction();
  }, [state.detailJob]);

  const { detailJob } = state || {};
  console.log("test", detailJob);

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
              onClick={handleApply}
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
        <div className="content">
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
            />
            <InputPrefix
              title="Job Type"
              valuePrefix={detailJob.jobType.name}
              type="input"
              disabled
            />
            <div className="double-input">
              <InputPrefix
                value={detailJob.workPeriodStart.delta.candidate}
                title="Start working date"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                type="date"
                disabled={!detailJob.jobNegotiable}
                valuePrefix={formatDate(
                  detailJob.workPeriodStart.delta.company
                )}
              />
              <InputPrefix
                value={detailJob.workPeriodEnd.delta.candidate}
                title="End working date"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                type="date"
                disabled={!detailJob.jobNegotiable}
                valuePrefix={formatDate(detailJob.workPeriodEnd.delta.company)}
              />
            </div>
            <div className="double-input">
              <InputPrefix
                value={detailJob.workplaceType.delta.candidate}
                title="Workplace type"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                type="select"
                readOnly={!detailJob.jobNegotiable}
                valuePrefix={getLabelByValue(
                  WorkTypeOptions,
                  detailJob.workplaceType.delta.company
                )}
              />
              <InputPrefix
                value={detailJob.workHoursPerWeek.delta?.candidate}
                title="Hours per week"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                valuePrefix={detailJob.workHoursPerWeek.delta?.company}
                disabled={!detailJob.jobNegotiable}
                type="input"
              />
            </div>
            <InputPrefix
              value={detailJob.job.description}
              title="About the job"
              disabled
              type="text-area"
            />
            <InputPrefix
              value={_.map(detailJob.tasks, (task) => ({
                ...task.delta.company,
                newTask: task.delta.candidate,
                isRemove: false,
              }))}
              title="Task"
              subTitle={detailJob.jobNegotiable && "(Negotiable)"}
              type="text-area-input"
              disabled={!detailJob.jobNegotiable}
            />
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
                    {detailJob.attachment[0].name}
                  </div>
                  <div className="resume-upload-date">
                    Upload on {formatDate(detailJob.attachment[0].uploadDate)}
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
            />
            <InputDefault
              onClick={() => handleOpenModal(true)}
              value={detailJob.phoneNumber}
              title="Phone number"
              type="input"
              placeholder="Enter phone number"
            />
            <InputDefault
              onClick={() => handleOpenModal(true)}
              value={detailJob.portfolio}
              title="Portfolio (Optional)"
              type="input"
              addonBefore="http://"
              optional
            />
            {_.map(detailJob.personalWebsites, (website) => (
              <InputDefault
                onClick={() => handleOpenModal(true)}
                value={website}
                title="Personal website (Optional)"
                type="input"
                addonBefore="http://"
                optional
              />
            ))}
            <InputDefault
              onClick={() => handleOpenModal(true)}
              value={state.introduction}
              title="Self-Introduction (Optional)"
              type="text-area"
              optional
              placeholder="Describe yourself in your own words..."
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
                onClick={() => handleOpenModal(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationFormRevise;
