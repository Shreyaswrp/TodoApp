import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import './item.css';

const item = props => {
    let title = props.title;
    if (props.isChecked) {
        title = <del>{props.title}</del>
    }
    return (
        <div className='itemContainer'>
            <input id='checkbox' onClick={props.itemCheckedHandler} type='checkbox' />
            {props.isUpdating ? <input className='updateInputField' value={props.currentItem}
                onChange={props.setCurrentItemHandler} />
                : <h3 className='title' >{title}</h3>}
            <div className='actionButtons'>
                <FontAwesomeIcon className='btn edit' onClick={props.isUpdating ? props.saveUpdate : props.updateItem}
                    icon={props.isUpdating ? faCheck : faEdit} />
                <FontAwesomeIcon className='btn delete' onClick={props.deleteItem} icon={faTrashAlt} />
                <span id='errUpdateMsg'></span>
            </div>
        </div>
    )
}

export default item;