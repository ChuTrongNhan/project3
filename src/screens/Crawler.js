import React, { useState } from "react";
import {
  Input,
  SelectPicker,
  Icon,
  InputGroup,
  Button,
  FlexboxGrid,
  Radio,
  RadioGroup,
} from "rsuite";
import "./Crawler.scss";
import { HTML_ATTRIBUTES } from "../constants";

import Selector from "../components/crawler/Selector";

const Crawler = ({ crawler, onSave }) => {
  const [url, setUrl] = useState(crawler.url);
  const [selectorTree, setSelectorTree] = useState(crawler.selectorTree || []);
  const [selectorStr, setSelectorStr] = useState(crawler.selectorStr);
  const [extract, setExtract] = useState({
    type: crawler.extractType,
    attr: crawler.attr,
  });
  const [useSelectorTree, setUseSelectorTree] = useState(
    crawler.useSelectorTree || true
  );

  const dataAttribute = HTML_ATTRIBUTES.map((attribute) => ({
    value: attribute,
    label: attribute,
  }));

  const extractTypes = [
    { value: "attr", label: "attr" },
    { value: "text", label: "text" },
  ];

  const saveCrawler = () => {
    onSave({
      url: url,
      useSelectorTree: useSelectorTree,
      selectorTree: selectorTree,
      selectorStr: selectorStr,
      extractType: extract.type,
      attr: extract.attr,
    });
  };

  const addSelector = () => {
    let newSelectorTree = [
      ...selectorTree,
      {
        id: new Date().valueOf(),
        tag: "div",
        attrType: "class",
        attr: { class: "", id: "", nthChild: 1 },
      },
    ];
    setSelectorTree(newSelectorTree);
  };

  const updateSelector = ({ id, tag, attrType, attr }) => {
    let newSelectorTree = selectorTree.map((selector) => {
      if (selector.id !== id) return selector;
      else
        return {
          id: id,
          tag: tag,
          attrType: attrType,
          attr: attr,
        };
    });
    setSelectorTree(newSelectorTree);
  };

  const deleteSelector = (deleteId) => {
    let newSelectorTree = selectorTree.filter(
      (selector) => selector.id !== deleteId
    );
    setSelectorTree(newSelectorTree);
  };

  return (
    <div className="crawler">
      <div className="header">
        <div className="title">
          <span className="title-secondary">Crawler name</span>
          <span className="title-primary">{crawler.name}</span>
        </div>
        <FlexboxGrid className="button-group">
          <FlexboxGrid.Item>
            <Button
              color="violet"
              appearance="ghost"
              className="my-button"
              onClick={saveCrawler}
            >
              <span>Save</span>
              <Icon icon="save" />
            </Button>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item style={{ marginLeft: 8 }}>
            <Button color="violet" className="my-button">
              <span>Start crawling</span>
              <Icon icon="rocket" />
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>

      <div className="crawler-form">
        <div className="input">
          <span className="label">URL</span>
          <InputGroup>
            <InputGroup.Addon>
              <Icon icon="link" style={{ color: "#673ab7" }} />
            </InputGroup.Addon>
            <Input value={url} onChange={setUrl} />
          </InputGroup>
        </div>
        <div className="input">
          <span className="label">Extract</span>
          <div className="input-row">
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
        <div className="specification">
          <div className="input">
            <span className="label">CSS selector tree</span>
            <div>
              <RadioGroup
                value={useSelectorTree}
                onChange={setUseSelectorTree}
                inline
                style={{ padding: "12px 0" }}
              >
                <Radio value={true}>
                  <span
                    className={useSelectorTree ? "blue-highlight" : "gray-blur"}
                  >
                    Use CSS selector generator
                  </span>
                </Radio>
                <Radio value={false}>
                  <span
                    className={useSelectorTree ? "gray-blur" : "blue-highlight"}
                  >
                    Use custom CSS selector path
                  </span>
                </Radio>
              </RadioGroup>
              <div>
                {useSelectorTree ? (
                  <div className="selector-container">
                    {selectorTree.map((selector) => (
                      <Selector
                        key={selector.id}
                        selector={selector}
                        onUpdate={updateSelector}
                        onDelete={() => deleteSelector(selector.id)}
                      />
                    ))}
                    <div className="add-selector" onClick={addSelector}>
                      <Icon icon="plus" />
                    </div>
                  </div>
                ) : (
                  <Input
                    componentClass="textarea"
                    rows={3}
                    value={selectorStr}
                    onChange={setSelectorStr}
                    placeholder="Your custom CSS selector path"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crawler;
