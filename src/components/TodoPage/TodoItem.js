import React, {useState} from "react";

export default function TodoItem(props) {
  const [value , setValue]=useState()
        return (
            <div className="todo-list-container">
                <input type="checkbox" className="todo-list-checkbox"/>
                <input
                    className="todo-input-list"
                    type="text"
                    value={props.item.isEditing
                    ? null
                    : props.item.text}
                    onChange={(event) => setValue(event.target.value)}
                    autoComplete="off"/>
                <i
                    className="far fa-trash-alt delete-btn"
                    onClick={() => {
                    props
                        .handleItemDelete(props.item.text, props.item.key);
                }}></i>
                <i
                    className={props.item.isEditing
                    ? "fas fa-save edit-btn"
                    : "fas fa-pen edit-btn"}
                    type="button"
                    onClick={() => props.handleItemEdit(value, props.item.key)}></i>
            </div>
        )
}
