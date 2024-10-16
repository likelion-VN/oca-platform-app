/* eslint-disable @typescript-eslint/no-explicit-any */

import { MenuProps, Result } from "antd";
import Header from "../../components/header/header";
import SideBar from "../../components/sideBar/sideBar";
import { useSetState } from "../../utils/customHook/useSetState";
import ApplicationPage from "./application/application";
import "./dashboard.s.scss";
import HomePage from "./home/home";
import Profile from "./profile/profile";

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

  const renderPage = (key: string) => {
    switch (key) {
      case "2": {
        return <ApplicationPage isActive={state.selectedKey === "2"} />;
      }
      case "3": {
        return <Profile isActive={state.selectedKey === "3"} />;
      }
      case "4": {
        return (
          <Result status="403" subTitle="This page will be updated soon!" />
        );
      }
      default: {
        return <HomePage isActive={state.selectedKey === "1"} />;
      }
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">
        <Header toggleCollapsed={toggleCollapsed} />
        <div className="content">
          <SideBar
            collapsed={state.collapsed}
            className="nav-bar"
            selectedKey={state.selectedKey}
            onSelect={handleSelect}
          />
          <div className="content-detail">{renderPage(state.selectedKey)}</div>
        </div>
      </div>
    </div>
  );
}
