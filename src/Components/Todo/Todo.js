import React, {Component} from 'react'
import {connect} from "react-redux";
import {addTask} from '../../Redux/Actions/Action';
import '../../Styles/Todo.css'
import item from './item';
import Items from './Items';

class Todo extends Component {
    onsubmitHandler = (e) => {
        e.preventDefault();
        const input = e.target.input.value;
        this
            .props
            .dispatch(addTask(input))
        e.target.input.value = ''
    }
    
    render() {
        return (         
                <div className="todo-container">
                <form className="todo-form" autoComplete="off" onSubmit={this.onsubmitHandler}>
                    <h2 className="heading">ToDo List</h2>
                    <input className="task-input-field" placeholder="enter your task" name='input'></input>
                    <button className="addtask-button" type="submit">+</button>
                    <p className='error-Message'>{this.props.emptyMessage}</p>
                    <Items ></Items>
                </form>

           
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        taskList:state.taskList,
        emptyMessage:state.emptyMessage
    }
}

export default connect(mapStateToProps)(Todo);