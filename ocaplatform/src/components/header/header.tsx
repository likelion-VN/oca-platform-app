import { BellOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import React from "react";
import { BackRightIcon, UserIcon } from "../../assets/svg";
import { logoutUrl } from "../../constants";
import { clearAllCookies } from "../../utils";
import auth from "../../utils/auth";
import { safeNavigate } from "../../utils/helper";
import ButtonComponent from "../button/button";
import "./header.s.scss";

interface IPropsHeader {
  toggleCollapsed: () => void;
  toggleDrawer: () => void;
}

const Header: React.FC<IPropsHeader> = ({ toggleCollapsed, toggleDrawer }) => {
  const handleViewProfile = () => {
    safeNavigate("/profile");
  };

  const handleLogout = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = logoutUrl;

    document.body.appendChild(iframe);
    auth.clearLocalStorage();
    clearAllCookies();
    safeNavigate("/sign-in");
  };

  const items: MenuProps["items"] = [
    {
      className: "menu-user-item",
      label: (
        <>
          <img src={UserIcon} alt="user-icon" /> Profile
        </>
      ),
      key: "0",
      onClick: handleViewProfile,
    },
    {
      className: "menu-user-item",
      label: (
        <>
          <img src={BackRightIcon} alt="back-right-icon" /> Log out
        </>
      ),
      key: "1",
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <ButtonComponent
            className="menu-icon"
            icon={<MenuOutlined size={24} />}
            onClick={toggleCollapsed}
          />
          <div className="text">LION-UP</div>
        </div>
        <div className="header-right">
          <BellOutlined />
          <Dropdown
            overlayClassName="menu-user"
            menu={{ items }}
            trigger={["click"]}
          >
            <Avatar size={32} icon={<UserOutlined />} className="avatar" />
          </Dropdown>
          <ButtonComponent
            className="drawer-menu-icon"
            icon={<MenuOutlined size={24} />}
            onClick={toggleDrawer}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
