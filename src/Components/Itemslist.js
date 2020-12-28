import React from "react";
import "./Todo.css";

export default function Itemslist(props) {
  const list = props.list;
  const listElements = list.map((item) => {
    return (
      <div key={item.key} className="displayItems">
        <input type="checkbox"></input>
        <input
          className="listItems"
          id={item.key}
          value={item.text}
          onChange={(e) => props.editItem(e.target.value, item.key)}
        ></input>

        <i
          style={{
            color: "blue",
            fontSize: "20px",
            marginTop: "5px",
          }}
          class="far fa-trash-alt"
          onClick={() => props.deleteItem(item.key)}
        ></i>

        <i
          className="fas fa-pen"
          style={{
            color: "blue",
            fontSize: "20px",
            marginLeft: "20px",
            marginTop: "5px",
          }}
          type="button"
          onClick={() => props.changeValue()}
        ></i>
      </div>
    );
  });
  return (
    <div>
      {props.list.length === 0 ? (
        <div className="displayItems">Task List is Empty</div>
      ) : (
        <div>{listElements}</div>
      )}
    </div>
  );
}
