import { Modal } from "antd";
import React from "react";

interface IPropsModal {
  className?: string;
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: React.ReactNode;
  centered?: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  width?: number;
}

const ModalComponent: React.FC<IPropsModal> = ({
  className,
  open,
  onCancel,
  onOk,
  footer,
  centered,
  children,
  title,
  width,
}) => {
  return (
    <Modal
      title={title}
      className={className}
      open={open}
      onCancel={onCancel}
      footer={footer}
      onOk={onOk}
      centered={centered}
      maskClosable={false}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
