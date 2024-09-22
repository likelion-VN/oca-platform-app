import { Modal } from "antd";
import React from "react";

interface IPropsModal {
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: React.ReactNode;
  content?: React.ReactNode;
}

const ModalComponent: React.FC<IPropsModal> = ({
  open,
  onCancel,
  onOk,
  footer,
  content,
}) => {
  return (
    <Modal
      className="modal-confirm"
      open={open}
      onCancel={onCancel}
      footer={footer}
      onOk={onOk}
    >
      {content}
    </Modal>
  );
};

export default ModalComponent;
