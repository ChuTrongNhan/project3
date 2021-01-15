import React from "react";
import { Modal } from "rsuite";

const CreateCrawlerModel = ({ show, confirm, cancel }) => {
  return (
    <Modal show={show} onHide={cancel}>
      <Modal.Header>
        <Modal.Title>Create New Crawler</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <div onClick={confirm} className="my-button">
          Ok
        </div>
        <div onClick={cancel} className="my-button--subtle">
          Cancel
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCrawlerModel;
