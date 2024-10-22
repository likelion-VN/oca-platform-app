/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  EllipsisOutlined,
  ExportOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import {
  ArrowLeft,
  CalendarPlus,
  CaretUp,
  EnvelopeSimple,
  GraduationCap,
  Phone,
} from "phosphor-react";
import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Congratulation } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import InputDefault from "../../components/input/inputDefault/inputDefault";
import InputPrefix from "../../components/input/inputPrefix/inputPrefix";
import ModalComponent from "../../components/modal/modal";
import { WorkTypeOptions } from "../../constants/selectOptions";
import loadingPage from "../../store/actions/loading";
import { getLabelByValue } from "../../utils";
import useActions from "../../utils/customHook/useActions";
import { useSetState } from "../../utils/customHook/useSetState";
import { formatDate } from "../../utils/formatter";
import { safeNavigate } from "../../utils/helper";
import { renderStatus } from "../dashboard/dashboard.h";
import "../dashboard/dashboard.s.scss";
import "./applicationFormReview.s.scss";

const applicationFormReview = () => {
  const countriesOption = useSelector((state: any) => state.countriesOptions)
  const loadingPageAction = useActions(loadingPage);
  const location = useLocation();
  const { jobDetailReview } = location.state || {};

  const [state, setState] = useSetState({
    detailJob: jobDetailReview,
    isOpenRejectModal: false,
    isOpenPhoneModal: false,
    isOpenEmailModal: false,
    isOpenScheduleModal: false,
    isOpenSuccessModal: false,
    isOpenGuidelineModal: false,
    phoneModal: {
      selectedCountry: {
        phoneCode: "+1",
        flag: "https://flagcdn.com/ca.svg",
      },
    },
    emailModal: {
      selectedCountry: {
        phoneCode: "+1",
        flag: "https://flagcdn.com/ca.svg",
      },
      phoneValue: "",
      email: "",
      emailMsg:
        "We would like to schedule a phone call before the interview. Please let us know your availability.",
    },
    scheduleModal: {
      selectedCountry: {
        phoneCode: "+1",
        flag: "https://flagcdn.com/ca.svg",
      },
      position: "",
      interviewDate: dayjs(),
      interviewTime: "",
      timezone: "",
      phoneValue: "",
      email: "",
      emailMsg: "",
    },
  });

  const onBackToHome = () => {
    safeNavigate("/application");
  };

  const handleOpenRejectModal = (isOpenRejectModal: boolean) => {
    setState({ isOpenRejectModal });
  };

  const handleOpenPhoneModal = (isOpenPhoneModal: boolean) => {
    setState({ isOpenPhoneModal });
  };

  const handleOpenEmailModal = (isOpenEmailModal: boolean) => {
    setState({ isOpenEmailModal });
  };

  const handleOpenScheduelModal = (isOpenScheduelModal: boolean) => {
    setState({ isOpenScheduelModal });
  };

  const handleOpenSuccessModal = (isOpenSuccessModal: boolean) => {
    setState({ isOpenSuccessModal });
  };

  const handleOpenGuidelineModal = (isOpenGuidelineModal: boolean) => {
    setState({ isOpenGuidelineModal });
  };

  const items: MenuProps["items"] = [
    {
      className: "menu-step-item",
      label: (
        <>
          <Phone size={20} /> Contact by phone
        </>
      ),
      key: "0",
      onClick: () => handleOpenPhoneModal(true),
    },
    {
      className: "menu-step-item",
      label: (
        <>
          <EnvelopeSimple size={20} /> Send an email
        </>
      ),
      key: "1",
      onClick: () => handleOpenEmailModal(true),
    },
    {
      type: "divider",
    },
    {
      className: "menu-step-item",
      label: (
        <>
          <CalendarPlus size={20} /> Schedule an interview
        </>
      ),
      key: "2",
      onClick: () => handleOpenScheduelModal(true),
    },
    {
      className: "menu-step-item",
      label: (
        <>
          <ProfileOutlined
            style={{
              fontSize: "17px",
              paddingInlineStart: "1px",
              marginInlineEnd: "2px",
            }}
          />{" "}
          Send an offer latter
        </>
      ),
      key: "3",
      onClick: () => handleOpenSuccessModal(true),
    },
  ];

  const handleInputChange = (
    groupKey: string,
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevState: any) => ({
      ...prevState,
      [groupKey]: {
        ...prevState[groupKey],
        [key]: e.target.value,
      },
    }));
  };

  const handleCountryChange = (groupKey: string, value: string) => {
    const country = _.find(countriesOption, (c) => c.phoneCode === value);
    if (country) {
      setState((prevState: any) => ({
        ...prevState,
        [groupKey]: {
          ...prevState[groupKey],
          selectedCountry: {
            phoneCode: country.phoneCode,
            flag: country.flag,
          },
        },
      }));
    }
  };

  const handleSelectChange = (groupKey: string, key: string, value: any) => {
    setState((prevState: any) => ({
      ...prevState,
      [groupKey]: {
        ...prevState[groupKey],
        [key]: value,
      },
    }));
  };

  const handlePhoneNumberChange = (
    groupKey: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = e.target.value;
    const sanitizedValue = phoneNumber.replace(/[^0-9()-\s]/g, "");
    setState((prevState: any) => ({
      ...prevState,
      [groupKey]: {
        ...prevState[groupKey],
        phoneValue: sanitizedValue,
      },
    }));
  };

  useEffect(() => {
    loadingPageAction();
  }, [state.detailJob]);

  const { detailJob } = state || {};
  return (
    <>
      <ModalComponent
        className="modal-application-reject"
        open={state.isOpenRejectModal}
        onCancel={() => handleOpenRejectModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="Confirm"
              size="large"
              type="primary"
              // onClick={}
            />
            <ButtonComponent
              className="cancel-btn"
              title="Cancel"
              size="large"
              type="default"
              onClick={() => handleOpenRejectModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Reject this candidate?</div>
          <div className="title-content">
            Are you sure you want to reject this candidate? Please confirm that
            you will not be moving forward with this candidate in the O-CA
            program.
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-application-phone"
        open={state.isOpenPhoneModal}
        onCancel={() => handleOpenPhoneModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="ok-btn"
              title="OK"
              type="primary"
              onClick={() => handleOpenPhoneModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Phone call</div>
          <div className="title-content">
            <InputDefault
              title="Candidate's phone number"
              type="phone-number"
              valueSelect={state.phoneModal.selectedCountry}
              value={detailJob.phoneNumber}
              option={countriesOption}
              disabled
            />
            <div className="notice-form">
              <sup>*</sup>If the candidate doesn't answer, consider sending a
              brief text message introducing yourself and asking for their
              available times.
            </div>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-application-email"
        open={state.isOpenEmailModal}
        onCancel={() => handleOpenEmailModal(false)}
        centered
        width={680}
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="cancel-btn"
              title="Cancel"
              type="default"
              onClick={() => handleOpenEmailModal(false)}
            />
            <ButtonComponent
              className="send-btn"
              title="Send"
              type="primary"
              // onClick={() => handleOpenRejectModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Sending an email</div>
          <div className="title-content">
            <div className="double-input">
              <InputDefault
                title="Contact number"
                type="phone-number"
                onChange={(e) => handlePhoneNumberChange("emailModal", e)}
                onChangeSelect={(e) => handleCountryChange("emailModal", e)}
                valueSelect={state.emailModal.selectedCountry}
                value={state.emailModal.phoneValue}
                option={countriesOption}
              />
              <InputDefault
                title="Contact email"
                type="input"
                placeholder="Enter contact email"
                value={state.emailModal.email}
                onChange={(e) => handleInputChange("emailModal", "email", e)}
              />
            </div>
            <InputDefault
              title="Your message"
              type="text-area"
              maxLength={1000}
              showCount
              maxRows={8}
              value={state.emailModal.emailMsg}
              onChange={(e) => handleInputChange("emailModal", "emailMsg", e)}
            />
            <div className="notice-form">
              <sup>*</sup>This email will be send to both of you and candidate
            </div>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-application-schedule"
        open={state.isOpenScheduelModal}
        onCancel={() => handleOpenScheduelModal(false)}
        centered
        width={680}
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="cancel-btn"
              title="Cancel"
              size="large"
              type="default"
              onClick={() => handleOpenScheduelModal(false)}
            />
            <ButtonComponent
              className="send-btn"
              title="Send"
              size="large"
              type="primary"
              // onClick={() => handleOpenRejectModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Schedule an interview</div>
          <div className="title-content">
            <InputDefault
              title="Position"
              type="input"
              placeholder="Enter job title"
              value={state.scheduleModal.position}
              onChange={(e) =>
                handleInputChange("scheduleModal", "position", e)
              }
            />
            <div className="double-input">
              <InputDefault
                title="Interview Date"
                type="date-picker"
                onChange={(value) =>
                  handleSelectChange("scheduleModal", "interviewDate", value)
                }
                value={state.scheduleModal.interviewDate}
              />
              <InputDefault
                title="Interview Time"
                type="time-picker"
                onChange={(value) =>
                  handleSelectChange("scheduleModal", "interviewTime", value)
                }
                value={state.scheduleModal.interviewTime}
              />
            </div>
            <InputDefault
              title="Time zone"
              type="select"
              placeholder="Select time zone"
              option={state.listTimezone}
              onChangeSelect={(value) =>
                handleSelectChange("scheduleModal", "timezone", value)
              }
              showSearch
            />
            <div className="double-input">
              <InputDefault
                title="Contact number"
                type="phone-number"
                onChange={(e) => handlePhoneNumberChange("scheduleModal", e)}
                onChangeSelect={(e) => handleCountryChange("scheduleModal", e)}
                valueSelect={state.scheduleModal.selectedCountry}
                value={state.scheduleModal.phoneValue}
                option={countriesOption}
              />
              <InputDefault
                title="Contact email"
                type="input"
                placeholder="Enter contact email"
                value={state.scheduleModal.email}
                onChange={(e) => handleInputChange("scheduleModal", "email", e)}
              />
            </div>
            <InputDefault
              title="Your message"
              type="text-area"
              maxLength={1000}
              showCount
              maxRows={8}
              placeholder={
                "Please write the message you would like to send, including:\n• Interview Process\n• What should be prepared\n• Interview duration"
              }
              value={state.scheduleModal.emailMsg}
              onChange={(e) =>
                handleInputChange("scheduleModal", "emailMsg", e)
              }
            />
            <div className="notice-form">
              <sup>*</sup>This email will be send to both of you and candidate
            </div>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-application-success"
        open={state.isOpenSuccessModal}
        onCancel={() => handleOpenSuccessModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="view-guideline-btn"
              title="View onboarding guidelines"
              type="primary"
              onClick={() => {
                handleOpenSuccessModal(false);
                handleOpenGuidelineModal(true);
              }}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <img src={Congratulation} alt="congratulation" />
          <div className="title">Congratulation!</div>
          <div className="title-content">
            You’ve successfully accepted a candidate! <br />
            Let's move forward with the onboarding process
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-application-guideline"
        open={state.isOpenGuidelineModal}
        onCancel={() => {
          handleOpenGuidelineModal(false);
          safeNavigate("/application");
        }}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="ok-btn"
              title="OK"
              type="primary"
              onClick={() => {
                handleOpenGuidelineModal(false);
                safeNavigate("/application");
              }}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Onboarding Guidelines</div>
          <div className="title-content">
            <div className="description">
              Follow these steps to ensure a smooth onboarding experience
            </div>
            <div className="steps">
              <span className="steps-item">
                Step 1:
                <ButtonComponent
                  className="link-btn"
                  title="Send the Offer Letter"
                  type="link"
                />
              </span>
              <span className="steps-item">
                Step 2:
                <ButtonComponent
                  className="link-btn"
                  title="Sign Employment Contract"
                  type="link"
                />
              </span>
              <span className="steps-item">
                Step 3:
                <ButtonComponent
                  className="link-btn"
                  title="Check Work Authorization"
                  type="link"
                />
              </span>
              <span className="steps-item">
                Step 4:
                <ButtonComponent
                  className="link-btn"
                  title="Prepare for working together"
                  type="link"
                />
              </span>
            </div>
            <span className="notice">
              <sup>*</sup>If you need more detailed guidance or next steps,
              please click{" "}
              <ButtonComponent className="link-btn" title="here" type="link" />
            </span>
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
              readOnly
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
                onClick={() => handleOpenRejectModal(true)}
              />
              <Dropdown
                overlayClassName="menu-step"
                menu={{ items }}
                trigger={["click"]}
                placement="topRight"
              >
                <ButtonComponent
                  className="select-btn"
                  type="primary"
                  icon={<CaretUp />}
                  iconPosition="end"
                  title="Select next step"
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default applicationFormReview;
