"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoogleIcon, LinkedinIcon, Logo } from "../assets/svg";
import ButtonComponent from "../components/button/button";
import "./login.s.scss";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);
  const loginByLinkedin = () => {
    router.push("/create-user");
  };
  const loginByGoogle = () => {
    router.push("/create-user");
  };
  return (
    <div className="background-login">
      <div className="header">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="login">
        <div className="login-title">Welcome to O-CA</div>
        <div className="login-subtitle">Please sign in or sign up below.</div>
        <ButtonComponent
          title="Continue with Linkedin"
          className="login-linkedin"
          size="large"
          onClick={loginByLinkedin}
          icon={<Image src={LinkedinIcon} alt="linkedin" />}
        />
        <div className="login-space">
          <span>or</span>
        </div>
        <ButtonComponent
          title="Continue with Google"
          className="login-google"
          size="large"
          onClick={loginByGoogle}
          icon={<Image src={GoogleIcon} alt="google" />}
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
