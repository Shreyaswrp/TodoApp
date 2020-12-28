import React from "react";

class TodoList extends React.Component {
 

  constructor(props) {
    super(props);
    this.InputRef = React.createRef();
  }

  state = { isActive: true, text: "No items" };

  Toggle = () => {
    this.setState({ isActive: !this.state.isActive });
    if (this.state.isActive) {
      this.InputRef.current.focus();
    } else {
      this.InputRef.current.blur();
    }
  };

  Change = (event) => {
    const updateTodo = {
      ...this.props.todoItems,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateTodos(this.props.index, updateTodo);
  };

  Checkbox = (event) => {
    const updateTodo = {
      ...this.props.todoItems,
      [event.currentTarget.name]: event.currentTarget.checked,
    };
    this.props.updateTodos(this.props.index, updateTodo);
  };

  render() {
    return (
      <>
        <div className="ItemsList">
          <li className={this.props.todoItems.isCompleted ? "done" : null}>
            <input
              style={{ fontSize: "25px" }}
              type="checkbox"
              name="isCompleted"
              checked={this.props.todoItems.isCompleted}
              onChange={this.Checkbox}
            />
            <input
              type="text"
              name="todo"
              value={this.props.todoItems.todo}
              onChange={this.Change}
              ref={this.InputRef}
            />
          </li>
          <i class="fa fa-edit EditBtn" onClick={this.Toggle}>
            {this.state.isActive}
          </i>
          <i
            class="fa fa-trash DeleteBtn"
            style={{}}
            onClick={() => this.props.removeToDoItem(this.props.index)}
          />
        </div>
      </>
    );
  }
}

export default TodoList;
