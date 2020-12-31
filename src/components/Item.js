import React, {useState} from 'react'
import {deleteItem, checkItem, editItem, setEdit} from '../redux/action/index'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Item(props) {

    const [value,
        setValue] = useState(props.currentElement.message)

    const handleTodoDelete = id => {
        props.dispatch(deleteItem(id))
    }

    const handleCheckBox = id => {
        props.dispatch(checkItem(id))
    }

    const handleTodoEdit = () => {
        props.dispatch(editItem(props.currentElement.id, value))
    }

    const handleTodoUpdate = () => {
        props.dispatch(setEdit(props.currentElement.id))
    }

    return (
        <div className='item-container'>
            <input
                type="checkbox"
                checked={props.currentElement.isChecked}
                className="todo-list-checkbox"
                onChange={() => handleCheckBox(props.currentElement.id)}/>
            <input
                style={props.currentElement.isChecked
                ? {
                    textDecoration: 'line-through'
                }
                : null}
                type='text'
                className="todo-input-list"
                value={value}
                onChange={(event) => setValue(event.target.value)}/>
            <i
                className="far fa-trash-alt delete-btn"
                onClick={() => confirmAlert({
                title: 'Confirm to delete',
                message: `Are you sure to do this ${value}`,
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
                className="fas fa-pen edit-btn"
                onClick={props.currentElement.isUpdating
                ? handleTodoEdit
                :handleTodoUpdate}></i>
        </div>
    )
}

export default connect()(Item)
