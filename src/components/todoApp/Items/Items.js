import React from 'react';
import Item from '../Item/Item';

const items = props => {
    return (
        <div className='itemsListContainer'>
            {props.storedItems.map((item, index) => <Item key={item.id} title={item.title}
                deleteItem={() => props.deleteItemHandler(index)}
                updateItem={() => props.updateItemHandler(index)}
                saveUpdate={props.saveUpdateHandler}
                isUpdating={item.isUpdating}
                currentItem={props.currentItem}
                isChecked={item.isChecked}
                errUpdateMsg={item.errUpdateItemMsg}
                itemCheckedHandler={() => props.itemCheckedHandler(index)}
                setCurrentItemHandler={props.setCurrentItemHandler} />)}
        </div>
    )
}

export default items;