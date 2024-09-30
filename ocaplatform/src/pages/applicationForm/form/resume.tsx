/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  EllipsisOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Card, Dropdown, List, Menu, message, Upload, UploadProps } from "antd";
import classNames from "classnames";
import _ from "lodash";
import moment from "moment";
import { ArrowLeft, Plus, PlusCircle, XCircle } from "phosphor-react";
import React, { useRef } from "react";
import ButtonComponent from "../../../components/button/button";
import InputDefault from "../../../components/input/inputDefault/inputDefault";
import RadioCustom from "../../../components/radio/radio";
import { ACCEPT_FILE_TYPES, MAX_FILE_SIZE } from "../../../constants";
import useMergeState from "../../../utils/customHook/useMergeState";
import useUpdateEffect from "../../../utils/customHook/useUpdateEffect";
import { formatDate } from "../../../utils/formatter";

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
  const dataAttachment = useRef<any[]>([]);
  const chosseFileErrorMessage = useRef<string | null>(null);
  const dropFileErrorMessage = useRef<string | null>(null);
  const [state, setState] = useMergeState({
    isAddMoreEnabled: false,
    listAttachment: [],
    attachments: undefined,
    selectedResumeUid: null,
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

  const handleChangeUpload = (name: string, value: any) => {
    setState({ [name]: value });
  };

  const handleFileUpload = (file: any) => {
    if (!state.selectedResumeUid) return;

    const updatedList = state.listAttachment.map((resume: any) =>
      resume.uid === state.selectedResumeUid
        ? { name: file.name, lastModifiedDate: moment() } // Replace the file name and date
        : resume
    );
    setState({ listAttachment: updatedList, selectedResumeUid: null });
  };

  const handleChangeAttachment = async (fileList: any, isUploading = false) => {
    let filesUpload = fileList;
    if (isUploading) {
      filesUpload = _.filter(fileList, (file) => {
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
        return ACCEPT_FILE_TYPES.includes(fileExt) && file.size < MAX_FILE_SIZE;
      }).slice(0, 2);
      _.forEach(filesUpload, (file) => {
        const { originFileObj } = file;
        dataAttachment.current = [
          ...dataAttachment.current,
          {
            originFileObj,
            fileName: originFileObj.name,
          },
        ];
      });
    } else {
      //* fileList only contains removed file
      dataAttachment.current = fileList.map((file: any) => {
        const { originFileObj } = file;
        return {
          originFileObj,
          fileName: originFileObj.name,
        };
      });
    }
    handleChangeUpload("listAttachment", filesUpload);
    setState({ selectedResumeUid: filesUpload[filesUpload.length - 1].uid });
    const listFileName = _.map(filesUpload, (item) => item.name);
    const attachments = _.filter(dataAttachment.current, (item) =>
      listFileName.includes(item.fileName)
    );
    handleChangeUpload("attachments", attachments);
  };
  console.log("test1", state.selectedResumeUid);

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".doc,.docx,.pdf",
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
    showUploadList: false,
    onDrop: (e) => {
      let hasInvalidTypeFile = false;
      let hasOversizeFile = false;
      let hasValidFile = false;

      const fileList = e.dataTransfer.files;

      _.forEach(fileList, (file) => {
        const fileExt = `.${file.name.split(".").pop()}`;
        if (!ACCEPT_FILE_TYPES.includes(fileExt.toLowerCase())) {
          hasInvalidTypeFile = true;
        } else if (file.size > MAX_FILE_SIZE) {
          hasOversizeFile = true;
        } else {
          hasValidFile = true;
        }
      });

      if (hasInvalidTypeFile) {
        dropFileErrorMessage.current = "File is not in the correct format!";
      } else if (hasOversizeFile) {
        dropFileErrorMessage.current = "Maximum size is 2MB.";
      } else {
        dropFileErrorMessage.current = null;
      }

      if (!hasValidFile && dropFileErrorMessage.current) {
        message.error(dropFileErrorMessage.current);
        dropFileErrorMessage.current = null;
      }
    },
    onChange: (info) => {
      const { file, fileList } = info;

      //* Case: remove file
      if (file.status === "removed") {
        handleChangeAttachment(fileList);
        return;
      }

      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      const hasInvalidTypeFile = fileList.find((file) => {
        const fileExt = `.${file.name.split(".").pop()}`;
        return !ACCEPT_FILE_TYPES.includes(fileExt.toLowerCase());
      });
      const hasOversizeFile = fileList.find(
        (file: any) => file.size > MAX_FILE_SIZE
      );

      if (fileIndex === fileList.length - 1) {
        if (hasInvalidTypeFile) {
          chosseFileErrorMessage.current = "File is not in the correct format!";
        } else if (hasOversizeFile) {
          chosseFileErrorMessage.current = "Maximum size is 2MB.";
        }

        if (chosseFileErrorMessage.current) {
          message.error(chosseFileErrorMessage.current);
          chosseFileErrorMessage.current = null;
        }
        handleChangeAttachment(fileList, true);
      }
    },
  };

  const menu = (resumeUid: string) => (
    <Menu className="menu-dropdown">
      <Menu.Item key="0">
        <Upload {...uploadProps}>
          <ButtonComponent
            title="Upload new resume"
            icon={<UploadOutlined />}
            onClick={() => handleSelectResume(resumeUid)}
          />
        </Upload>
      </Menu.Item>
      <Menu.Item key="1">
        <ButtonComponent title="View resume" icon={<EyeOutlined />} />
      </Menu.Item>
    </Menu>
  );

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

  const handleSelectResume = (uid: string) => {
    setState({ selectedResumeUid: uid });
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
          <div
            className={classNames(
              "resume-list",
              state.listAttachment.length === 0 && "visible"
            )}
          >
            <List
              itemLayout="horizontal"
              dataSource={state.listAttachment}
              renderItem={(resume: any) => (
                <List.Item>
                  <Card
                    className={classNames(resume.uid === state.selectedResumeUid && "active")}
                    onClick={() => handleSelectResume(resume.uid)}
                  >
                    <div className="resume-item">
                      <div className="resume-item-left">
                        <RadioCustom checked={resume.uid === state.selectedResumeUid } />
                        <div className="resume-description">
                          <div className="resume-title">{resume.name}</div>
                          <div className="resume-modified">
                            {`Uploaded on ${formatDate(
                              resume.lastModifiedDate
                            )}`}
                          </div>
                        </div>
                      </div>
                      <Dropdown
                        overlay={menu(resume.uid)}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <ButtonComponent
                          className="more-action-btn"
                          icon={<EllipsisOutlined />}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Dropdown>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <Upload
            {...uploadProps}
            className={classNames(
              !(state.listAttachment.length < 2) && "visible"
            )}
          >
            <div
              className={classNames(
                "upload-btn",
                !(state.listAttachment.length < 2) && "visible"
              )}
            >
              <div className="upload-btn-content">
                <div className="name-btn">
                  <span>
                    <PlusCircle size={24} color="#ff7710" weight="fill" />
                  </span>
                  Upload Resume
                </div>
                <div className="subname-btn">
                  .doc, .docx and .pdf files that are less than 2MB in size
                </div>
              </div>
            </div>
          </Upload>
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
