/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ButtonComponent from "@/app/components/button/button";
import InputDefault from "@/app/components/input/inputDefault/inputDefault";
import useMergeState from "@/app/utils/customHook/useMergeState";
import useUpdateEffect from "@/app/utils/customHook/useUpdateEffect";
import classNames from "classnames";
import _ from "lodash";
import { ArrowLeft, Plus, PlusCircle, XCircle } from "phosphor-react";
import React from "react";

interface ResumeFormProps {
  defaultData: any;
  handleClick: (stepData: any, isClickNext: boolean) => void;
  handleCancel: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  defaultData,
  handleClick,
  handleCancel,
}) => {
  const [state, setState] = useMergeState({
    isAddMoreEnabled: false,
  });

  const handleInputChange = (
    keyValue: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ [keyValue]: e.target.value });
  };

  const handleMultipleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const personalWebsiteCloned = _.cloneDeep(state.personalWebsite);
    personalWebsiteCloned[index] = e.target.value;
    setState({ personalWebsite: personalWebsiteCloned });
  };

  const handleAddMore = () => {
    const { personalWebsite } = state;
    if (personalWebsite.length < 3) {
      setState({ personalWebsite: [...personalWebsite, ""] });
    }
  };

  const handleDestroy = (index: number) => {
    const personalWebsite = _.filter(
      state.personalWebsite,
      (_, i: number) => i !== index
    );
    setState({ personalWebsite });
  };

  const checkInputsValid = (inputs: string[]) => {
    return _.every(inputs, (input) => _.trim(input) !== "");
  };

  const handleBack = () => {
    handleClick({ step2: state }, false);
  };

  const handleApply = () => {
    handleClick({ step2: state }, true);
  };

  useUpdateEffect(() => {
    setState(defaultData);
  }, [defaultData]);

  useUpdateEffect(() => {
    setState({ isAddMoreEnabled: checkInputsValid(state.personalWebsite) });
  }, [state.personalWebsite]);

  return (
    <>
      <div className="content-title">
        <div className="title-step">Resume</div>
        <div className="subtitle-step">
          Upload your resume and portfolio to highlight your skills and
          achievements.
        </div>
      </div>
      <div className="form-application">
        <div className="resume">
          <div className="resume-title">Resume</div>
          <div className="resume-subtitle">
            Upload at least two tailored resumes to match the specific
            requirements of each job you apply for.
          </div>
          <div className="upload-btn">
            <div className="upload-btn-content">
              <div className="name-btn">
                <span>
                  <PlusCircle size={24} color="#ff7710" weight="fill" />
                </span>
                Upload Resume
              </div>
              <div className="subname-btn">
                .doc.dox and .pdf files that are less than 2MB in size
              </div>
            </div>
          </div>
        </div>
        <InputDefault
          value={state.email}
          title="Email"
          type="input"
          placeholder="Enter email"
          onChange={(e) => handleInputChange("email", e)}
        />
        <InputDefault
          value={state.phoneNumber}
          title="Phone number"
          type="input"
          placeholder="Enter phone number"
          onChange={(e) => handleInputChange("phoneNumber", e)}
        />
        <InputDefault
          value={state.portfolio}
          title="Portfolio (Optional)"
          type="input"
          addonBefore="http://"
          optional
          onChange={(e) => handleInputChange("portfolio", e)}
        />
        <div>
          <div className="multiple-input">
            {_.map(state.personalWebsite, (item, index: number) => (
              <div className="multiple-input-row">
                <InputDefault
                  value={item}
                  type="input"
                  title={
                    index === 0 ? "Personal website (Optional)" : undefined
                  }
                  addonBefore="http://"
                  optional
                  onChange={(e) => handleMultipleInputChange(index, e)}
                />
                {index !== 0 && (
                  <span className="detroy-icon">
                    <XCircle
                      size={24}
                      color="#8F8F8F"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDestroy(index)}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
          {state.personalWebsite?.length < 3 && (
            <ButtonComponent
              className={classNames(
                "add-btn",
                !state.isAddMoreEnabled && "disabled"
              )}
              title="Add more"
              type="link"
              onClick={handleAddMore}
              icon={<Plus size={24} />}
              iconPosition="start"
              disabled={!state.isAddMoreEnabled}
            />
          )}
        </div>
        <InputDefault
          value={state.selfIntroduction}
          title="Self-Introduction (Optional)"
          type="text-area"
          optional
          placeholder="Describe yourself in your own words..."
          onChange={(e) => handleInputChange("selfIntroduction", e)}
        />
      </div>
      <div className="action">
        <div className="action-left">
          <ButtonComponent
            className="go-back-btn"
            title="Go Back"
            type="link"
            onClick={handleBack}
            icon={<ArrowLeft size={20} />}
            iconPosition="start"
          />
        </div>
        <div className="action-right">
          <ButtonComponent title="Cancel" size="large" onClick={handleCancel} />
          <ButtonComponent
            className="apply-btn"
            type="primary"
            size="large"
            title="Apply"
            onClick={handleApply}
          />
        </div>
      </div>
    </>
  );
};

export default ResumeForm;
