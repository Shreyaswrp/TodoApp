import React, {Component} from 'react'
import TodoItem from './TodoItem'
import '../../style/Todo.css'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class TodoForm extends Component {
    constructor()
    {
        super()
        this.state = {
            todoList: [],
            emptyValueErrorMessage: '',
            currentItem: {
                text: '',
                key: '',
            }
        }
    }

    handleTodoSubmit = (event) => {
        event.preventDefault();
        if (this.state.currentItem.text === '' || this.state.currentItem.text.trim() === '') {
            this.setState({emptyValueErrorMessage: "Enter a value"})
        } else {
            const newArrayList = [{
                ...this.state.currentItem,
                key: Date.now(),
                isEditing: false
            } ,...this.state.todoList]

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

    handleItemEdit = (value, key) => {
            const newItems=this.state.todoList.map(item => {
                if(item.key===key)
            {
                return{
                    ...item,
                    text:value,
                    isEditing:!item.isEditing
                }
            }
            return item
        })
            this.setState({todoList: newItems})
    };

    render() {
        return (
            <div className='todo-container'>
                <form className='todo-form' onSubmit={this.handleTodoSubmit} autoComplete='off'>
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
                   {this.state.todoList.length===0?<div><h4 className='emptyTodo-list-message'>Todo List is empty!</h4></div>:this.state.todoList.map(item=>
                    <TodoItem
                        todoList={this.state.todoList}
                        key={item.key}
                        item={item}
                        handleItemDelete={this.handleItemDelete}
                        handleItemEdit={this.handleItemEdit}/>
                        )}
                </form>
            </div>
        )
    }
}
export default TodoForm