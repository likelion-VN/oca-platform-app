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
      icon: <HomeFilled />,
      label: <NavLink to="/dash-board">Home</NavLink>,
    },
    {
      key: "2",
      icon: <ProfileOutlined />,
      label: <NavLink to="/application">Application</NavLink>,
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: <NavLink to="/profile">Profile</NavLink>,
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
