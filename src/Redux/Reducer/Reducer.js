const initialState = {
    taskList: [],
    emptyMessage: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            if (action.message === '' || action.message.trim().length === 0) {
                return {
                    ...state,
                    emptyMessage: 'you cannot add empty task'
                }

            } else {
                return {
                    ...state,
                    taskList: [
                        {
                            message: action.message,
                            id: action.id,
                            isCheckItem: false,
                            isUpdating: false
                        },
                        ...state.taskList
                    ],
                    emptyMessage: ''

                }

            }

        case 'DELETE_TODO':
            const todos = state
                .taskList
                .filter((todo) => todo.id !== action.id);
            return {
                ...state,
                taskList: todos
            }

        case 'EDIT_TODO':
            const todoos = state
                .taskList
                .map((todo) => {
                    if (todo.id == action.id) {
                        return {
                            ...todo,
                            message: action.task,
                            isUpdating: !todo.isUpdating
                        }

                    }
                    return todo

                });
            return {
                ...state,
                taskList: todoos
            }

        case 'CHECK_TODO':
            const checktask = state
                .taskList
                .map((todo) => {
                    if (todo.id == action.id) {
                        return {
                            ...todo,
                            isCheckItem: !todo.isCheckItem
                        }
                    }
                    return todo
                });

            return {taskList: checktask}

        default:
            return state;
    }

}

export default reducer;