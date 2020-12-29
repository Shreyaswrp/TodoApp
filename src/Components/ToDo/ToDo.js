import React from 'react';
import '../../Styles/ToDo.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)
library.add(faEdit)

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      errorMessages: "",
      isEdited: false,
      currentItem: {
        text: '',
        key: ''
      }
    }
  }

  addItems(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text.trim().length === 0 || newItem.text == "") {
      this.setState({
        errorMessages: "Task cannot be empty",
      })
    }
    else {
      const items = [newItem, ...this.state.items];
      this.setState({
        items: items,
        errorMessages: '',
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  deleteItems(key) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [{
        label: "Yes",
        onClick: () => {
          const deleteItems = this.state.items.filter(item => item.key !== key);
          this.setState({
            items: deleteItems
          })
        },
      },
      {
        label: "No",
        onClick: () => console.log("No clicked"),
      },
      ],
    });
  }

  setUpdate(text, key) {
    if (this.state.isEdited === true) {
      const items = this.state.items;
      items.map(item => {
        if (item.key === key) {
          item.text = text;
        }
      })
      this.setState({
        items: items
      })
    }
  }

  handleEdit = () => {
    this.setState({ isEdited: !this.state.isEdited })
  }

  logoutHandler = () => {
    return this.props.history.push("/");
  };

  render() {
    return (
      <div className="main-div">
        <div className="center-div">
          <span className='todo-heading'> ToDo List</span>
          <form onSubmit={this.addItems.bind(this)}>
            <input className='todo-input' type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput.bind(this)}></input>
            <button className='todo-button' type="submit">+</button>
            <div className="error-message">{this.state.errorMessages}</div>
            <ListItems items={this.state.items} deleteItems={this.deleteItems.bind(this)} setUpdate={this.setUpdate.bind(this)} edit={this.handleEdit} />
          </form>
          <button class="logout-button" onClick={this.logoutHandler}>Logout</button>
        </div>
      </div>
    );
  }
}

export default ToDo;
