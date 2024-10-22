import Cookies from "js-cookie";
import _ from "lodash";
import { useEffect } from "react";
import { GoogleIcon, LinkedinIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import { apiServiceUrl } from "../../constants";
import loadingPage from "../../store/actions/loading";
import auth from "../../utils/auth";
import useActions from "../../utils/customHook/useActions";
import { safeNavigate } from "../../utils/helper";
import "./signIn.s.scss";

const LoginPage = () => {
  const loadingPageAction = useActions(loadingPage);

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
    const width = 500;
    const height = 600;
    const left = window.screenX + window.outerWidth / 2 - width / 2;
    const top = window.screenY + window.outerHeight / 2 - height / 2;
    window.open(
      googleAuthUrl,
      "Login by Google",
      `width=${width},height=${height},top=${top},left=${left}`
    );
    // *: For developer
    // auth.setIsLogin(true);
    // const idToken =
    // 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjczZTI1Zjk3ODkxMTljNzg3NWQ1ODA4N2E3OGFjMjNmNWVmMmVkYTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUxNzUyODgzNTMwMjA3NTQ2MjMiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoidGh0aWVuMDExMEBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImtnSGgwUS1hbFhDX19tbFJfWUNwa1EiLCJub25jZSI6ImdTcm1yMlhENzE2NG9vMWdWak9ZV2lQTEx4Zk1JV2VoSmh6OXBGbTFnZkUiLCJuYW1lIjoidGh0aWVuMDExMCB0aHRpZW4wMTEwIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xsX2I2aHRsbVBKSnl2SEZUQU1xQVRSZDRNdnJXcGVjTGNBTWlEa3c4TnFhdlFfQT1zOTYtYyIsImdpdmVuX25hbWUiOiJ0aHRpZW4wMTEwIiwiZmFtaWx5X25hbWUiOiJ0aHRpZW4wMTEwIiwiaWF0IjoxNzI5NjE0NTQ0LCJleHAiOjE3Mjk2MTgxNDR9.Y8dzMBxRu-V2csRs9rvmLEzj6BPnnhD0R0sq4IN1T9E7NC8n6wmQJjH5P5iJLvDS0om-aXbBsGWhrgOGZRkYjf7ZxLZaMpdG0o00b-EsPYSXP05Ipw-wADIoVgQamuyBcMSL73YfDqedfAxFoHaUbKOIGyB9uYXnVc5fMvw7m-QZwjBS1gGfgi19J6LduUjTJQOEm1bN4tw3UTnTkCMDd90cWzK6l7S4KdrNZ7cPBdTf4nzJzF79NkUtB_8C6qEREnPuC-FrzTtPV2yINGNLMe62uZJ0Y2FiqOu3NSkPlz4xoT5dS-kntDCOYZwc5wq7gymLGki8W3GNGRFqBOMuhw'
    // const email = "quangkhai0901@likelion.net";
    // Cookies.set("user_token", idToken, { path: "/", secure: true });
    // Cookies.set("user_email", encodeURIComponent(email), {
    //   path: "/",
    //   secure: true,
    // });
    // // Set accout type
    // // auth.setCandidateUser(true);
    // auth.setCompanyUser(true);
    // safeNavigate("/dash-board");
  };

  useEffect(() => {
    const handleReceiveData = (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        const { params } = event.data;
        if (!_.isEmpty(params)) {
          auth.setIsLogin(true);
          Cookies.set("user_token", params.idToken, {
            path: "/",
            secure: true,
          });
          Cookies.set("user_email", encodeURIComponent(params.email), {
            path: "/",
            secure: true,
          });
          if (params.account_type !== "0") {
            if (params.account_type === "1") {
              auth.setCandidateUser(true);
            } else {
              auth.setCompanyUser(true);
            }
            safeNavigate("/dash-board");
          } else {
            safeNavigate("/create-user");
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
