import "./App.css";
import {  } from "./style/login.css";
 import Todo from "./ToDo";

import Login from "./login/login";
import { Route } from 'react-router-dom';
function App() {
  return (
    <div >
      <Route path='/' exact component={Login} />
        <Route path='/Todo' exact  component={Todo} />
    </div>
  );
}

export default App;
