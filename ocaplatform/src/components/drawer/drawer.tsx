import React from "react";
import { Drawer } from "antd";
import classNames from "classnames";

interface IDrawerProps {
  placement: "left" | "top" | "bottom" | "right";
  content: React.ReactNode;
  title?: string;
  open: boolean;
  className?: string;
  closeable: boolean;
  onclose: () => void;
  size?: "default" | "large";
  footer?: React.ReactNode;
}

const DrawerComponent: React.FC<IDrawerProps> = ({
  placement,
  content,
  title,
  open,
  className,
  closeable,
  onclose,
  size = "default",
  footer,
}) => {
  return (
    <>
      <Drawer
        className={classNames(className, "btn-custom")}
        title={title}
        placement={placement}
        closable={closeable}
        onClose={onclose}
        open={open}
        key={placement}
        size={size}
        footer={footer}
      >
        {content}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
