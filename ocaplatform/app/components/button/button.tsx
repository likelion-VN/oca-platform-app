import { Button } from "antd";
import React from "react";

interface IPropsButton {
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  title?: string;
  iconPosition?: "start" | "end";
  type?: "default" | "link" | "primary";
}

const ButtonComponent: React.FC<IPropsButton> = ({
  onClick,
  icon,
  className,
  title,
  iconPosition,
  type = "default"
}) => {
  return (
    <Button className={className} icon={icon} onClick={onClick} iconPosition={iconPosition} type={type}>
      {title}
    </Button>
  );
};

export default ButtonComponent;
