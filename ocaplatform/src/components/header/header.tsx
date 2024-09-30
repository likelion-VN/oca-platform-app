import { BellOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { Logo } from "../../assets/svg";
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
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="header-right">
          <BellOutlined />
          <Avatar size={32} icon={<UserOutlined />} className="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
