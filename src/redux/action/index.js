class Actions
{
    addItem = message => {
        return {
            type: 'ADD_ITEM',
            message,
            id: Date.now()
        }
    }
    
    deleteItem = id => {
        return {type: 'DELETE_ITEM', id}
    }
    
    editItem = (value, id) => {
        return {type: 'EDIT_ITEM', value, id}
    }
    
    checkItem = id => {
        return {type: 'CHECK_ITEM', id}
    }
}

export default Actions
