/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  EllipsisOutlined,
  ExportOutlined,
  UpOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { ArrowLeft, GraduationCap } from "phosphor-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EditFormIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import InputDefault from "../../components/input/inputDefault/inputDefault";
import InputPrefix from "../../components/input/inputPrefix/inputPrefix";
import ModalComponent from "../../components/modal/modal";
import { WorkTypeOptions } from "../../constants/selectOptions";
import loadingPage from "../../store/actions/loading";
import { getLabelByValue } from "../../utils";
import useActions from "../../utils/customHook/useActions";
import useMergeState from "../../utils/customHook/useMergeState";
import { formatDate } from "../../utils/formatter";
import { safeNavigate } from "../../utils/helper";
import { renderStatus } from "../dashboard/dashboard.h";
import "../dashboard/dashboard.s.scss";
import "./applicationFormReview.s.scss";

const applicationFormReview = () => {
  const loadingPageAction = useActions(loadingPage);
  const location = useLocation();
  const { jobDetailReview } = location.state || {};

  const [state, setState] = useMergeState({
    detailJob: jobDetailReview,
    isOpenModal: false,
    isRevising: true,
  });

  const onBackToHome = () => {
    safeNavigate("/application");
  };

  const handleRevise = () => {
    setState({ isRevising: false, isOpenModal: false });
  };

  const handleOpenModal = (isOpenModal: boolean) => {
    setState({ isOpenModal });
  };

  useEffect(() => {
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
      <div className="background-application-form-review">
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
        <div className="content-review">
          <div className="content-title">
            <div className="job-title">
              {detailJob.jobTitle.delta.company}
              {detailJob.jobNegotiable && (
                <span className="title-sub">(Negotiable)</span>
              )}
            </div>
            {renderStatus(detailJob.statusId)}
          </div>
          <div className="info-candidate">
            <div className="info-detail">
              <img
                src={detailJob.job.company.companyAvatarUrl}
                alt="notification-icon"
                className="candidate-avatar"
                width={56}
                height={56}
              />
              <div className="candidate-description">
                <div className="title">Johnny Hammer</div>
                <div className="candidate-info-education">
                  <GraduationCap size={16} color="#FF7710" />
                  Stanford University - Humanities and Art
                </div>
              </div>
            </div>
            <ButtonComponent
              className="view-btn"
              title="View profile"
              icon={<ExportOutlined />}
              iconPosition="end"
            />
          </div>
          <div className="form-application">
            <InputPrefix
              value={detailJob.jobTitle.delta.candidate}
              title="Job Title"
              subTitle={detailJob.jobNegotiable && "(Negotiable)"}
              valuePrefix={detailJob.jobTitle.delta.company}
              disabled={!detailJob.jobNegotiable}
              type="input"
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
                valuePrefix={formatDate(detailJob.workPeriodEnd.delta.company)}
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
              />
              <InputPrefix
                value={detailJob.workHoursPerWeek.delta?.candidate}
                title="Hours per week"
                subTitle={detailJob.jobNegotiable && "(Negotiable)"}
                valuePrefix={detailJob.workHoursPerWeek.delta?.company}
                disabled={!detailJob.jobNegotiable}
                readOnly
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
              title="Task"
              type="mutiple-input-quill"
              disabled={!detailJob.jobNegotiable}
              listDataMutipleInput={_.map(detailJob.tasks, (task) => ({
                ...task.delta.company,
                newTask: task.delta.candidate?.description || "",
                isRemove:
                  task.negotiable &&
                  _.isEmpty(task.delta.candidate.description),
              }))}
              subTitle={detailJob.jobNegotiable && "(Negotiable)"}
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
              <div className="resume-content">
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
              value={detailJob.email}
              title="Email"
              type="input"
              placeholder="Enter email"
              readonly
            />
            <InputDefault
              value={detailJob.phoneNumber}
              title="Phone number"
              type="input"
              placeholder="Enter phone number"
              readonly
            />
            <InputDefault
              value={detailJob.portfolio}
              title="Portfolio (Optional)"
              type="input"
              addonBefore="http://"
              optional
              readonly
            />
            {_.map(detailJob.personalWebsites, (website) => (
              <InputDefault
                value={website}
                title="Personal website (Optional)"
                type="input"
                addonBefore="http://"
                optional
                readonly
              />
            ))}
            <InputDefault
              value={detailJob.introduction}
              title="Self-Introduction (Optional)"
              type="text-area"
              optional
              readonly
            />
          </div>
          <div className="action">
            <div className="action-left"></div>
            <div className="action-right">
              <ButtonComponent
                className="reject-btn"
                title="Reject"
                // onClick={onBackToHome}
              />
              <ButtonComponent
                className="select-btn"
                type="primary"
                icon={<UpOutlined />}
                iconPosition="end"
                title="Select next step"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default applicationFormReview;
