import { createContext } from "react";
import "./App.css";
import { CreateQuery } from "./component/CreateQuery";
export const UserContext = createContext();
function App() {
  return (
    <div className="card container rule-group mt-2">
      <div className="card-body">
        <div className="card-title">
          <h3 className="text-center">React Conditional String generation</h3>
        </div>
        <CreateQuery />
      </div>
    </div>
  );
}

export default App;
