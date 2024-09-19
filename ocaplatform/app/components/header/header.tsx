"use client";

import { Logo, notificationIcon } from "@/app/assets/svg";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";
import React from "react";
import ButtonComponent from "../button/button";
import "./header.s.scss";

interface IPropsHeader {
  toggleCollapsed: () => void;
}

const Header: React.FC<IPropsHeader> = ({ toggleCollapsed }) => {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <ButtonComponent
            className="menu-icon"
            icon={<MenuOutlined size={24} />}
            onClick={toggleCollapsed}
          />
          <Image src={Logo} alt="logo" className="logo" />
        </div>
        <div className="header-right">
          <Image
            src={notificationIcon}
            alt="notification-icon"
            className="notification-icon"
          />
          <Avatar size={32} icon={<UserOutlined />} className="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
