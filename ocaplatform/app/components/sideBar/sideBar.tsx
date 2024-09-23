import { HomeFilled, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { BookmarkSimple } from "phosphor-react";
import React from "react";
import "./sideBar.s.scss";

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
    { key: "1", icon: <HomeFilled />, label: "Home" },
    { key: "2", icon: <ProfileOutlined />, label: "Application" },
    { key: "3", icon: <UserOutlined />, label: "Profile" },
    {
      key: "4",
      icon:
        selectedKey === "4" ? (
          <BookmarkSimple size={16} weight="fill" />
        ) : (
          <BookmarkSimple size={16} />
        ),
      label: "Saved",
    },
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
