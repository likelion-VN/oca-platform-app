"use client";

import { ArrowLeft } from "phosphor-react";
import ButtonComponent from "../components/button/button";
import useMergeState from "../utils/customHook/useMergeState";
import "./application-form.s.scss";

const ApplicationForm = () => {
  const [state, setState] = useMergeState({
    activeType: null,
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
    </div>
  );
};

export default ApplicationForm;
