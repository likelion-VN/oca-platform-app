import {
  ContainerOutlined,
  HomeFilled,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import "./sideBar.s.scss";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <HomeFilled />, label: "Home" },
  { key: "2", icon: <ProfileOutlined />, label: "Application" },
  { key: "3", icon: <UserOutlined />, label: "Profile" },
  { key: "4", icon: <ContainerOutlined />, label: "Saved" },
];

interface IPropsSideBar {
  collapsed: boolean;
  className: string;
}

const SideBar: React.FC<IPropsSideBar> = ({ collapsed, className }) => {
  return (
    <div>
      <Menu
        className={className}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SideBar;
