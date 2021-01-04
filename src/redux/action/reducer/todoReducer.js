const initialState = {
    todo: [],
    errorMessage: ''
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_ITEM':
            if (action.message === '' || action.message.trim().length === 0) {
                return {
                    ...state,
                    errorMessage: 'please add todo '
                }
            } else {
                return {
                    ...state,
                    todo: [
                        {
                            message: action.message,
                            id: action.id,
                            isChecked: false,
                            isUpdating: false
                        },
                        ...state.todo
                    ],
                    errorMessage: ''
                }
            }

        case 'DELETE_ITEM':
            const newTodo = state
                .todo.filter(item => item.id !== action.id)
                return {
                    ...state,
                    todo: newTodo
                }

        case 'CHECK_ITEM':
            return {
                todo: state
                    .todo
                    .map(item => {
                        if (item.id === action.id) {
                            return {
                                ...item,
                                isChecked: !item.isChecked
                            };
                        }
                        return item
                    })
            }

        case 'EDIT_ITEM':
            return {
                todo: state
                    .todo
                    .map(item => {
                        if (item.id === action.id) {
                            return {
                                ...item,
                                message: action.value,
                                isUpdating: !item.isUpdating
                            }
                        }
                        return item
                    })
            }
        default:
            return state

    }
}

export default todoReducer