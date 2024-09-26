"use client";

import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Company, Congratulation, Individual, Logo } from "../assets/svg";
import ButtonComponent from "../components/button/button";
import ModalComponent from "../components/modal/modal";
import useMergeState from "../utils/customHook/useMergeState";
import "./create-user.s.scss";

const CreateUser = () => {
  const router = useRouter();
  const [state, setState] = useMergeState({
    activeType: null,
    isOpenConfirm: false,
  });
  const onActiveType = (type: string) => {
    setState({ activeType: type });
  };
  const onCreateAccount = () => {
    setState({ isOpenConfirm: true });
  };
  const onClickConfirm = () => {
    router.push("./dashboard");
  };
  return (
    <div className="background">
      <ModalComponent
        className="modal-confirm"
        open={state.isOpenConfirm}
        onCancel={onClickConfirm}
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="OK"
              size="large"
              onClick={onClickConfirm}
            />
          </div>
        }
      >
        <Image src={Congratulation} alt="congratulation" />
        <div className="modal-confirm-title">Congratulation!</div>
        <div className="modal-confirm-content">
          You registered successfully <br />
          Let’s start finding an O-CA program that fits you.
        </div>
      </ModalComponent>
      <div className="header">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="create-wrapper">
        <div className="create-content">
          <div className="create-content-title">
            What type of account do you need?
          </div>
          <div className="create-content-subtitle">
            Choose your account to get started.
          </div>
          <div className="create-content-part">
            <div
              className={classNames(
                "circle",
                state.activeType && "circle-active",
                state.activeType === "individual" && "left-active",
                state.activeType === "company" && "right-active"
              )}
            />
          </div>
          <div className="create-content-type">
            <div
              className={classNames(
                "type-card",
                state.activeType === "individual" && "type-card-active"
              )}
              onClick={() => onActiveType("individual")}
            >
              <Image src={Individual} alt="individual-icon" />
              <div className="type-card-title">Individual Account</div>
              <div className="type-card-subtitle">{`I’m Looking for experience`}</div>
            </div>
            <div
              className={classNames(
                "type-card",
                state.activeType === "company" && "type-card-active"
              )}
              onClick={() => onActiveType("company")}
            >
              <Image src={Company} alt="company-icon" />
              <div className="type-card-title">Company Account</div>
              <div className="type-card-subtitle">{`I’m Offering experience`}</div>
            </div>
          </div>
          <ButtonComponent
            title="Create an account"
            className="create-btn"
            onClick={onCreateAccount}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
