import Login from './components/LoginPage/Login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TodoForm from './components/TodoPage/TodoForm';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/todo' exact component={TodoForm}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;