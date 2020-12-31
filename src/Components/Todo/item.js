import React, {useState} from 'react'
import '../../Styles/Todo.css'
import {deleteTask, edittTask, checkTask} from '../../Redux/Actions/Action';
import {connect} from 'react-redux'
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import '../../Styles/Todo.css'

function Item(props) {
    const [task,
setTask] = useState('')

    const deleteHandler = (id) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        props.dispatch(deleteTask(id))
                    }
                }, {
                    label: "No",
                    onClick: () => console.log("No clicked")
                }
            ]
        });
    }

    const handleInput = (id, value) => {
        setTask({task: value})
        props.dispatch(edittTask(id, task))

    }

    const checkboxHandler = (id) => {
        props.dispatch(checkTask(id))

    }

    const updatehandler = (id) => {
        props.dispatch(edittTask(id, task))

    }

    const checkedInputStyle = {
        textDecoration: 'line-through'
    }

    return (
        <div>
            {props.taskList.length === 0
                ? <div>No Task</div>
                : <div className='display-task-container '>
                    <input
                        type='checkbox'
                        checked={props.currentElement.isCheckItem}
                        onChange={() => checkboxHandler(props.currentElement.id)}></input>
                    <input
                        className='list-tasks'
                        style={props.currentElement.isCheckItem
                        ? checkedInputStyle
                        : null}
                        value={props.currentElement.message}
                       
                        onChange={(e) => setTask(e.target.value)}></input>
                    <i
                        class="far fa-trash-alt delete-icon"
                        onClick={() => deleteHandler(props.currentElement.id)}></i>
                    <i
                        className="fas fa-pen edit-icon"
                        onClick={() => updatehandler(props.currentElement.id)}></i>
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {taskList: state.taskList}
}

export default connect(mapStateToProps)(Item)