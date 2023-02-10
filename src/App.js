import { createContext, useState } from "react";
import "./App.css";
import { RuleGroup } from "./component/RuleGroup";
export const UserContext = createContext();
function App() {
  const [values, setValues] = useState([]);
  const [valueObj, setValueObj] = useState({});
  return (
    <UserContext.Provider value={{ values, setValues, valueObj, setValueObj }}>
      <RuleGroup />
    </UserContext.Provider>
  );
}

export default App;
