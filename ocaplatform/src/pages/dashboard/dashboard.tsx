/* eslint-disable @typescript-eslint/no-explicit-any */

import { MenuProps } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import DrawerComponent from "../../components/drawer/drawer";
import Header from "../../components/header/header";
import SideBar from "../../components/sideBar/sideBar";
import { clearAllCookies, isTokenExpired } from "../../utils";
import auth from "../../utils/auth";
import { useSetState } from "../../utils/customHook/useSetState";
import { safeNavigate } from "../../utils/helper";
import ApplicationPage from "./application/applicationPage";
import "./dashboard.s.scss";
import HomePage from "./home/home";
import Profile from "./profile/profile";

const Dashboard = () => {
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
          return <ApplicationPage />;
      }
      case "3": {
        return <Profile />;
      }
      // case "4": {
      //   return (
      //     <Result status="403" subTitle="This page will be updated soon!" />
      //   );
      // }
      default: {
        return <HomePage />;
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("user_token");
    if (!!token) {
      if (isTokenExpired(token)) {
        auth.clearLocalStorage();
        clearAllCookies();
        safeNavigate("/sign-in");
      }
    } else {
      auth.clearLocalStorage();
      clearAllCookies();
      safeNavigate("/sign-in");
    }
  }, []);

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
        <DrawerComponent
          open={state.openDrawer}
          placement="left"
          closeable={true}
          onclose={toggleDrawer}
          className="dashboard-drawer"
          content={
            <SideBar
              collapsed={false}
              className="drawer-side-bar"
              selectedKey={state.selectedKey}
              onSelect={() => {}}
            />
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
