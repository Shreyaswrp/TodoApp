export const deleteTask = (id) => {
    console.log(id);
    return {
        type: 'Del_Task',
        id
    }
}