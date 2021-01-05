import React, {useState} from 'react'
import Actions from '../redux/action/index'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const actions = new Actions()

function Item(props) {

    const [value,
        setValue] = useState()

    const handleTodoDelete = id => {
        props.dispatch(actions.deleteItem(id))
    }

    const handleCheckBox = id => {
        props.dispatch(actions.checkItem(id))
    }

    const handleTodoEdit = id => {
        props.dispatch(actions.editItem(value, id))
    }

    return (
        <div className='todo-item-container'>
            <input
                type="checkbox"
                checked={props.currentElement.isChecked}
                className="todo-list-checkbox"
                onChange={() => handleCheckBox(props.currentElement.id)}/>
            <input
                style={props.currentElement.isChecked
                ? {
                    textDecoration: 'line-through',
                    color: 'gray'
                }
                : null}
                type='text'
                className="todo-input-list"
                value={props.currentElement.isUpdating
                ? null
                : props.currentElement.message}
                onChange={(event) => setValue(event.target.value)}/>
            <i
                className="far fa-trash-alt delete-btn"
                onClick={() => confirmAlert({
                title: 'Confirm to delete',
                message: `Are you sure?`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            handleTodoDelete(props.currentElement.id)
                        }
                    }, {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            })}></i>
            <i
                className={props.currentElement.isUpdating
                ? "fas fa-save edit-btn"
                : "fas fa-pen edit-save-btn"}
                onClick={() => handleTodoEdit(props.currentElement.id)}></i>
        </div>
    )
}

export default connect()(Item)
