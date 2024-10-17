import classNames from "classnames";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Company, Congratulation, Individual, Logo } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import ModalComponent from "../../components/modal/modal";
import { LOADING_TYPES } from "../../constants/loadingTypes";
import { handleSignUp } from "../../services/handleSignUp";
import loadingPage from "../../store/actions/loading";
import { clearAllCookies } from "../../utils";
import auth from "../../utils/auth";
import useActions from "../../utils/customHook/useActions";
import useMergeState from "../../utils/customHook/useMergeState";
import { maskEmail } from "../../utils/formatter";
import "./createUser.s.scss";

const CreateUser = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigae = useNavigate();
  const email = decodeURIComponent(Cookies.get("user_email") || '');
  const [state, setState] = useMergeState({
    activeType: null,
    isOpenConfirmModal: false,
    isOpenExistsModal: false,
  });

  const onActiveType = (type: number) => {
    setState({ activeType: type });
  };

  const onCreateAccount = async () => {
    loadingPageAction(LOADING_TYPES.CREATING);
    const isSuccess = await handleSignUp(state.activeType);
    if (isSuccess) {
      loadingPageAction();
      setState({ isOpenConfirmModal: true });
    } else {
      loadingPageAction();
      setState({ isOpenExistsModal: true });
    }
  };

  const onClickConfirm = () => {
    navigae("/dash-board");
  };

  const onClickExists = () => {
    auth.clearLocalStorage();
    clearAllCookies();
    navigae("/sign-in");
  };

  useEffect(() => {
    loadingPageAction();
  }, []);

  return (
    <div className="background-create">
      <ModalComponent
        className="modal-success"
        open={state.isOpenConfirmModal}
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
        <img src={Congratulation} alt="congratulation" />
        <div className="modal-success-title">Congratulation!</div>
        <div className="modal-success-content">
          You registered successfully <br />
          Let’s start finding an O-CA program that fits you.
        </div>
      </ModalComponent>
      <ModalComponent
        className="modal-exists"
        open={state.isOpenExistsModal}
        onCancel={onClickExists}
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="OK"
              size="large"
              onClick={onClickExists}
            />
          </div>
        }
      >
        <div className="modal-exists-title">Company account already exists</div>
        <div className="modal-exists-content">
          The company account has already been assigned as {maskEmail(email)}
          .<br />
          Please check with your HR team and use this account.
        </div>
      </ModalComponent>
      <div className="header">
        <img src={Logo} alt="logo" />
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
                state.activeType === 1 && "left-active",
                state.activeType === 2 && "right-active"
              )}
            />
          </div>
          <div className="create-content-type">
            <div
              className={classNames(
                "type-card",
                state.activeType === 1 && "type-card-active"
              )}
              onClick={() => onActiveType(1)}
            >
              <img src={Individual} alt="individual-icon" />
              <div>
                <div className="type-card-title">Individual Account</div>
                <div className="type-card-subtitle">{`I’m Looking for experience`}</div>
              </div>
            </div>
            <div
              className={classNames(
                "type-card",
                state.activeType === 2 && "type-card-active"
              )}
              onClick={() => onActiveType(2)}
            >
              <img src={Company} alt="company-icon" />
              <div>
                <div className="type-card-title">Company Account</div>
                <div className="type-card-subtitle">{`I’m Offering experience`}</div>
              </div>
            </div>
          </div>
          <ButtonComponent
            title="Create an account"
            className="create-btn"
            onClick={onCreateAccount}
            size="large"
            disabled={!state.activeType}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
