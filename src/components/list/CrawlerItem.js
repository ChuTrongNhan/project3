import React from "react";
import { Avatar } from "rsuite";

import "./CrawlerItem.scss";

const CrawlerItem = ({ name, date, pick }) => {
  return (
    <div className={"crawler-item " + (pick ? "crawler-item--dark" : "")}>
      <Avatar circle style={{ backgroundColor: "rgba(194, 193, 194, 0.5)" }}>
        {name.slice(0, 2).toUpperCase()}
      </Avatar>
      <div className="crawler-info">
        <span className={pick ? "crawler-name--dark" : "crawler-name"}>
          {name}
        </span>
        <span className="crawler-date">{date}</span>
      </div>
    </div>
  );
};

export default CrawlerItem;
