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
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYwNzI0MDMyNzU3OTIwMDM5MjEiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoicXVhbmdraGFpMDkwMUBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjI4ejR5ZWtpMUE3cHlkTGVwa0FNeEEiLCJub25jZSI6IjFNTzNSNmFOYmxuZ3oxRnBDdkVEMVVyblRTTlRpWG42MHFXZGRGQkcxYkkiLCJuYW1lIjoiRG9RdWFuZyBLaGFpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xhQVY1SFU3VDZOa2Y1ZlhkUU9TczhsRnFNaGxzZGJmMHJwb1Y0a0ttRnEybm9tQT1zOTYtYyIsImdpdmVuX25hbWUiOiJEb1F1YW5nICIsImZhbWlseV9uYW1lIjoiS2hhaSAiLCJpYXQiOjE3MjkyMzg5MTgsImV4cCI6MTcyOTI0MjUxOH0.nEgg182EWM-TdlVqQAfvYhhSvWKRxJ85XL_ITCFvxJP_mELn1hLimOiv687m02zRfchMle6Q1t8aM-vARoX1gShGNE9rCcHa1aMgj01UItvu9XS7VNwVEnEziUOINGaTHX2PiW2EQ-YP4co3XhDY0CU10YaBU7VUWEDcXMaf3WmuFwSI4k4hyYsUWHXLXsOaK324eksWhI2SAu7XFDoMdbBfKboOgeUEjRBdYvjU0dnr-rgmHpog6OIAXHZRQQblzAh_xA3rFIzorrRka_4onB9syNwLOkLqZvCjGZqt4SrQuqNo9vAgjNNLUcqfrfcS6VnqLWlR7XupidhLeR4-4A";
    const email = "quangkhai0901@likelion.net";
    Cookies.set("user_token", idToken, { path: "/", secure: true });
    Cookies.set("user_email", encodeURIComponent(email), {
      path: "/",
      secure: true,
    });
    // Set accout type
    // auth.setCandidateUser(true);
    auth.setCompanyUser(true);
    safeNavigate("/dash-board");
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
