"use client";

import { ArrowLeft } from "phosphor-react";
import ButtonComponent from "../components/button/button";
import useMergeState from "../utils/customHook/useMergeState";
import "./application-form.s.scss";

const ApplicationForm = () => {
  const [state, setState] = useMergeState({
    checked: false,
    isOpenConfirm: false,
  });
  const onCreateAccount = () => {
    console.log('test', state.isOpenConfirm)
    setState({ isOpenConfirm: true });
  };

  return (
    <div className="background">
      <div className="header">
        <ButtonComponent
          className="back-btn"
          title="Application"
          type="link"
          onClick={onCreateAccount}
          icon={<ArrowLeft size={24}/>}
          iconPosition="start"
        />
      </div>
      <div className="content">
        <div className="switch-component switch-background">
            <div className="switch-item">
                <div className="switch-item-index">1</div>
                <div className="switch-item-title">Negotiable</div>
            </div>
            <div className="switch-item active">
                <div className="switch-item-index">2</div>
                <div className="switch-item-title">Resume</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
