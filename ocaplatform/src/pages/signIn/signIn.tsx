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
    // 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUxNzUyODgzNTMwMjA3NTQ2MjMiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoidGh0aWVuMDExMEBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InhMZy1PTlhPMkdWeTRJdUNsalpSYmciLCJub25jZSI6IkQyU3RXT0VTM2s2R2NlM1RvMU1GMDBadTNPcjFTRDFRUDN6djg0NC1MTVUiLCJuYW1lIjoidGh0aWVuMDExMCB0aHRpZW4wMTEwIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xsX2I2aHRsbVBKSnl2SEZUQU1xQVRSZDRNdnJXcGVjTGNBTWlEa3c4TnFhdlFfQT1zOTYtYyIsImdpdmVuX25hbWUiOiJ0aHRpZW4wMTEwIiwiZmFtaWx5X25hbWUiOiJ0aHRpZW4wMTEwIiwiaWF0IjoxNzI5MjM1NTM4LCJleHAiOjE3MjkyMzkxMzh9.roNThH5mSuEqkGIGClHgimFZeUhj8UmTBK_0M5CM5dLTQ6L7V0um-kXVyKsjYXXs8TFCSn5mXPlMcDFa4NpsTJ3QvG5LwQAAB4eSUuyT4oaG4i90qL6q14TE8iNr_-8_KmHeddg5GZ9IbXjcfX68CxqKUaeiuGdNmGRQFXoGZYjHHssyHAyEKTz4wmGTvGiUBbz42Gy5KTtd92pajg-o6N4GM0cQyREY8IqtkgEqHHkr6cqYLUXu9urYnlV5BScUE0rS_oBs8W_bksp6lEQbs15dSEq7F5bHtOCDh_n3xsKabEnuB4it6FlTUPmhENB6sUOXtBQlnqzmFHEPX3r5AQ'
    // const email = "thtien0110@likelion.net";
    // Cookies.set("user_token", idToken, { path: "/", secure: true });
    // Cookies.set("user_email", encodeURIComponent(email), {
    //   path: "/",
    //   secure: true,
    // });
    // // Set accout type
    // // auth.setCandidateUser(true);
    // auth.setCompanyUser(true);
    // if (isTokenExpired(idToken)) {
    //   message.error("Token is expired! Get another token to login!");
    // } else {
    //   safeNavigate("/dash-board");
    // }
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
