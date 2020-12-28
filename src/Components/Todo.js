import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Itemslist from "./Itemslist";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      errmsg: "",
      edititems: false,
      currentElement: {
        text: "",
        key: "",
      },
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    const currentdata = this.state.currentElement;
    if (currentdata.text == "" || currentdata.text.trim().length === 0) {
      this.setState({ errmsg: "Task cannot be empty" });
    } else {
      const inputdata = [currentdata, ...this.state.list];
      this.setState({
        list: inputdata,
        errmsg: "",
        currentElement: {
          text: "",
          key: "",
        },
      });
    }
  };

  removeMsgHandler = () => {
    this.setState({
      errmsg: "",
    });
  };

  inputHandler = (e) => {
    this.setState({
      currentElement: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  };

  deleteItem = (key) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const newList = this.state.list.filter((item) => item.key !== key);
            this.setState({ list: newList });
          },
        },
        {
          label: "No",
          onClick: () => console.log("No clicked"),
        },
      ],
    });
  };

  editItem = (textone, key) => {
    if (this.state.edititems === true) {
      const newTodo = this.state.list;
      newTodo.map((item) => {
        if (item.key === key) {
          item.text = textone;
        }
      });
      this.setState({ list: newTodo });
    } else {
      console.log("nothing");
    }
  };
  changeValue = () => {
    this.setState({ edititems: !this.state.edititems });
  };

  logoutHandler = () => {
    return this.props.history.push("/");
  };

  render() {
    return (
      <div className="todoContainer">
        <form
          className="todoForm"
          autoComplete="off"
          onSubmit={this.submitHandler}
        >
          <h2 className="heading">ToDo List</h2>

          <input
            className="inputField"
            placeholder="enter your task"
            name="task"
            value={this.state.currentElement.text}
            onChange={this.inputHandler}
            onClick={this.removeMsgHandler}
          ></input>
          <button className="addtaskBtn" type="submit">
            +
          </button>
          <div className="errMsg">{this.state.errmsg}</div>
          <Itemslist
            list={this.state.list}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            changeValue={this.changeValue}
          ></Itemslist>
        </form>
        <button class="logout-button" onClick={this.logoutHandler}>
          Logout
        </button>
      </div>
    );
  }
}

export default Todo;
