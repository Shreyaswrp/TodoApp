import React, {Component} from 'react'
import TodoItem from './TodoItem'
import '../../style/StyleTodo.css'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class TodoForm extends Component {
    constructor()
    {
        super()
        this.state = {
            todoList: [],
            emptyValueErrorMessage: '',
            isEditing: false,
            currentItem: {
                text: '',
                key: ''
            }
        }
    }

    handleTodoSubmit = (event) => {
        event.preventDefault();
        const items = this.state.currentItem;
        if (items.text === '' || items.text.trim() === '') {
            this.setState({emptyValueErrorMessage: "Enter a value"})
        } else {
            const newArrayList = [
                items, ...this.state.todoList
            ]
            this.setState({
                todoList: newArrayList,
                emptyValueErrorMessage: '',
                currentItem: {
                    text: '',
                    key: ''
                }
            })
        }
    }

    handleTodoInputChange = (event) => {
        this.setState({
            currentItem: {
                text: event.target.value,
                key: Date.now()
            },
            emptyValueErrorMessage: ''
        })
    }

    handleItemDelete = (value, key) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure to do this ${value}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const newData = this
                            .state
                            .todoList
                            .filter(item => item.key !== key)
                        this.setState({todoList: newData})
                    }
                }, {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    handleItemEdit = (text, key) => {
        if (this.state.isEditing === true) {
            const items = this.state.todoList;
            items.map(item => {
                if (item.key === key) {
                    return item.text = text;
                }
            })
            this.setState({todoList: items})
        }
        this.setState({
            currentItem: {
                text: '',
                key: ''
            }
        })
    };

    changeEditItemState = () => {
        this.setState(preState => {
            return {
                isEditing: !preState.isEditing
            }
        })
    }

    handleTodoLogout = () => {
        localStorage.clear()
        this
            .props
            .history
            .push('/')
    }

    render() {
        return (
            <div className='todo-container'>
                <form className='todo-form' onSubmit={this.handleTodoSubmit} autoComplete='off'>
                    <button onClick={this.handleTodoLogout} className='todo-logout-button'>Logout</button>
                    <div className='todo-form-heading'>
                        <h2>Todo List</h2>
                    </div>
                    <div className='item-list'>
                        <input
                            className="todo-input"
                            type='text'
                            value={this.state.currentItem.text}
                            onChange={this.handleTodoInputChange}
                            placeholder="Add Todo"/>
                        <button className='todo-add-button'>+</button>
                        <span className='emptyValue-error-message'>{this.state.emptyValueErrorMessage}</span>
                    </div>
                    <TodoItem
                        todoList={this.state.todoList}
                        handleItemDelete={this.handleItemDelete}
                        handleItemEdit={this.handleItemEdit}
                        changeEditItemState={this.changeEditItemState}/>
                </form>
            </div>
        )
    }
}
export default TodoForm