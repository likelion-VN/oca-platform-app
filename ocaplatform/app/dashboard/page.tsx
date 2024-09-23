/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MenuProps } from "antd";
import Header from "../components/header/header";
import SideBar from "../components/sideBar/sideBar";
import { useSetState } from "../utils/customHook/useSetState";
import "./dashboard.s.scss";
import HomePage from "./home/home";

export default function Dashboard() {
  const [state, setState] = useSetState({
    collapsed: false,
    selectedKey: "1",
  });

  const toggleCollapsed = () => {
    setState((prevState: any) => ({ collapsed: !prevState.collapsed }));
  };

  const handleSelect: MenuProps["onSelect"] = (info) => {
    setState({ selectedKey: info.key });
  };

  return (
    <div>
      <Header toggleCollapsed={toggleCollapsed} />
      <div className="content">
        <SideBar
          collapsed={state.collapsed}
          className="nav-bar"
          selectedKey={state.selectedKey}
          onSelect={handleSelect}
        />
        <div className="content-detail">
          <HomePage />
        </div>
      </div>
    </div>
  );
}
