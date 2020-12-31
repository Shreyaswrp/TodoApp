import React from "react";
import { connect } from "react-redux";
import { deleteTask } from "../../../Redux/Actions/actions";
import { isUpdating } from "../../../Redux/Actions/actions";
import { updateTask } from "../../../Redux/Actions/actions";
import { setErrUpdateMsg } from "../../../Redux/Actions/actions";
import { checkTask } from '../../../Redux/Actions/actions';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./Item.css";

const item = (props) => {

  let title = props.title;
  if(props.isChecked) {
    title = <del>{title}</del>
  }

  const checkTaskHandler = (index) => {
    console.log(index);
    props.dispatch(checkTask(index));
  };

  const clearErrMsg = (index) => {
    props.dispatch(setErrUpdateMsg("", index));
  };

  const setIsUpdatingHandler = (index) => {
    console.log(index);
    props.dispatch(isUpdating(index));
  };

  const submitInputHandler = (e) => {
    e.preventDefault();
    const title = e.target.item.value;
    const index = e.target.index.value;
    if (title === undefined || title.toString().trim() === "") {
      return props.dispatch(setErrUpdateMsg("Task must not be empty", index));
    }
    console.log(title, index);
    props.dispatch(updateTask(title, index));
    e.target.item.value = "";
  };

  const deleteConfirmationHandler = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => props.dispatch(deleteTask(id)),
        },
        {
          label: "No",
          onClick: () => console.log("No clicked"),
        },
      ],
    });
  };

  return (
    <form className="itemContainer" onSubmit={submitInputHandler}>
      <input type="checkbox" onClick={()=>checkTaskHandler(props.index)} />
      {props.isUpdating ? (
        <input
          className="updateInputField"
          name="item"
          onChange={() => clearErrMsg(props.index)}
          defaultValue={props.title}
        />
      ) : (
        <h3 className="title"> {title} </h3>
      )}

      <div className="actionButtons">
        {props.isUpdating ? (
          <button className="wrapper" type="submit">
            <FontAwesomeIcon className="btn edit" icon={faCheck} />{" "}
          </button>
        ) : (
          <FontAwesomeIcon
            className="btn edit"
            icon={faEdit}
            onClick={() => setIsUpdatingHandler(props.index)}
          />
        )}
        <FontAwesomeIcon
          className="btn delete"
          onClick={() => deleteConfirmationHandler(props.index)}
          icon={faTrashAlt}
        />
        <span id="errUpdateMsg">{props.errUpdateMsg}</span>
      </div>
      <input type="hidden" name="index" value={props.index} />
    </form>
  );
};

export default connect(null, null)(item);
