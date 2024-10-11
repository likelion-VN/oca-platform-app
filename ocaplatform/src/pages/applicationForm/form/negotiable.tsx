/* eslint-disable @typescript-eslint/no-explicit-any */

import { QuestionCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ButtonComponent from "../../../components/button/button";
import InputPrefix from "../../../components/input/inputPrefix/inputPrefix";
import ModalComponent from "../../../components/modal/modal";
import { WorkTypeOptions } from "../../../constants/selectOptions";
import useMergeState from "../../../utils/customHook/useMergeState";
import { formatDate } from "../../../utils/formatter";

interface NegotiableFormProps {
  defaultData: any;
  handleClick: (stepData: any, isClickNext: boolean) => void;
  handleCancel: () => void;
  isLoading: boolean;
}

const NegotiableForm: React.FC<NegotiableFormProps> = ({
  defaultData,
  handleClick,
  handleCancel,
  isLoading,
}) => {
  const [state, setState] = useMergeState({});

  const handleInputChange = (
    keyValue: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ [keyValue]: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validInput = /^[0-9]*$/.test(value);
    if (validInput) {
      setState({ hoursPerWeek: value });
    }
  };

  const handleTaskChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { currentTasks } = state;
    const updatedTasks = _.map(currentTasks, (task) =>
      task.id === id
        ? { ...task, newTask: e.target.value, isRemove: false }
        : task
    );
    setState({ currentTasks: updatedTasks });
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

  const handleAddTaskBelow = useCallback(
    (id: number | string) => {
      const newId = uuidv4();
      const newTask = {
        id: newId,
        description: "",
        newTask: "",
        isRemove: false,
      };

      const currentIndex = _.findIndex(state.currentTasks, { id });

      if (currentIndex !== -1) {
        const updatedTasks = _.cloneDeep(state.currentTasks);
        updatedTasks.splice(currentIndex + 1, 0, newTask);
        setState({ currentTasks: updatedTasks });
      }
    },
    [state.currentTasks, setState]
  );

  const handleKeyDown = useCallback(
    (id: number | string, e: React.KeyboardEvent<HTMLInputElement>) => {
      const { currentTasks } = state;
      if (e.key === "Delete" || e.key === "Backspace") {
        const task = _.find(currentTasks, (item) => item.id === id);
        if (task) {
          if (task.description.trim() !== "" && task.newTask.trim() === "") {
            const updatedTasks = _.map(currentTasks, (t) =>
              t.id === id ? { ...t, isRemove: true } : t
            );
            setState({ currentTasks: updatedTasks });
          } else if (
            task.description.trim() === "" &&
            task.newTask.trim() === ""
          ) {
            const updatedTasks = _.filter(currentTasks, (t) => t.id !== id);
            setState({ currentTasks: updatedTasks });
          }
        }
      }
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTaskBelow(id);
      }
    },
    [state, setState, handleAddTaskBelow]
  );

  const handleOpenGuideModal = (isOpenGuideModal: boolean) => {
    setState({ isOpenGuideModal });
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
        className="modal-confirm"
        open={!isLoading ? state.isOpenGuideModal : false}
        onOk={() => handleOpenGuideModal(false)}
        onCancel={() => handleOpenGuideModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="Got It"
              size="large"
              type="primary"
              onClick={() => handleOpenGuideModal(false)}
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
              onClick={() => handleOpenGuideModal(true)}
            />
          </span>
        </div>
      </div>
      <div className="form-application">
        <InputPrefix
          value={state.jobTitle}
          title="Job Title"
          subTitle={state.negotiable && "(Negotiable)"}
          valuePrefix={state.currentJobTitle}
          disabled={!state.negotiable}
          type="input"
          onChange={(e) => handleInputChange("jobTitle", e)}
        />
        <InputPrefix
          title="Job Type"
          valuePrefix={state.currentJobType}
          type="input"
          disabled
        />
        <div className="double-input">
          <InputPrefix
            value={state.startDate}
            title="Start working date"
            subTitle={state.negotiable && "(Negotiable)"}
            type="date"
            disabled={!state.negotiable}
            valuePrefix={formatDate(state.currentStartDate)}
            onChange={(date) => handleDateChange("startDate", date)}
          />
          <InputPrefix
            value={state.endDate}
            title="End working date"
            subTitle={state.negotiable && "(Negotiable)"}
            type="date"
            disabled={!state.negotiable}
            valuePrefix={formatDate(state.currentEndDate)}
            onChange={(date) => handleDateChange("endDate", date)}
          />
        </div>
        <div className="double-input">
          <InputPrefix
            value={state.workplaceType}
            title="Workplace type"
            subTitle={state.negotiable && "(Negotiable)"}
            type="select"
            readOnly={!state.negotiable}
            valuePrefix={state.currentWorkplaceType}
            options={WorkTypeOptions}
            onChange={(value) => handleSelectChange("workplaceType", value)}
          />
          <InputPrefix
            value={state.hoursPerWeek}
            title="Hours per week"
            subTitle={state.negotiable && "(Negotiable)"}
            valuePrefix={state.currentHoursPerWeek}
            disabled={!state.negotiable}
            type="input"
            onChange={handleNumberChange}
          />
        </div>
        <InputPrefix
          value={state.currentDescription}
          title="About the job"
          disabled
          type="text-area"
        />
        <InputPrefix
          value={state.currentTasks}
          title="Task"
          subTitle={state.negotiable && "(Negotiable)"}
          type="text-area-input"
          disabled={!state.negotiable}
          onChangeMultiple={(e, id) => handleTaskChange(id, e)}
          onKeyDown={(e, id) => handleKeyDown(id, e)}
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
