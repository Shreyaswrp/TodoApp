import Login from "./Pages/Loginpage/Login";
import { Route } from "react-router-dom";
import Todo from "./Components/Todo";

function App() {
  return (
    <div>
      <Route path="/" exact component={Login}></Route>
      <Route path="/Todo" exact component={Todo}></Route>
    </div>
  );
}

export default App;
