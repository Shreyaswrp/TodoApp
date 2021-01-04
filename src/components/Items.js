import React from 'react'
import Item from './Item'
import {connect} from 'react-redux'

const Items = props => {
    return (
        <div className='items-list'>
            {props.todos.length === 0
                ? <div>
                        <h4 className="empty-todo-list-message">Todo list is empty</h4>
                  </div>
                : props.todos.map((todo, index) => (
                        <Item key={index} currentElement={todo}></Item>
                    ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {todos: state.todo}
}

export default connect(mapStateToProps)(Items)
