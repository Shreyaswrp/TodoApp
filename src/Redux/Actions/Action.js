export const addTask = (message) => {
    return {
        type: 'ADD_TODO',
        message,
        id: Date.now()
    }
}

export const deleteTask = (id) => {
    return {type: 'DELETE_TODO', id}
}

export const editTask = (id, task) => {
    return {type: 'EDIT_TODO', id, task}
}

export const checkTask = (id) => {
    return {type: 'CHECK_TODO', id}
}
