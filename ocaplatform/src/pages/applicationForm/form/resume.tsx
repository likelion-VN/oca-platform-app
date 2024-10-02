/* eslint-disable @typescript-eslint/no-explicit-any */

import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, List, message, Upload, UploadProps } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import _ from "lodash";
import { ArrowLeft, Plus, PlusCircle, XCircle } from "phosphor-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessIconGif } from "../../../assets/gif";
import ButtonComponent from "../../../components/button/button";
import InputDefault from "../../../components/input/inputDefault/inputDefault";
import Loading from "../../../components/loading/loading";
import ModalComponent from "../../../components/modal/modal";
import RadioCustom from "../../../components/radio/radio";
import { ACCEPT_FILE_TYPES, MAX_FILE_SIZE } from "../../../constants";
import {
  handleDownloadFile,
  handleUploadFile,
} from "../../../services/applicationForm";
import useMergeState from "../../../utils/customHook/useMergeState";
import { validateEmail } from "../../../utils/validation";

interface ResumeFormProps {
  defaultData: any;
  handleClick: (stepData: any, isClickNext: boolean) => void;
  handleOpenSuccessModal: (isSuccess: boolean) => void;
  handleCancel: () => void;
  isSuccess: boolean;
  isLoading: boolean;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  defaultData,
  handleClick,
  handleOpenSuccessModal,
  handleCancel,
  isSuccess,
  isLoading,
}) => {
  const navigate = useNavigate();
  const dataAttachment = useRef<any[]>([]);
  const chosseFileErrorMessage = useRef<string | null>(null);
  const dropFileErrorMessage = useRef<string | null>(null);
  const [state, setState] = useMergeState({
    isAddMoreEnabled: false,
    listAttachment: [],
    selectedResumeUid: null,
    isOpenRemoveModal: false,
    isOpenApplyModal: false,
    uidRemove: null,
    isLoadingUpload: false,
    errors: {},
  });

  const handleInputChange = (
    keyValue: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ [keyValue]: e.target.value, errors: {...state.errors, [keyValue]: ''} });
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
    setState({ [name]: value,  errors: {...state.errors, resume: ''} });
  };

  const handleChangeAttachment = async (fileList: any, isUploading = false) => {
    let filesUpload = fileList;
    const { listAttachment } = state;
    if (isUploading) {
      filesUpload = _.filter(fileList, (file) => {
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
        return ACCEPT_FILE_TYPES.includes(fileExt) && file.size < MAX_FILE_SIZE;
      });
    }
    handleChangeUpload("listAttachment", [
      ...listAttachment,
      filesUpload[filesUpload.length - 1],
    ]);
    setState({
      selectedResumeUid: filesUpload[filesUpload.length - 1].uid || null,
    });
  };

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".doc,.docx,.pdf",
    beforeUpload: async (file) => {
      setState({ isLoadingUpload: true });
      const id = await handleUploadFile(file);
      if (id) {
        dataAttachment.current = [...dataAttachment.current, { id, ...file }];
      }
      setState({ isLoadingUpload: false });

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

  const handleRemoveResume = () => {
    const { listAttachment, uidRemove } = state;
    const newListAttachment = _.filter(
      listAttachment,
      (resume) => resume.uid !== uidRemove
    );
    setState({
      listAttachment: newListAttachment,
      selectedResumeUid: newListAttachment[0]?.uid || null,
      isOpenRemoveModal: false,
    });
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

  const handleSelectResume = (uid: string) => {
    setState({ selectedResumeUid: uid });
  };

  const handleOpenRemoveModal = (isOpenRemoveModal: boolean) => {
    setState({ isOpenRemoveModal });
  };

  const handleOpenApplyModal = (isOpenApplyModal: boolean) => {
    setState({ isOpenApplyModal });
  };

  const validates = () => {
    const { errors } = state;
    if (_.isEmpty(state.listAttachment)) {
      _.assign(errors, { resume: "Field is required." });
    } else {
      _.unset(errors, "resume");
    }
    if (state.email) {
      if (!validateEmail(state.email)) {
        _.assign(errors, { email: "Email is valid." });
      } else {
        _.unset(errors, "email");
      }
    } else {
      _.assign(errors, { email: "Field is required." });
    }
    if (state.phoneNumber) {
      _.unset(errors, "phoneNumber");
    } else {
      _.assign(errors, { phoneNumber: "Field is required." });
    }
    setState({ errors });
  };

  const handleApply = () => {
    validates();
    if (_.isEmpty(state.errors)) {
      const { listAttachment, selectedResumeUid } = state;
      const attachmentCurrent = _.filter(dataAttachment.current, (item) =>
        _.some(listAttachment, { uid: item.uid })
      );
      const attachmentId = _.find(
        attachmentCurrent,
        (attachment) => attachment.uid === selectedResumeUid
      )?.id;

      handleClick({ step2: { ...state, resume: [attachmentId] } }, true);
    }
    handleOpenApplyModal(false);
  };

  const handleConfirm = () => {
    handleOpenSuccessModal(false);
    navigate("/");
  };

  useEffect(() => {
    const { listAttachment } = state;
    const listUid = dataAttachment.current;
    const newListAttachment = _.map(listAttachment, (file) => {
      const matched = _.find(listUid, { uid: file.uid });

      if (matched) {
        return { ...file, id: matched.id };
      }

      return file;
    });
    setState({ listAttachment: newListAttachment });
  }, [dataAttachment.current]);

  useEffect(() => {
    setState(defaultData);
  }, [defaultData]);

  useEffect(() => {
    setState({ isAddMoreEnabled: checkInputsValid(state.personalWebsite) });
  }, [state.personalWebsite]);

  return (
    <>
      <ModalComponent
        className="modal-remove"
        open={state.isOpenRemoveModal}
        onCancel={() => handleOpenRemoveModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="remove-btn"
              title="Delete resume"
              size="large"
              type="primary"
              onClick={handleRemoveResume}
            />
            <ButtonComponent
              className="cancel-btn"
              title="Cancel"
              size="large"
              type="default"
              onClick={() => handleOpenRemoveModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Remove this resume?</div>
          <div className="title-content">
            Are you sure you want to remove this resume?
            <br />
            This action is permanent and cannot be undone
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-success"
        open={isSuccess}
        onCancel={handleConfirm}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="OK"
              size="large"
              type="primary"
              onClick={handleConfirm}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <img src={SuccessIconGif} alt="success" />
          <div className="title">Your application was successfully</div>
          <div className="title-content">
            You can keep track of your application on the 'Application' page on
            the left or the 'Notice' tab at the top right.
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-apply"
        open={state.isOpenApplyModal}
        onCancel={() => handleOpenApplyModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="submit-btn"
              title="Submit"
              size="large"
              type="primary"
              onClick={handleApply}
            />
            <ButtonComponent
              className="cancel-btn"
              title="Go Back to Review"
              size="large"
              type="default"
              onClick={() => handleOpenApplyModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Review Your Application</div>
          <div className="title-content">
            Please review your application carefully before final submission.
            <br />
            This is your last chance to make any changes.
          </div>
        </div>
      </ModalComponent>
      <Loading isLoading={state.isLoadingUpload || isLoading} />
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
                    className={classNames(
                      resume.uid === state.selectedResumeUid && "active"
                    )}
                    onClick={() => handleSelectResume(resume.uid)}
                  >
                    <div className="resume-item">
                      <div className="resume-item-left">
                        <RadioCustom
                          checked={resume.uid === state.selectedResumeUid}
                        />
                        <div className="resume-description">
                          <div className="resume-title">{resume.name}</div>
                          <div className="resume-modified">
                            {`Uploaded on ${dayjs().format("MM/DD/YYYY")}`}
                          </div>
                        </div>
                      </div>
                      <div className="resume-item-right">
                        <ButtonComponent
                          className="review-btn"
                          icon={<EyeOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadFile(resume.id);
                          }}
                        />
                        <ButtonComponent
                          className="remove-btn"
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenRemoveModal(true);
                            setState({ uidRemove: resume.uid });
                          }}
                        />
                      </div>
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
          {state.errors.resume && (
            <div className="msg-error">{state.errors.resume}</div>
          )}
        </div>
        <InputDefault
          value={state.email}
          title="Email"
          type="input"
          placeholder="Enter email"
          onChange={(e) => handleInputChange("email", e)}
          errorMsg={state.errors.email}
        />
        <InputDefault
          value={state.phoneNumber}
          title="Phone number"
          type="input"
          placeholder="Enter phone number"
          onChange={(e) => handleInputChange("phoneNumber", e)}
          errorMsg={state.errors.phoneNumber}
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
            onClick={() => handleOpenApplyModal(true)}
          />
        </div>
      </div>
    </>
  );
};

export default ResumeForm;
