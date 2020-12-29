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
      errmsg: "",
      Isedited: false,
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
        errmsg: "Task cannot be empty",
      })
    }
    else {
      const items = [newItem, ...this.state.items];
      this.setState({
        items: items,
        errmsg: '',
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
    if (this.state.Isedited === true) {
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
    this.setState({ Isedited: !this.state.Isedited })
  }

  logoutHandler = () => {
    return this.props.history.push("/");
  };

  render() {
    return (
      <div className="main_div">
        <div className="center_div">
          <br />
          <span className='ToDo-heading'> ToDo List</span>
          <br />
          <form onSubmit={this.addItems.bind(this)}>
            <input className='ToDo-input' type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput.bind(this)}></input>
            <button className='ToDo-button' type="submit">+</button>
            <div className="error-message">{this.state.errmsg}</div>
            <ListItems items={this.state.items} deleteItems={this.deleteItems.bind(this)} setUpdate={this.setUpdate.bind(this)} edit={this.handleEdit} />
          </form>
          <button class="logout-button" onClick={this.logoutHandler}>Logout</button>
        </div>
      </div>
    );
  }
}
export default ToDo;
