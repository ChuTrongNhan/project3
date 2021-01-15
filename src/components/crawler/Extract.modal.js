import React, { useState } from "react";
import { Modal, Input, SelectPicker } from "rsuite";

import "./Extract.modal.scss";
import { HTML_ATTRIBUTES } from "../../constants";

const ExtractModal = ({ show, onCancel, onAdd }) => {
  const [name, setName] = useState("");
  const [selector, setSelector] = useState("");
  const [extract, setExtract] = useState({ type: "text", attr: "" });
  const [showWarning, setShowWarning] = useState(false);

  const dataAttribute = HTML_ATTRIBUTES.map((attribute) => ({
    value: attribute,
    label: attribute,
  }));

  const extractTypes = [
    { value: "attr", label: "attr" },
    { value: "text", label: "text" },
  ];

  const ok = () => {
    if (name && selector && (extract.type === "text" || extract.attr)) {
      onAdd({
        id: new Date().valueOf(),
        name,
        selector,
        extract,
      });
      setName("");
      setSelector("");
      setExtract({ type: "text", attr: "" });
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header>
        <Modal.Title>New Element extraction</Modal.Title>
      </Modal.Header>
      <Modal.Body className="extract--modal">
        <div className="extract-row">
          <div className="extract--input-row">
            <div className="extract--label">Name</div>
            <Input
              value={name}
              onChange={setName}
              placeholder="Element name"
              style={{ width: 200 }}
            />
          </div>
          <div className="extract--input-row">
            <div className="extract--label">Selector</div>
            <Input
              value={selector}
              onChange={setSelector}
              placeholder="CSS selector"
            />
          </div>
          <div className="extract--input-row">
            <div className="extract--label">Extract</div>
            <SelectPicker
              value={extract.type}
              onChange={(value) => setExtract({ type: value, attr: "" })}
              data={extractTypes}
              searchable={false}
              cleanable={false}
              style={{ width: 100 }}
            />
            {extract.type === "attr" ? (
              <SelectPicker
                value={extract.attr}
                onChange={(value) => setExtract({ type: "attr", attr: value })}
                data={dataAttribute}
                style={{ width: 150, marginLeft: 8 }}
              />
            ) : null}
          </div>
        </div>
        {showWarning ? (
          <div className="warning-text">Please fill all fields !</div>
        ) : null}
      </Modal.Body>
      <Modal.Footer className="extract--modal-footer">
        <div onClick={onCancel} className="my-button--subtle">
          Cancel
        </div>
        <div onClick={ok} className="my-button">
          Ok
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtractModal;
