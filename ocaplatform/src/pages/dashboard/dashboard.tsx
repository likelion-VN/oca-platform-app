/* eslint-disable @typescript-eslint/no-explicit-any */

import { MenuProps } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DrawerComponent from "../../components/drawer/drawer";
import Header from "../../components/header/header";
import SideBar from "../../components/sideBar/sideBar";
import { clearAllCookies, isTokenExpired } from "../../utils";
import auth from "../../utils/auth";
import { useSetState } from "../../utils/customHook/useSetState";
import ApplicationCandidatePage from "./application/candidate/applicationCandidate";
import ApplicationCompanyPage from "./application/company/applicationCompany";
import "./dashboard.s.scss";
import HomePage from "./home/home";
import Profile from "./profile/profile";

const Dashboard = () => {
  const navigate = useNavigate();
  const isCompanyUser = auth.isCompanyUser();
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
        if (isCompanyUser) {
          return <ApplicationCompanyPage isActive={state.selectedKey === '2'}/>
        } else {
          return <ApplicationCandidatePage isActive={state.selectedKey === "2"} />;
        }
      }
      case "3": {
        return <Profile isActive={state.selectedKey === "3"} />;
      }
      // case "4": {
      //   return (
      //     <Result status="403" subTitle="This page will be updated soon!" />
      //   );
      // }
      default: {
        return <HomePage isActive={state.selectedKey === "1"} />;
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("user_token");
    if (!!token) {
      if (isTokenExpired(token)) {
        auth.clearLocalStorage();
        clearAllCookies();
        navigate("/sign-in");
      }
    } else {
      auth.clearLocalStorage();
      clearAllCookies();
      navigate("/sign-in");
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
