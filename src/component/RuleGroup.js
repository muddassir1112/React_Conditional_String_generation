import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Condition } from "./Condition";

export const RuleGroup = () => {
  const data = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([0]);
  const [chosenCondition, setChosenCondition] = useState("");
  // console.log(rowslength);
  const generateCondition = () => {
    if (chosenCondition === "") {
      alert("Please Choose Condition type");
      return;
    } else {
      setCount((prev) => prev + 1);
      setRows([...rows, count]);
      // let obj = {
      //   chosenCond: `${chosenCondition === "AnyCondition" ? "||" : "&&"}`,
      //   object: data.valueObj,
      // };
      // data.setValues([...data.values, obj]);
    }
  };
  console.log(data.values);
  return (
    <div className="container border rounded mt-1" style={{ width: "50%" }}>
      <div className="card-body">
        <p className="fs-4">Rule Group</p>
        <span className="fs-6">
          {" "}
          Product(s) must match : &nbsp;&nbsp;&nbsp;
          <input
            className="form-check-input"
            type="radio"
            name="condition"
            value="AnyCondition"
            onChange={(e) => {
              console.log(e.target.value);
              setChosenCondition(e.target.value);
            }}
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
            value="AllCondition"
            onChange={(e) => {
              console.log(e.target.value);
              setChosenCondition(e.target.value);
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <label className="form-check-label" htmlFor="AllCondition">
            All Condition
          </label>
        </span>
      </div>
      {rows.length > 0
        ? rows.map((ele, index) => (
            <Condition key={index} generateCondition={generateCondition} />
          ))
        : null}
      <button
        type="button"
        onClick={generateCondition}
        className="btn btn-outline-secondary mb-2"
      >
        Add more
      </button>

      <p>
        Current Condition(s): (
        {data.values.map((ele) => (
          <>
            <span>
              {ele.title}&nbsp;{ele.condition}&nbsp;
              {ele.text} {chosenCondition === "AnyCondition" ? "||" : "&&"}{" "}
              &nbsp;
            </span>
          </>
        ))}
        )
      </p>
    </div>
  );
};
