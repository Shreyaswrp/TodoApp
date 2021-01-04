export const addItem = message => {
    return {
        type: 'ADD_ITEM',
        message,
        id: Math.random()
    }
}

export const deleteItem = id => {
    return {type: 'DELETE_ITEM', id}
}

export const editItem = (value, id) => {
    return {type: 'EDIT_ITEM', value, id}
}

export const checkItem = id => {
    return {type: 'CHECK_ITEM', id}
}
