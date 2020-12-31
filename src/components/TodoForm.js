import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItem} from '../redux/action'
import Items from './Items';
import '../style/Todo.css'

class TodoForm extends Component {

    handleTodoSubmit = event => {
        event.preventDefault()
        const input = event.target.input.value;
        this
            .props
            .dispatch(addItem(input))
        event.target.input.value = ''
    }

    render() {
        return (
            <div className='todo-container'>
                <form className='todo-form' autoComplete='off' onSubmit={this.handleTodoSubmit}>
                    <div className='todo-form-heading'>
                        <h2>Todo List</h2>
                    </div>
                    <div className='item-list'>
                        <input className="todo-input" type='text' name='input' placeholder="Add Todo"/>
                        <button className='todo-add-button'>+</button>
                        <span className='emptyValue-error-message'>{this.props.errorMessage}</span>
                    </div>
                    <Items/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {errorMessage: state.errorMessage}
}

export default connect(mapStateToProps)(TodoForm)