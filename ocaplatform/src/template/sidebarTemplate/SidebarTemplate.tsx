import { MenuProps } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./sidebarTemplate.scss";
import auth from "../../utils/auth";
import { clearAllCookies, isTokenExpired } from "../../utils";
import Header from "../../components/header/header";
import SideBar from "../../components/sideBar/sideBar";
import DrawerComponent from "../../components/drawer/drawer";
import { safeNavigate } from "../../utils/helper";
import useMergeState from "../../utils/customHook/useMergeState";

const SidebarTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useMergeState({
    collapsed: false,
    selectedKey: "1",
    openDrawer: false,
  });

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/sign-in");
    }
  }, []);

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
