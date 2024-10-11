/* eslint-disable @typescript-eslint/no-explicit-any */

import { Drawer, MenuProps, Result } from "antd";
import Header from "../../components/header/header";
import SideBar from "../../components/sideBar/sideBar";
import { useSetState } from "../../utils/customHook/useSetState";
import ApplicationPage from "./application/application";
import "./dashboard.s.scss";
import HomePage from "./home/home";

export default function Dashboard() {
  const [state, setState] = useSetState({
    collapsed: false,
    selectedKey: "1",
    openDrawer: false,
  });

  const toggleCollapsed = () => {
    setState((prevState: any) => ({ collapsed: !prevState.collapsed }));
  };

  const handleSelect: MenuProps["onSelect"] = (info) => {
    setState({ selectedKey: info.key });
  };

  const toggleDrawer = () => {
    setState((prevState: any) => ({ openDrawer: !prevState.openDrawer }));
  };

  const renderPage = (key: string) => {
    switch (key) {
      case "2": {
        return <ApplicationPage isActive={state.selectedKey === "2"} />;
      }
      case "3": {
        return (
          <Result status="403" subTitle="This page will be updated soon!" />
        );
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
        <Header toggleDrawer={toggleDrawer} toggleCollapsed={toggleCollapsed} />
        <div className="content">
          <SideBar
            collapsed={state.collapsed}
            className="nav-bar"
            selectedKey={state.selectedKey}
            onSelect={handleSelect}
          />
          <div className="content-detail">{renderPage(state.selectedKey)}</div>
        </div>
        <Drawer
          onClose={toggleDrawer}
          placement="left"
          open={state.openDrawer}
          className="dashboard-drawer"
        >
          <SideBar
            collapsed={false}
            className="drawer-side-bar"
            selectedKey={state.selectedKey}
            onSelect={() => {}}
          />
        </Drawer>
      </div>
    </div>
  );
}
