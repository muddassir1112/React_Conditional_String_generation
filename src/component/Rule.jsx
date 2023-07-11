import React, { useEffect, useState } from "react";

export const Rule = (_props) => {
  const { id, setRuleGroup } = _props;
  const [fields, setFields] = useState(["Title", "Quantity", "Price", "Brand"]); //state to show the titles in first select box
  const [conditionsOptions, setConditionOptions] = useState([
    "Equal",
    "Not Equal",
    "Contains",
    "Not Contains",
    "Less than Equals",
    "Greater than Equals",
  ]); //state to show the conditions in the second select box
  const [ruleGroupStates, setRuleGroupStates] = useState({
    title_field: "Title",
    condition_field: "==",
    value_field: "",
  }); //state to make the query string
  const [condition_type, setConditionType] = useState(""); //to show the condition type in the second select box
  //useEffect Hook is used to set the string as per the present value
  useEffect(() => {
    setRuleGroup((prev) => {
      return prev.map((obj) => {
        if (obj.key === id) {
          return {
            ...obj,
            str: {
              ...obj.str,
              title: ruleGroupStates.title_field,
              operator: ruleGroupStates.condition_field,
              value: ruleGroupStates.value_field,
            },
          };
        }
        return obj;
      });
    });
    handleSelectFields(ruleGroupStates.title_field);
  }, [
    ruleGroupStates.title_field,
    ruleGroupStates.condition_field,
    ruleGroupStates.value_field,
  ]);
  // handle the available condition as per the first select box field
  const handleSelectFields = (value) => {
    let temp = [];
    setRuleGroupStates({ ...ruleGroupStates, title_field: value });
    if (value === "Title" || value === "Brand") {
      temp = ["Equal", "Not Equal", "Contains", "Not Contains"];
    } else if (value === "Price" || value === "Quantity") {
      temp = ["Equal", "Not Equal", "Less than Equals", "Greater than Equals"];
    } else {
      temp = conditionsOptions;
    }
    setConditionOptions(temp);
  };
  //function to handle the condtion as per the instructions
  const handleSelectConditions = (value) => {
    console.log(value);
    if (value === "Equal") {
      setRuleGroupStates({ ...ruleGroupStates, condition_field: "==" });
    } else if (value === "Not Equal") {
      setRuleGroupStates({ ...ruleGroupStates, condition_field: "!==" });
    } else if (value === "Contains") {
      setRuleGroupStates({ ...ruleGroupStates, condition_field: "%LIKE%" });
    } else if (value === "Not Contains") {
      setRuleGroupStates({ ...ruleGroupStates, condition_field: "!%LIKE%" });
    } else if (value === "Less than Equals") {
      setRuleGroupStates({ ...ruleGroupStates, condition_field: "<=" });
    } else if (value === "Greater than Equals") {
      setRuleGroupStates({ ...ruleGroupStates, condition_field: ">=" });
    }
  };
  return (
    <div className="d-flex flex-nowrap">
      {/* flex-row mb-3 */}
      <div className="col-md-3 me-2 pt-2">
        <select
          className="form-select mb-2"
          aria-label=".form-select-lg example"
          onChange={(e) => {
            handleSelectFields(e.target.value);
          }}
          value={ruleGroupStates.title_field}
        >
          {fields.map((ele, index) => (
            <option key={index} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3 me-2 pt-2">
        <select
          className="form-select mb-2"
          aria-label=".form-select-lg example"
          onChange={(e) => {
            handleSelectConditions(e.target.value);
            setConditionType(e.target.value);
          }}
          vallue={condition_type}
        >
          {conditionsOptions.map((ele, index) => (
            <option key={index} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2 me-2 pt-2">
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Value"
          onChange={(e) =>
            setRuleGroupStates({
              ...ruleGroupStates,
              value_field: e.target.value,
            })
          }
          value={ruleGroupStates.value_field}
        />
      </div>
    </div>
  );
};
