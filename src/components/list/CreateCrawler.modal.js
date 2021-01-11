import React from "react";
import { Modal, Button } from "rsuite";

const CreateCrawlerModel = ({ show, confirm, cancel }) => {
  return (
    <Modal show={show} onHide={cancel}>
      <Modal.Header>
        <Modal.Title>Create New Crawler</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button onClick={confirm} appearance="primary">
          Ok
        </Button>
        <Button onClick={cancel} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCrawlerModel;
