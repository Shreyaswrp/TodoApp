export const addTask = (title) => {
    return {
        type: 'Add_Task',
        title,
        id: new Date().getTime()
    }
}