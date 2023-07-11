import React, { useEffect, useState } from "react";
import { Rule } from "./Rule";

export const CreateQuery = () => {
  const [conditionType, setConditionType] = useState("any");
  const [ruleGroup, setRuleGroup] = useState([]);
  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    let temp = [];
    let id = Math.ceil(Math.random() * 17931);
    let obj = {
      key: id,
      component: <Rule id={id} setRuleGroup={setRuleGroup} />,
      str: {
        title: "Title",
        operator: "==",
        value: "",
      },
    };
    temp.push(obj);
    setRuleGroup(temp);
  }, []);
  //useEffect Hook is being called dynamically
  useEffect(() => {
    generateStringFromArray(ruleGroup);
  }, [ruleGroup]);
  //method to generate the query string
  const generateStringFromArray = (data) => {
    const stringArray = data.map((item) => {
      const { title, operator, value } = item.str;
      let formattedValue = value;

      if (Array.isArray(value)) {
        formattedValue = value.join(", ");
      }
      if (conditionType === "any") {
        return `(${title} ${operator} ${formattedValue})`;
      } else if (conditionType === "all") {
        return `${title} ${operator} ${formattedValue}`;
      }
    });
    let generatedString = "";
    if (conditionType === "all") {
      generatedString = stringArray.join(" && ");
      generatedString = `( ${generatedString} )`;
    } else if (conditionType === "any") {
      generatedString = stringArray.join(" || ");
    }
    setQueryString(generatedString);
  };
  //function to add more query
  const handleAddMoreQuery = () => {
    let id = Math.ceil(Math.random() * 1212);
    let obj = {
      key: id,
      component: <Rule id={id} setRuleGroup={setRuleGroup} />,
      str: {
        title: "",
        operator: "",
        value: "",
      },
    };
    ruleGroup.push(obj);
    setRuleGroup([...ruleGroup]);
  };
  return (
    <div className="rounded mt-1 p-3">
      <div className="card-body">
        <p className="fs-4">Rule Group</p>
        <span className="fs-6">
          Product(s) must match : &nbsp;&nbsp;&nbsp;
          <input
            className="form-check-input"
            type="radio"
            name="condition"
            value="Any Condition"
            checked={conditionType === "any" ? true : false}
            onClick={() => setConditionType("any")}
          />
          &nbsp;&nbsp;&nbsp;
          <label className="form-check-label" htmlFor="AnyCondition">
            Any Condition
          </label>
          &nbsp;&nbsp;&nbsp;
          <input
            className="form-check-input"
            type="radio"
            name="condition"
            value="All Condition"
            checked={conditionType === "all" ? true : false}
            onClick={() => setConditionType("all")}
          />
          &nbsp;&nbsp;&nbsp;
          <label className="form-check-label" htmlFor="AllCondition">
            All Condition
          </label>
        </span>
        <div className="d-flex flex-column mb-2">
          {ruleGroup.length !== 0
            ? ruleGroup.map((ele, index) => (
                <div key={index} className="d-flex flex-nowrap">
                  <div>{ele.component}</div>
                  {ruleGroup.length !== 1 ? (
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm mt-2"
                        onClick={() => {
                          for (let i = 0; i < ruleGroup.length; i++) {
                            if (ele.key === ruleGroup[i].key) {
                              ruleGroup.splice(i, 1);
                            }
                          }
                          setRuleGroup([...ruleGroup]);
                        }}
                      >
                        <i
                          className="fa fa-trash"
                          style={{ fontSize: "24px", color: "red" }}
                        ></i>
                      </button>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
      <p className="ms-3">Current Condition(s): {queryString}</p>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary me-md-2"
          type="button"
          onClick={handleAddMoreQuery}
        >
          Add More
        </button>
      </div>
    </div>
  );
};
