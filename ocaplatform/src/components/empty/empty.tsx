import { Empty } from "antd";
import React from "react";

interface IPropsEmpty {
  className?: string;
}

const EmptyComponent: React.FC<IPropsEmpty> = ({ className }) => {
  return <Empty className={className} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

export default EmptyComponent;
