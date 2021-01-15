import React from "react";
import { Icon, Modal } from "rsuite";
import MyLoader from "../common/MyLoader";

import "./Crawling.modal.scss";

const CrawlingModal = ({ show }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Crawling Data</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="progress-indicator">
          <MyLoader />
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <div className="my-button">
          <span>Export to Google spreadsheet</span>
          <Icon icon="google" />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CrawlingModal;
