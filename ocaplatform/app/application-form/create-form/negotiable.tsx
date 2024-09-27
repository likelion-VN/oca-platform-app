/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ButtonComponent from "@/app/components/button/button";
import InputPrefix from "@/app/components/input/inputPrefix/inputPrefix";
import ModalComponent from "@/app/components/modal/modal";
import { WorkTypeOptions } from "@/app/constants/selectOptions";
import useMergeState from "@/app/utils/customHook/useMergeState";
import { formatDate } from "@/app/utils/formatter";
import { QuestionCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect } from "react";

interface NegotiableFormProps {
  defaultData: any;
  handleClick: (stepData: any, isClickNext: boolean) => void;
  handleCancel: () => void;
}

const NegotiableForm: React.FC<NegotiableFormProps> = ({
  defaultData,
  handleClick,
  handleCancel,
}) => {
  const [state, setState] = useMergeState({});

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

  const onClickOpenModal = (isOpenModal: boolean) => {
    setState({ isOpenModal });
  };

  const handleNext = () => {
    handleClick({ step1: state }, true);
  };

  useEffect(() => {
    setState(defaultData);
  }, [defaultData]);



  return (
    <>
      <ModalComponent
        open={state.isOpenModal}
        onOk={() => onClickOpenModal(false)}
        onCancel={() => onClickOpenModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="Got It"
              size="large"
              type="primary"
              onClick={() => onClickOpenModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="modal-top"></div>
          <div className="modal-bottom">
            <div className="title">Negotiate Your Application</div>
            <div className="title-content">
              Fields marked as &apos;
              <span style={{ color: "#0A5CD8" }}>Negotiable</span>&apos; allow
              you to revise your offer. Update these fields to customize your
              application to match your counteroffer needs.
            </div>
          </div>
        </div>
      </ModalComponent>
      <div className="content-title">
        <div className="title-step">Negotiable Your Application</div>
        <div className="subtitle-step">
          Adjust the fields below to propose changes and negotiate terms that
          better fit your needs
          <span className="question-btn">
            <QuestionCircleOutlined
              style={{ color: "#0A5CD8", cursor: "pointer" }}
              onClick={() => onClickOpenModal(true)}
            />
          </span>
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
            valuePrefix={formatDate(state.currentWorkStart)}
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
            valuePrefix={state.currentWorkplaceType}
            options={WorkTypeOptions}
            onChange={(value) => handleSelectChange("workType", value)}
          />
          <InputPrefix
            value={state.hours}
            title="Hours per week"
            subTitle="(Negotiable)"
            valuePrefix={state.currentHoursPerWeek}
            type="input"
            onChange={(e) => handleInputChange("hours", e)}
          />
        </div>
        <InputPrefix
          value={state.currentDescription}
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
          value={state.currentQualifications}
          title="Minimum Qualifications"
          disabled
          type="text-area"
        />
      </div>
      <div className="action">
        <div className="action-left"></div>
        <div className="action-right">
          <ButtonComponent title="Cancel" size="large" onClick={handleCancel} />
          <ButtonComponent
            className="continue-btn"
            type="primary"
            size="large"
            title="Continue"
            onClick={handleNext}
          />
        </div>
      </div>
    </>
  );
};

export default NegotiableForm;
