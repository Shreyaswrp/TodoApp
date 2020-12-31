import React from 'react'
import Item from './Item'
import {connect} from 'react-redux'

const Items = props => {
    return (
        <div>
            {props
                .todos
                .map((todo, index) => (
                    <Item key={index} currentElement={todo}></Item>
                ))}

        </div>
    )
}
const mapStateToProps = (state) => {
    return {todos: state.todo}
}
export default connect(mapStateToProps)(Items)
