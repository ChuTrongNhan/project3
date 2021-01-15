import React from "react";
import { Icon } from "rsuite";

import "./ExtractRow.scss";

const ExtractRow = ({ extractRow, onDelete }) => (
  <div className="extract">
    <div className="extract-row">
      <div className="extract--input-row">
        <div className="extract--label">Name</div>
        <div>{extractRow.name}</div>
      </div>
      <div className="extract--input-row">
        <div className="extract--label">Selector</div>
        <div>{extractRow.selector}</div>
      </div>
      <div className="extract--input-row">
        <div className="extract--label">Extract</div>
        <div>
          {extractRow.extract.type} {extractRow.extract.attr}
        </div>
      </div>
      <div className="extract--delete" onClick={() => onDelete(extractRow.id)}>
        <div className="icon-style">
          <Icon icon="trash-o" />
        </div>
      </div>
    </div>
  </div>
);

export default ExtractRow;
