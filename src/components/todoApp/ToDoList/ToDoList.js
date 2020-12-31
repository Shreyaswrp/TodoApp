import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask } from "../../../Redux/Actions/actions";
import { setErrAddMsg } from "../../../Redux/Actions/actions";
import "./ToDoList.css";
import Items from "../Items/Items";

class TodoList extends Component {
  clearErrMsg = () => {
    this.props.dispatch(setErrAddMsg(""));
  };

  addItemHandler = (e) => {
    e.preventDefault();
    const newItem = e.target.item.value;
    if (newItem === undefined || newItem.toString().trim() === "") {
      return this.props.dispatch(setErrAddMsg("Task must not be empty"));
    } else {
      this.props.dispatch(addTask(newItem));
      e.target.item.value = "";
    }
  };

  render() {
    return (
      <div className="appContainer">
        <h1 className="appTitle">ToDo Application</h1>
        <form onSubmit={this.addItemHandler}>
          <input
            className="inputField"
            type="text"
            name="item"
            onChange={this.clearErrMsg}
            placeholder="Add your task"
          />
          <button type="submit" className="btn add">
            +
          </button>
          <span id="errAddMsg">{this.props.errAddItemMsg}</span>
        </form>
        {this.props.items.length === 0 ? (
          <span id="noTaskAdded">No Task Added</span>
        ) : (
          <Items />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    errAddItemMsg: state.errAddItemMsg,
  };
};

export default connect(mapStateToProps)(TodoList);
