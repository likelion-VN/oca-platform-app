import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import './loading.s.scss';

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <Spin indicator={antIcon} size="large"/>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loading;
