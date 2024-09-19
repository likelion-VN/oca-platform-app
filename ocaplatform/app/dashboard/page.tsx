"use client";

import { useState } from "react";

import Header from "../components/header/header";
import SideBar from "../components/sideBar/sideBar";
import "./dashboard.s.scss";
import HomePage from "./home/home";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Header toggleCollapsed={toggleCollapsed} />
      <div className="content">
        <SideBar collapsed={collapsed} className="nav-bar" />
        <div className="content-detail">
          <HomePage />
        </div>
      </div>
    </div>
  );
}
