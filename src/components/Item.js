import React, {useState} from 'react'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteItem, checkItem, editItem} from '../redux/action/index'

function Item(props) {
    const [value,setValue] = useState()

    const handleDelete = id => {
        props.dispatch(deleteItem(id))
    }

    const handleCheckBox = id => {
        props.dispatch(checkItem(id))
    }

    const handleEdit = id => {
        props.dispatch(editItem(value, id))
    }

    return (
        <div className='todo-item-container'>
            <input type="checkbox" checked={props.currentElement.isChecked}
                className="todo-checkbox"
                onChange={() => handleCheckBox(props.currentElement.id)}/>
            <input style={props.currentElement.isChecked ? {
                    textDecoration: 'line-through',} : null}
                type='text'
                className="todo-input-list"
                value={props.currentElement.isUpdating
                ? value
                : props.currentElement.message}
                onChange={(event) => setValue(event.target.value)}/>
            <i className="far fa-trash-alt delete-btn"
                onClick={() => confirmAlert({
                title: 'Confirm to delete',
                message: `Are you sure?`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            handleDelete(props.currentElement.id)
                        }
                    }, {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            })}></i>
            <i className={props.currentElement.isUpdating
                ? "fas fa-pen edit-save-btn"
                : "fas fa-pen edit-save-btn"}
                onClick={() => handleEdit(props.currentElement.id)}></i>
        </div>
    )
}

export default connect()(Item)
