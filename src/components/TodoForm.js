import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItem} from '../redux/action'
import Items from './Items';
import '../style/Todo.css'

class TodoForm extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const input = e.target.input.value;
        this.props.dispatch(addItem(input))
        e.target.input.value = ''
    }

    render() {
        return (
            <div className='todo-container'>
                <form className='center-div' onSubmit={this.handleSubmit} autoComplete='off'>
                    <div className='todo-heading'>
                        <h2>Todo List</h2>
                    </div>
                    <div className='list-item'>
                        <input className="todo-input" type='text' name='input' placeholder=" Add Todo "/>
                        <button className='add-button'>+</button>
                        <span className='empty-errormessage'>{this.props.errorMessage}</span>
                    </div>
                    <Items/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {errorMessage:state.errorMessage}
}

export default connect(mapStateToProps)(TodoForm)