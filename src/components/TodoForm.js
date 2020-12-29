import React from "react";

class TodoForm extends React.Component {
  todo = React.createRef();
  state = {
    error: "",
    
  };

  addItemOnList = (e) => {
    e.preventDefault();
    const todoItem = {
      todo: this.todo.current.value,
    };
    if (this.todo.current.value.trim().length === 0) {
      this.setState({ error: "Please add a items" });
    } else {
      this.setState({ error: "" });
      this.props.addToDoItems(todoItem);
    }
    e.currentTarget.reset();
  };

  render() {
    return (
      <form  onSubmit={this.addItemOnList}>
        <h1 className="title">TodoList</h1>
        <div style={{ display: "flex" }}>
          <input className="ItemInput" type="text" ref={this.todo} />
          <button className="btn">+</button><br/><br/>
        </div>
        <span className="ErrorMsg">{this.state.error}</span><br/>
        
      </form>
    );
  }
}

export default TodoForm;
