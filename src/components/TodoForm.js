import React from "react";

class TodoForm extends React.Component {
  todo = React.createRef();
  state = {
    error: "",
    emptyMessage:"No items added"
  };

  addItemOnList = (e) => {
    e.preventDefault();
    const todoItem = {
      todo: this.todo.current.value,
    };
    if (this.todo.current.value.trim().length === 0) {
      this.setState({ error: "please add a items" });
    } else {
      this.setState({emptyMessage: ""})
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
        <span style={{color:"red"}}>{this.state.error}</span><br/>
        <span >{this.state.emptyMessage}</span>
      </form>
    );
  }
}

export default TodoForm;
