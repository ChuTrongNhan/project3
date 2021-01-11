import React, { useState } from "react";
import { Input, InputGroup, SelectPicker, Icon, InputNumber } from "rsuite";

import "./Selector.scss";
import { HTML_ELEMENTS } from "../../constants";

const initialS = {
  tag: "",
  attrType: "",
  attr: { class: "", id: "", nthChild: 1 },
};

const Selector = ({ selector = initialS, onUpdate, onDelete }) => {
  const [editting, setEditting] = useState(false);
  const [tag, setTag] = useState(selector.tag);
  const [attrType, setAttrType] = useState(selector.attrType);
  const [attrClass, setAttrClass] = useState(selector.attr.class);
  const [attrId, setAttrId] = useState(selector.attr.id);
  const [attrNthChild, setAttrNthChild] = useState(selector.attr.nthChild);

  const data = [
    { value: "class", label: "class" },
    { value: "id", label: "id" },
    { value: "nth-child", label: "nth-child" },
  ];

  const dataElement = HTML_ELEMENTS.map((element) => ({
    value: element,
    label: element,
  }));

  const onFinishEdit = () => {
    setEditting(false);
    onUpdate({
      id: selector.id,
      tag: tag,
      attrType: attrType,
      attr: { class: attrClass, id: attrId, nthChild: attrNthChild },
    });
  };

  return (
    <div className="selector-row">
      <Icon icon="arrow-down" className="icon__arrow-down" />
      <div style={{ maxWidth: 200 }}>
        <InputGroup disabled={!editting}>
          <InputGroup.Addon>Element</InputGroup.Addon>
          <SelectPicker
            value={tag}
            onChange={setTag}
            data={dataElement}
            style={{ width: 150 }}
          />
        </InputGroup>
      </div>
      <div className="line"></div>
      <div className="selector__attr">
        <InputGroup disabled={!editting}>
          <InputGroup.Addon>Attr</InputGroup.Addon>
          <SelectPicker
            value={attrType}
            onChange={setAttrType}
            data={data}
            searchable={false}
            cleanable={false}
            style={{ width: 100 }}
          />
          {attrType === "id" ? (
            <Input value={attrId} onChange={setAttrId} />
          ) : attrType === "class" ? (
            <Input value={attrClass} onChange={setAttrClass} />
          ) : (
            <InputNumber
              value={attrNthChild}
              onChange={setAttrNthChild}
              min={1}
            />
          )}
        </InputGroup>
      </div>
      <div>
        {editting ? (
          <div className="icon-style" onClick={onFinishEdit}>
            <Icon icon="check" />
          </div>
        ) : (
          <div className="icon-style" onClick={() => setEditting(true)}>
            <Icon icon="edit" />
          </div>
        )}
        <div className="icon-style" onClick={onDelete}>
          <Icon icon="trash-o" />
        </div>
      </div>
    </div>
  );
};

export default Selector;
