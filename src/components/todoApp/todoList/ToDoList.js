import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './ToDoList.css';
import Items from '../Items/Items';

class TodoList extends Component {

    state = {
        items: [{
            id: new Date(),
            title: 'Cooking',
            isUpdating: false,
            isChecked: false,
            errUpdateItemMsg: undefined
        }],
        currentItem: undefined,
        updatedItemIndex: undefined,
        errAddItemMsg: undefined
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        if (localStorage.getItem('auth') === null) {
            props.history.push('/');
        }
    }

    setCurrentItemHandler = (e) => {
        this.setState({
            currentItem: e.target.value,
            errAddItemMsg: ''
        })
    }

    logoutHandler = () => {
        this.props.history.push('/');
        localStorage.clear();
    }

    addItemHandler = (e) => {
        e.preventDefault();
        const inputField = document.querySelector('.inputField');
        this.setState({ errAddItemMsg: '' });
        const currentItem = this.state.currentItem;
        if (currentItem === undefined || currentItem.toString().trim() === '') {
            return this.setState({ errAddItemMsg: 'Empty Field Not Allowed' })
        }
        const updatedItems = [{ id: new Date(), title: currentItem }, ...this.state.items];
        this.setState({ items: updatedItems });
        this.setState({ currentItem: '' });
        this.setState({ errAddItemMsg: '' });
        inputField.value = '';
    }

    deleteConfirmation = (index) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteItemHandler(index)
                },
                {
                    label: 'No',
                    onClick: () => console.log('No clicked')
                }
            ]
        });
    }

    deleteItemHandler = (index) => {
        console.log(index);
        const updatedItems = [...this.state.items];
        updatedItems.splice(index, 1);
        this.setState({ items: updatedItems });
    };

    updateItemHandler = (index) => {
        console.log(index);
        const updatingItems = [...this.state.items]
        updatingItems[index].errUpdateItemMsg = '';
        updatingItems[index].isUpdating = true
        this.setState({ currentItem: updatingItems[index].title });
        this.setState({ updatedItemIndex: index });
    };

    saveUpdateHandler = () => {
        const updatedItems = [...this.state.items];
        const index = this.state.updatedItemIndex;
        if (this.state.currentItem.toString().trim() === '') {
            updatedItems[index].errUpdateItemMsg = 'Empty fields not allowed'
            return this.setState({ items: updatedItems })
        }
        updatedItems[index].title = this.state.currentItem;
        updatedItems[index].isUpdating = false;
        updatedItems[index].errUpdateItemMsg = '';
        this.setState({ items: updatedItems });
        this.setState({ currentItem: '' });
    }

    itemCheckedHandler = (index) => {
        const updatedItems = [...this.state.items];
        updatedItems[index].isChecked = !this.state.items[index].isChecked;
        this.setState({ items: updatedItems });
    }

    render() {
        return (
            <div className='appContainer'>
                <button className='logoutBtn' onClick={this.logoutHandler}>Logout</button>
                <h1 className='appTitle'>ToDo Application</h1>
                <input onChange={(e) => { this.setCurrentItemHandler(e) }}
                    className='inputField' type='text' placeholder='Add your task' />
                <button onClick={this.addItemHandler} className='btn add'>+</button>
                <span id='errAddMsg'>{this.state.errAddItemMsg}</span>
                {this.state.items.length === 0 ? <span id='noTaskAdded'>No Task Added</span> :
                    <Items storedItems={this.state.items} deleteItemHandler={this.deleteConfirmation}
                        updateItemHandler={this.updateItemHandler}
                        saveUpdateHandler={this.saveUpdateHandler}
                        itemCheckedHandler={this.itemCheckedHandler}
                        setCurrentItemHandler={(e) => { this.setCurrentItemHandler(e) }}
                        currentItem={this.state.currentItem} />
                }
            </div>
        )
    }
};

export default TodoList;