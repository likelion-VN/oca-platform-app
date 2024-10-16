import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, LinkedinIcon } from "../../assets/svg";
import ButtonComponent from "../../components/button/button";
import loadingPage from "../../store/actions/loading";
import useActions from "../../utils/customHook/useActions";
import "./signIn.s.scss";

const LoginPage = () => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();

  // const linkedinAuthUrl = `${apiServiceUrl}oauth2/authorization/linkedin`;
  // const googleAuthUrl = `${apiServiceUrl}oauth2/authorization/google`;

  const loginByLinkedin = () => {
    // window.location.href = linkedinAuthUrl;
    // navigate("/create-user");
  };

  const loginByGoogle = () => {
    // *: For productions
    const clientId = '422066525891-em62unn8kjsk5ui0c5g8u0sq5llp31cs.apps.googleusercontent.com';
    // const redirectUri = 'https://localhost:3000/login/auth2/code/google';
    const redirectUri = 'https://www.lion-up.net/login/auth2/code/google';
    const scope = 'profile email';
    const responseType = 'token';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    // Open Google login in a new tab
    window.location.href = googleAuthUrl;
    // const popup = window.open(
    //   googleAuthUrl,
    //   "Login by Google",
    //   `width=${width},height=${height},top=${top},left=${left}`
    // );

    // const checkPopup = setInterval(() => {
    //   if (popup && popup.closed) {
    //     clearInterval(checkPopup);
    //   }
    // }, 1000);

    // *: For developer (Please first check and don't push this code to production)

    // const accessToken =
    //   "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MjIwNjY1MjU4OTEtZW02MnVubjhranNrNXVpMGM1Zzh1MHNxNWxscDMxY3MuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUxNzUyODgzNTMwMjA3NTQ2MjMiLCJoZCI6Imxpa2VsaW9uLm5ldCIsImVtYWlsIjoidGh0aWVuMDExMEBsaWtlbGlvbi5uZXQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImgzTjVzVFdpdnlfVmdHazhBYlQySFEiLCJub25jZSI6IkZuNVRfOWZ6QXk0dU5aVUhqNmFWMzljNkxTQ1prLVJDbWtQUGhrUzdWdHciLCJuYW1lIjoidGh0aWVuMDExMCB0aHRpZW4wMTEwIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xsX2I2aHRsbVBKSnl2SEZUQU1xQVRSZDRNdnJXcGVjTGNBTWlEa3c4TnFhdlFfQT1zOTYtYyIsImdpdmVuX25hbWUiOiJ0aHRpZW4wMTEwIiwiZmFtaWx5X25hbWUiOiJ0aHRpZW4wMTEwIiwiaWF0IjoxNzI5MDQ4Mjg5LCJleHAiOjE3MjkwNTE4ODl9.S7lN1LHDeQrZP8gOk9pyvkgQjvQeZHJhv9clRr_ro-75TcVeh2wQcmipz3IsaPgxL4gsknuIl3R8AVIxJ9uQrMpfqcSraA0-3mWChS6pTecI4VVrrhv4vLxLGwjVc-JgcvURmSYJ2bdjObJa4QKjTx889AgxC98JzOZcxT3LGxa1UGOjL6jbnETg4R_Y4W3B4ByI3bHZk_8QkiB6y0WD7YPcQTeZ5DLPfdk5H10q9EvgS081wt3EHtlAxM_9bn6fUXiVGsxlKP5fE5tKt7krlF79dZI5Q0mxZvaqorG81OE45wuO4TH-FKFBuybEqqSS1pI56fIkO304XuWcP0J0eA";
    // const email = "thtien0110@likelion.net";
    // const role = 1;
    // auth.setIsLoginLocal(true);
    // document.cookie = `j_user_email=${email}; path=/; secure; SameSite=Strict`;
    // document.cookie = `j_user_token=${accessToken}; path=/; secure; SameSite=Strict`;
    // if (!_.isEqual(role, 0)) {
    //   auth.setRoles(role);
    //   navigate("/");
    // } else {
    //   navigate("/create-user");
    // }
  };

  useEffect(() => {
    loadingPageAction();
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
