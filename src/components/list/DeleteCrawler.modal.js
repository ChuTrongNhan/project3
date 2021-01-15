import React from "react";
import { Modal, Icon } from "rsuite";

const DeleteCrawler = ({ show, onConfirm, onCancel, crawlerName }) => {
  return (
    <Modal backdrop="static" show={show} onHide={onCancel} size="xs">
      <Modal.Header closeButton={false} className="my-modal-header">
        <Modal.Title
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Icon
            icon="remind"
            style={{
              color: "#ffb300",
              fontSize: 36,
              lineHeight: "50px",
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span>
          Do you want to delete <b>{crawlerName}</b> ?
        </span>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div onClick={onConfirm} className="my-button">
          Ok
        </div>
        <div onClick={onCancel} className="my-button--subtle">
          Cancel
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCrawler;
