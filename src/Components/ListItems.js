import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ListItems(props) {
    const items = props.items;
    const listItems = items.map(item => {
        return <div key={item.key}>
            <p>
                <input type='checkbox' />
                <input className='list-input' type="text" id={item.key} value={item.text} onChange={(e) => {
                    props.setUpdate(e.target.value, item.key)
                }} />
                <span>
                    <FontAwesomeIcon className="edit-icons" onClick={() => {
                        props.edit()
                    }} icon="edit" />
                    <FontAwesomeIcon className="delete-icons" onClick={() => {
                        props.deleteItems(item.key)
                    }} icon="trash" />
                </span>
            </p>
        </div>
    })
    return <div>
     {props.items.length===0 ? <p className="empty-message">No items has been added</p>:listItems}
    </div>;
}

export default ListItems;
