import React, {Component} from "react";

export default class TodoItem extends Component {

    render() {
        const todoList = this.props.todoList;
        const todoListItem = todoList.map((item) => {
            return (
                <div className="todo-list-container" key={item.key}>
                    <input type="checkbox" className="todo-list-checkbox"/>
                    <input
                        className="todo-input-list"
                        type="text"
                        id={item.key}
                        value={item.text}
                        onChange={(e) => {
                        this
                            .props
                            .handleItemEdit(e.target.value, item.key);
                    }}
                        autoComplete="off"/>
                    <i
                        className="far fa-trash-alt delete-btn"
                        onClick={() => {
                        this
                            .props
                            .handleItemDelete(item.text, item.key);
                    }}></i>
                    <i
                        className="fas fa-pen edit-btn"
                        type="button"
                        onClick={() => {
                        this
                            .props
                            .changeEditItemState();
                    }}></i>
                </div>
            );
        });

        return (
            <div>{this.props.todoList.length === 0
                    ? <h3 className='emptyTodo-list-message'>Todo list is Empty!</h3>
                    : todoListItem}</div>
        );
    }
}