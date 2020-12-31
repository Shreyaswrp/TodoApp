import React from 'react'
import Item from './item'
import {connect} from 'react-redux'
import '../../Styles/Todo.css'

const Items = props => {
    return (
        <div className='list-tasks'>
            {props
                .todos
                .map((todo, index) => (
                    <Item key={index} currentElement={todo}></Item>
                ))}

        </div>
    )
}

const mapStateToProps = (state) => ({todos: state.taskList})
export default connect(mapStateToProps)(Items)