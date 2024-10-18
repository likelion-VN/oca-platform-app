import { HomeFilled, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import "./sideBar.s.scss";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

interface IPropsSideBar {
  collapsed: boolean;
  className: string;
  selectedKey: string;
  onSelect: MenuProps["onSelect"];
}

const SideBar: React.FC<IPropsSideBar> = ({
  collapsed,
  className,
  selectedKey,
  onSelect,
}) => {
  const items: MenuItem[] = [
    {
      key: "1",
      label: (
        <NavLink
          className={({ isActive }) => {
            return isActive ? "active-item-sidebar" : "";
          }}
          to="/dash-board"
        >
          <HomeFilled />
          <span className="content-navlink">Home</span>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink
          className={({ isActive }) => {
            return isActive ? "active-item-sidebar" : "";
          }}
          to="/application"
        >
          <ProfileOutlined />
          <span className="content-navlink">Application</span>
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink
          className={({ isActive }) => {
            return isActive ? "active-item-sidebar" : "";
          }}
          to="/profile"
        >
          <UserOutlined />
          <span className="content-navlink">Profile</span>
        </NavLink>
      ),
    },
    // {
    //   key: "4",
    //   icon:
    //     selectedKey === "4" ? (
    //       <BookmarkSimple size={16} weight="fill" />
    //     ) : (
    //       <BookmarkSimple size={16} />
    //     ),
    //   label: "Saved",
    // },
  ];
  return (
    <Menu
      className={className}
      defaultSelectedKeys={[selectedKey]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      inlineCollapsed={collapsed}
      items={items}
      onSelect={onSelect}
    />
  );
};

export default SideBar;
