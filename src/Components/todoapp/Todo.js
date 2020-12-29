import React, {Component} from "react";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Itemslist from "./Itemslist";
import "../../Styles/Todo.css";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            errorMessage: "",
            editStatus: false,
            currentElement: {
                text: "",
                key: ""
            }
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        const currentdata = this.state.currentElement;
        if (currentdata.text === "" || currentdata.text.trim().length === 0) {
            this.setState({errorMessage: "Task cannot be empty"});
        } else {
            const inputdata = [
                currentdata, ...this.state.list
            ];
            this.setState({
                list: inputdata,
                errorMessage: "",
                currentElement: {
                    text: "",
                    key: ""
                }
            });
        }
    };

    removeMsgHandler = () => {
        this.setState({errorMessage: ""});
    };

    inputHandler = (e) => {
        this.setState({
            currentElement: {
                text: e.target.value,
                key: Date.now()
            }
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
                        const newList = this
                            .state
                            .list
                            .filter((item) => item.key !== key);
                        this.setState({list: newList});
                    }
                }, {
                    label: "No",
                    onClick: () => console.log("No clicked")
                }
            ]
        });
    };

    editItem = (textone, key) => {
        if (this.state.editStatus === true) {
            const newTodo = this.state.list;
            newTodo.map((item) => {
                if (item.key === key) {
                    item.text = textone;
                }
            });
            this.setState({list: newTodo});
        } else {
            console.log("nothing");
        }
    };

    changeValueHanlder = () => {
        this.setState({
            editStatus: !this.state.editStatus
        });
    };

    logoutHandler = () => {
        return this
            .props
            .history
            .push("/");
    };

    render() {
        return (
            <div className="todo-container">
                <form className="todo-form" autoComplete="off" onSubmit={this.submitHandler}>
                    <h2 className="heading">ToDo List</h2>
                    <input
                        className="task-input-field"
                        placeholder="enter your task"
                        name="task"
                        value={this.state.currentElement.text}
                        onChange={this.inputHandler}
                        onClick={this.removeMsgHandler}></input>
                    <button className="addtask-button" type="submit">+</button>
                    <div className="error-Message">{this.state.errorMessage}</div>
                    <Itemslist
                        list={this.state.list}
                        deleteItem={this.deleteItem}
                        editItem={this.editItem}
                        changeValue={this.changeValueHanlder}></Itemslist>
                </form>
                <button class="logout-button" onClick={this.logoutHandler}>Logout</button>
            </div>
        );
    }
}

export default Todo;
