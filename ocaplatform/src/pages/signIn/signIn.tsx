import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, LinkedinIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import { apiServiceUrl } from "../../constants";
import loadingPage from "../../store/actions/loading";
import auth from "../../utils/auth";
import useActions from "../../utils/customHook/useActions";
import "./signIn.s.scss";

const LoginPage = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();

  const linkedinAuthUrl = `${apiServiceUrl}oauth2/authorization/linkedin`;
  const googleAuthUrl = `${apiServiceUrl}oauth2/authorization/google`;

  const loginByLinkedin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + window.outerWidth / 2 - width / 2;
    const top = window.screenY + window.outerHeight / 2 - height / 2;
    window.open(
      linkedinAuthUrl,
      "Login by Linkedin",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const loginByGoogle = () => {
    // *: For production
    // const width = 500;
    // const height = 600;
    // const left = window.screenX + window.outerWidth / 2 - width / 2;
    // const top = window.screenY + window.outerHeight / 2 - height / 2;
    // window.open(
    //   googleAuthUrl,
    //   "Login by Google",
    //   `width=${width},height=${height},top=${top},left=${left}`
    // );

    // *: For developer
    auth.setIsLogin(true);
    const idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYwNzI0MDMyNzU3OTIwMDM5MjEiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoicXVhbmdraGFpMDkwMUBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjBQb1ZzZFNtdThQMkJ5VUNjRFFGUVEiLCJub25jZSI6IlVfRGJVTm5kN1hub1FmNUtBOEZNTHJjdnFrTlE3MWl4VFZyUnplaXN4NGciLCJuYW1lIjoiRG9RdWFuZyBLaGFpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xhQVY1SFU3VDZOa2Y1ZlhkUU9TczhsRnFNaGxzZGJmMHJwb1Y0a0ttRnEybm9tQT1zOTYtYyIsImdpdmVuX25hbWUiOiJEb1F1YW5nICIsImZhbWlseV9uYW1lIjoiS2hhaSAiLCJpYXQiOjE3MjkxNDk4NDksImV4cCI6MTcyOTE1MzQ0OX0.mpJNJ0-5ruOkwePwkfwH-7_Bc8UaCQOLFrul9mBeP1Y2MItvSfvHzVgWzYm7Bhcs2ywMkYQd-iEzwsnD8pe54Pykxkf4p8zaOyncVvHCk-ewuVaSALrLGXNC7iClz9VkIaJLwFH38R_Du5eCUPV0ZNhkfVdFIcQn1MJCJVWHRM0pfl4xOJ8gOnvbU30ylRBgIvxCpGFoPIyWpjyl2W6XEts2ajU6QHg3q_KVptR0u1yukJDfOQZI7p_pNSOlYsfOFy7XLEkZ6Mznxd2j5zDcahYQbo5B5pR3X1Av6hHFXfywAQuqc_2_UnvIhqNNkNT_qusZ4kQeKNnK-PdjUuOAFg";
    const email = "thtien0110@likelion.net";
    document.cookie = `user_token=${idToken}; path=/; secure`;
    document.cookie = `user_email=${encodeURIComponent(email)}; path=/; secure`;
    // Set accout type
    auth.setCandidateUser(true);
    // auth.setCompanyUser(true);
    navigate("/dash-board");
  };

  useEffect(() => {
    const handleReceiveData = (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        const { params } = event.data;
        if (!_.isEmpty(params)) {
          auth.setIsLogin(true);
          document.cookie = `user_token=${params.idToken}; path=/; secure`;
          document.cookie = `user_email=${encodeURIComponent(
            params.email
          )}; path=/; secure`;
          if (params.account_type !== "0") {
            if (params.account_type === "1") {
              auth.setCandidateUser(true);
            } else {
              auth.setCompanyUser(true);
            }
            navigate("/dash-board");
          } else {
            navigate("/create-user");
          }
        }
      }
    };
    loadingPageAction();
    window.addEventListener("message", handleReceiveData);

    return () => {
      window.removeEventListener("message", handleReceiveData);
    };
  }, []);

  return (
    <div className="background-login">
      <div className="header">
        <div className="text">LION-UP</div>
      </div>
      <div className="login">
        <div className="login-title">Welcome to LION-UP</div>
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
