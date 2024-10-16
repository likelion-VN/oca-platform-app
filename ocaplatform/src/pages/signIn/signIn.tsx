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
    window.location.href = linkedinAuthUrl;
    // navigate("/create-user");
  };

  const loginByGoogle = () => {
    // *: For production
    // const width = 500;
    // const height = 600;
    // const left = window.screen.width / 2 - width / 2;
    // const top = window.screen.height / 2 - height / 2;
    // window.open(
    //   googleAuthUrl,
    //   "Login by Google",
    //   `width=${width},height=${height},top=${top},left=${left}`
    // );
    // *: For developer (Please first check and don't push this code to production)
    const accessToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYwNzI0MDMyNzU3OTIwMDM5MjEiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoicXVhbmdraGFpMDkwMUBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijg5eXBGUm5lb2FhaTZRVnZONVF2VWciLCJub25jZSI6Ino4S1dUZEJ3MncyaHNjcEY2Y1B2YmNvSk9Oa2tXR1dOU3BucldBVUdtaHciLCJuYW1lIjoiRG9RdWFuZyBLaGFpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xhQVY1SFU3VDZOa2Y1ZlhkUU9TczhsRnFNaGxzZGJmMHJwb1Y0a0ttRnEybm9tQT1zOTYtYyIsImdpdmVuX25hbWUiOiJEb1F1YW5nICIsImZhbWlseV9uYW1lIjoiS2hhaSAiLCJpYXQiOjE3MjkwNDQ2ODgsImV4cCI6MTcyOTA0ODI4OH0.quKnTOR6XksCnTytTSox0xtsmb446v2N0vsfGlyTKTkb1jL2MNPAhBpHJOBe6pVqq_pfecqKzm7mMAcQoYEikud7l05Rzkxb3oD8Dz_KxOb0RlIoXKaux495a50CfHm5WAa7zve5JUXDL4T8z-C4OptKB0AnSkMiTzkpdCqSaFNASlQly8V4qUVUQj3YHjulJcp0XJNkj201usHtcnDtlpZdfU31wWmStgb7RSRitEEzJyzC0q2BbE2kTQHytx5i31j73jLgjXKCZ9nZIJV1Z9HQ4czoWjoUSBnIyhFL3D1l3TdGnGFJaLDY92i3YHiCXafXyUFJDoc4Z4VmG_7kSw";
    const email = "thtien0110@likelion.net";
    const role = 1;
    auth.setIsLogin(true);
    auth.setEmail(email);
    auth.setAccessToken(accessToken);
    if (!_.isEqual(role, 0)) {
      auth.setRoles(role);
      navigate("/");
    } else {
      navigate("/create-user");
    }
  };

  useEffect(() => {
    const handleReceiveData = (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        const { cookies } = event.data;
        if (cookies?.j_user_token) {
          auth.setEmail(cookies.j_user_email);
          if (!_.isEqual(Number(cookies.j_user_account_type), 0)) {
            auth.setRoles(Number(cookies.j_user_account_type));
            navigate("/");
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
  }, [navigate]);

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
