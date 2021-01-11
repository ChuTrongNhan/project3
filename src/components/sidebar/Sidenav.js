import React from "react";
import "./Sidenav.scss";
import { Icon } from "rsuite";

const Sidenav = () => {
  return (
    <div className="side-nav">
      <div className="brand">
        <Icon icon="grav" size="3x" style={{ color: "#673AB7" }} />
        {/* <span className="brand__name">Crawlers Management System</span> */}
      </div>
    </div>
  );
};

export default Sidenav;
