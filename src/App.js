import React, { Component } from 'react';
import UserLogin from './components/userLogin/UserLogin';
import ToDoList from './components/todoApp/todoList/ToDoList';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path='/' exact component={UserLogin} />
        <Route path='/todoapp' component={ToDoList} />
      </div>
    );
  };
};

export default App;
