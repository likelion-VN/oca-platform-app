import { Button } from "antd";
import React from "react";

interface IPropsButton {
  onClick?: (e?: any) => void;
  icon?: React.ReactNode;
  className?: string;
  title?: string;
  iconPosition?: "start" | "end";
  type?: "default" | "link" | "primary";
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  loading?: boolean;
}

const ButtonComponent: React.FC<IPropsButton> = ({
  onClick,
  icon,
  className,
  title,
  iconPosition,
  type = "default",
  size = "middle",
  disabled = false,
  loading = false,
}) => {
  return (
    <Button
      className={className}
      style={{ borderRadius: 4, height: "40px" }}
      icon={icon}
      onClick={onClick}
      iconPosition={iconPosition}
      type={type}
      size={size}
      loading={loading}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
