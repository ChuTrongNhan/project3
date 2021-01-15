import React, { useState } from "react";
import image1 from "../assets/images/image1.png";
import { Input, Icon } from "rsuite";

import "./NoCrawler.scss";

const NoCrawler = ({ onAddNewCrawler }) => {
  const [newName, setNewName] = useState("");

  const handleOnChange = (value) => {
    if (value.length <= 12) {
      setNewName(value);
    }
  };

  return (
    <div className="no-crawler">
      <div className="no-crawler--container">
        <img src={image1} alt="" />
        <div className="form">
          <span className="input-title">Create your own crawler now</span>
          <Input
            value={newName}
            onChange={handleOnChange}
            placeholder="Crawler's name (12 characters)"
            className="input"
          />
          <div
            className="my-button--accent"
            onClick={() => onAddNewCrawler(newName)}
            style={{ width: "100%" }}
          >
            <span>Create New Crawler</span>
            <Icon icon="plus" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoCrawler;
