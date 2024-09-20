"use client";

import Image from "next/image";
import { Logo } from "../assets/svg";
import "./login.s.scss";

const LoginPage = () => {
  return (
    <div className="background">
      <div className="header">
        <Image src={Logo} alt="logo"/>
      </div>
      <div className="content">test</div>
    </div>
  );
};

export default LoginPage;
