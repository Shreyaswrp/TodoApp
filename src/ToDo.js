import React, { Component } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class ToDo extends Component {
  state = {
    todoItems: {},
  };

  addItems = (item) => {
    const items = { ...this.state.todoItems };
    console.log(items);
    items[`item${Date.now()}`] = item;
    this.setState({
      todoItems: items,
    });
  };

  removeItem = (item) => {
    confirmAlert({
      title: "Delete",
      message: "Do you want to delete this  ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const todos = { ...this.state.todoItems };

            delete todos[item];
            this.setState({ todoItems: todos });
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  updateItems = (key, updatedTodo) => {
    const todos = { ...this.state.todoItems };
    todos[key] = updatedTodo;
    this.setState({ todoItems: todos });
  };

  render() {
    return (
      <div className="App">
        <div className="Todo">
          <div className="TodoCard">
            <div className="card">
              <TodoForm addToDoItems={this.addItems} />
              <ul>
                {Object.keys(this.state.todoItems)
                  .reverse()
                  .map((key) => (
                    <TodoList
                      key={key}
                      index={key}
                      todoItems={this.state.todoItems[key]}
                      removeToDoItem={this.removeItem}
                      updateTodos={this.updateItems}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDo;
