import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

export const Condition = () => {
  const data = useContext(UserContext);
  const [fields, setFields] = useState(["Title", "Quantity", "Price", "Brand"]);
  const [condition, setcondition] = useState([
    "Equals",
    "Not Equals",
    "Contain",
    "Not Contain",
    "Less Than equals",
    "Greater than equals",
  ]);
  const [Title, setTitle] = useState("");
  const [Condition, setCondition] = useState("");
  const [input, setInput] = useState("");
  // const [values, setValues] = useState([]);
  // useEffect(() => {
  //   let obj = {
  //     title: Title,
  //     condition: Condition,
  //     text: input,
  //   };
  //   data.setValues([...data.values, obj]);
  // }, []);
  const handleSelectCondition = (e) => {
    if (e.target.value === "Equals") {
      setCondition("===");
    } else if (e.target.value === "Not Equals") {
      setCondition("!==");
    } else if (e.target.value === "Contain") {
      setCondition("%LIKE%");
    } else if (e.target.value === "Not Contain") {
      setCondition("!%LIKE%");
    } else if (e.target.value === "Less Than equals") {
      setCondition("<=");
    } else if (e.target.value === "Greater than equals") {
      setCondition(">=");
    }
  };
  const handleInputText = (e) => {
    setInput(e.target.value);
    console.log(input);
    // if (Title === "Title" || Title === "Brand") {
    // }
    let obj = {
      title: Title,
      condition: Condition,
      text: e.target.value,
    };
    data.setValueObj(obj);
    data.setValues([...data.values, obj]);
  };
  // console.log(data.valueObj);
  return (
    <>
      {/* Field Select box */}
      {/* <div className="col-md-2"> */}
      <div className="row g-3">
        <div className="col-md-4">
          <select
            className="form-select mb-3"
            aria-label=".form-select-lg example"
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value="--Fields--" selected>
              --Choose Fields--
            </option>
            {fields.map((ele, index) => (
              <option key={index} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
        {/* Condition */}
        <div className="col-md-4">
          <select
            className="form-select mb-3"
            aria-label=".form-select-lg example"
            onChange={handleSelectCondition}
          >
            <option value="--Fields--" selected>
              --Condition--
            </option>
            {condition.map((ele, index) => (
              <option key={index} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            aria-label="First name"
            onChange={handleInputText}
          />
        </div>
      </div>
    </>
  );
};
