import React from "react";
import { Input, InputGroup, Icon, Avatar, Dropdown } from "rsuite";

import "./CrawlerList.scss";

const iconDropdown = () => {
  return (
    <div style={{ padding: 8 }}>
      <Icon icon="ellipsis-v" className="icon-dropdown" />
    </div>
  );
};

const CrawlerList = ({ crawlerList, selectedId, onSelect, onDelete }) => {
  return (
    <div className="crawler-list">
      <div className="list-head">
        <span className="headline">My crawlers</span>
        <InputGroup className="search-box">
          <Input placeholder="Find crawler" />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
      </div>
      <div className="list-body">
        {crawlerList.length === 0 ? (
          <div className="list-warning">
            You have not create any crawler yet!
          </div>
        ) : null}
        {crawlerList.map((crawler) => (
          <div
            key={crawler.id}
            className={
              "crawler-item " +
              (selectedId === crawler.id ? "crawler-item--dark" : "")
            }
            onClick={() => onSelect(crawler.id)}
          >
            <Avatar
              circle
              style={{ backgroundColor: "rgba(194, 193, 194, 0.5)" }}
            >
              {crawler.name.slice(0, 2).toUpperCase()}
            </Avatar>
            <div className="crawler-info">
              <span
                className={
                  selectedId === crawler.id
                    ? "crawler-name--dark"
                    : "crawler-name"
                }
              >
                {crawler.name}
              </span>
              <span className="crawler-date">{crawler.date}</span>
            </div>
            {selectedId === crawler.id ? (
              <Dropdown
                className="menu-dropdown"
                renderTitle={iconDropdown}
                placement="bottomEnd"
              >
                <Dropdown.Item onSelect={() => onDelete(crawler.id)}>
                  <Icon icon="trash-o" />
                  Delete
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon icon="edit" />
                  Rename
                </Dropdown.Item>
              </Dropdown>
            ) : null}
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="my-button--accent" onClick={() => onSelect("")}>
          <span>Create a new one!</span>
        </div>
      </div>
    </div>
  );
};

export default CrawlerList;
