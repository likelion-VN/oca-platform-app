import React from "react";
import { MenuProps } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./sidebarTemplate.scss";
import auth from "../../utils/auth";
import { useSetState } from "../../utils/customHook/useSetState";
import { clearAllCookies, isTokenExpired } from "../../utils";
import Header from "../../components/header/header";
import SideBar from "../../components/sideBar/sideBar";
import DrawerComponent from "../../components/drawer/drawer";
type Props = {};

const SidebarTemplate = (props: Props) => {
  const navigate = useNavigate();
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
          <div className="content-detail">
            <Outlet />
          </div>
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

export default SidebarTemplate;
