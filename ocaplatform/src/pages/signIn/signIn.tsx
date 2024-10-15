import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, LinkedinIcon, Logo } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import { apiServiceUrl } from "../../constants";
import loadingPage from "../../store/actions/loading";
import useActions from "../../utils/customHook/useActions";
import "./signIn.s.scss";

const LoginPage = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();

  const linkedinAuthUrl = `${apiServiceUrl}oauth2/authorization/linkedin`;
  const googleAuthUrl = `${apiServiceUrl}oauth2/authorization/google`;

  const loginByLinkedin = () => {
    window.location.href = linkedinAuthUrl;
    // navigate("/create-user");
  };

  const loginByGoogle = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const loginWindow = window.open(
      googleAuthUrl,
      "Login by Google",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const checkToken = setInterval(() => {
      if (loginWindow) {

        try {
          if (loginWindow.closed) {
            clearInterval(checkToken);
            // Lấy token từ localStorage
            const token = '';
            if (token) {
              // console.log("Token từ localStorage:", token);
              navigate("/create-user");
            } else {
              // console.log("Không tìm thấy token.");
            }
          }
        } catch (error) {
          // console.error("Lỗi khi kiểm tra cửa sổ popup:", error);
        }
      } else {
        clearInterval(checkToken);
      }
    }, 500);
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
