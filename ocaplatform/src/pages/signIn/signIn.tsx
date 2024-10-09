import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, LinkedinIcon, Logo } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import loadingPage from "../../store/actions/loading";
import useActions from "../../utils/customHook/useActions";
import "./signIn.s.scss";

const LoginPage = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();

  const loginByLinkedin = () => {
    navigate("/create-user");
  };
  const loginByGoogle = () => {
    navigate("/create-user");
  };
  useEffect(() => {
    loadingPageAction();
  }, []);

  return (
    <div className="background-login">
      <div className="header">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login">
        <div className="login-title">Welcome to O-CA</div>
        <div className="login-subtitle">Please sign in or sign up below.</div>
        <ButtonComponent
          title="Continue with Linkedin"
          className="login-linkedin"
          size="large"
          onClick={loginByLinkedin}
          icon={<img src={LinkedinIcon} alt="linkedin" />}
        />
        <div className="login-space">
          <span>or</span>
        </div>
        <ButtonComponent
          title="Continue with Google"
          className="login-google"
          size="large"
          onClick={loginByGoogle}
          icon={<img src={GoogleIcon} alt="google" />}
        />
        <div className="login-policy">
          By signing up you accept our <strong>Terms of Service</strong> and{" "}
          <strong>Privacy Policy</strong>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
