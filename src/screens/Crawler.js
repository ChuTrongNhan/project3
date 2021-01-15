import React, { useState } from "react";
import { Input, Icon, InputGroup } from "rsuite";
import "./Crawler.scss";

import ExtractRow from "../components/crawler/ExtractRow";
import ExtractModal from "../components/crawler/Extract.modal";

const Crawler = ({ crawler, onSave, onStartCrawl }) => {
  const [url, setUrl] = useState(crawler.url);
  const [describe, setDescribe] = useState(crawler.describe);
  const [selector, setSelector] = useState(crawler.selector);
  const [extract, setExtract] = useState(crawler.extract || []);
  const [showExtractModal, setShowExtractModal] = useState(false);

  const saveCrawler = () => {
    onSave({
      url,
      describe,
      selector,
      extract,
    });
  };

  const onAddExtractRow = (newExtractRow) => {
    const newExtract = [...extract, newExtractRow];
    setExtract(newExtract);
    setShowExtractModal(false);
  };

  const onDeleteExtractRow = (id) => {
    const newExtract = extract.filter((el) => el.id !== id);
    setExtract(newExtract);
  };

  return (
    <div className="crawler">
      {showExtractModal ? (
        <ExtractModal
          show={showExtractModal}
          onCancel={() => setShowExtractModal(false)}
          onAdd={onAddExtractRow}
        />
      ) : null}

      <div className="header">
        <div className="title">
          <span className="title-secondary">Crawler name</span>
          <span className="title-primary">{crawler.name}</span>
        </div>
        <div style={{ paddingRight: 36 }}>
          <div className="my-button--ghost" onClick={saveCrawler}>
            <span>Save</span>
            <Icon icon="save" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="crawler-form">
          <div className="input">
            <span className="label">Describe</span>
            <div>
              <Input
                componentClass="textarea"
                rows={2}
                value={describe}
                onChange={setDescribe}
              />
            </div>
          </div>
          <div className="input">
            <span className="label">URL</span>
            <InputGroup>
              <InputGroup.Addon>
                <Icon icon="link" className="input--icon" />
              </InputGroup.Addon>
              <Input value={url} onChange={setUrl} />
            </InputGroup>
          </div>
          <div className="input">
            <span className="label">BLOCK css selector</span>
            <div>
              <Input
                componentClass="textarea"
                rows={3}
                value={selector}
                onChange={setSelector}
              />
            </div>
          </div>
          <div className="input" style={{ paddingBottom: 36 }}>
            <span className="label">ELEMENTS extraction</span>
            <div className="extract-group">
              {extract.map((extractRow) => (
                <ExtractRow
                  key={extractRow.id}
                  extractRow={extractRow}
                  onDelete={onDeleteExtractRow}
                />
              ))}
              <div
                className="add-extract"
                onClick={() => setShowExtractModal(true)}
              >
                <Icon icon="plus" />
              </div>
            </div>
          </div>
        </div>
        <div className="side-panel">
          <div className="button-group">
            <div
              className="my-button--accent"
              onClick={() => onStartCrawl(crawler.id)}
            >
              <span>Start crawling</span>
              <Icon icon="rocket" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crawler;
