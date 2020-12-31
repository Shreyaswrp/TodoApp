export const updateTask = (title, index) => {

    return {
        type: 'Update_Task',
        title,
        index
    }

}