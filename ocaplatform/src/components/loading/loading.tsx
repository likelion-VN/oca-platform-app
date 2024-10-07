import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toggleLoadingCursor } from "../../utils/dom";
import "./loading.s.scss";

const LoadingPage = () => {
  const loadingRedux = useSelector((state: any) => state.loading);
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  useEffect(() => {
    if (loadingRedux.loadingText) {
      toggleLoadingCursor(true);
    } else {
      toggleLoadingCursor(false);
    }
    return () => {
      toggleLoadingCursor(false);
    };
  }, [loadingRedux.loadingText]);

  return (
    !!loadingRedux.loadingText && (
      <div className="loading-overlay">
        <Spin indicator={antIcon} size="large" />
        <div className="loading-text">{loadingRedux.loadingText}</div>
      </div>
    )
  );
};

export default LoadingPage;
