import React from "react";
import "../../Styles/Todo.css";

export default function Itemslist(props) {
  const list = props.list;
  const listElements = list.map((item) => {
    return (
      <div key={item.key} className="display-task-container">
        <input type="checkbox"></input>
        <input
          className="list-tasks"
          id={item.key}
          value={item.text}
          onChange={(e) => props.editItem(e.target.value, item.key)}
        ></input>

        <i
          class="far fa-trash-alt  delete-icon"
          onClick={() => props.deleteItem(item.key)}
        ></i>

        <i
          className="fas fa-pen  edit-icon"
          type="button"
          onClick={() => props.changeValue()}
        ></i>
      </div>
    );
  });
  return (
    <div>
      {props.list.length === 0 ? (
        <div className="emptytask-message ">Task List is Empty</div>
      ) : (
        <div>{listElements}</div>
      )}
    </div>
  );
}
