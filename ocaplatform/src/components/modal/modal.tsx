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
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
