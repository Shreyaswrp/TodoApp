import React from "react";
import "./Loginpage.css";
import account from "./account.svg";
import axios from 'axios'

class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameErrorMessage: '',
      passwordErrorMessage: '',
    };
  }

  SubmitHandler = (e) => {
    e.preventDefault();
    const regUsername = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.username == "" || this.state.password == "") {
      this.setState({
        usernameErrorMessage: "Username cannot be empty",
        passwordErrorMessage: "Password cannot be empty",
      });
    } else if (!regUsername.test(this.state.username) || this.state.password.length < 6
    ) {
      this.setState({
        usernameErrorMessage: "Please Enter a valid Username",
        passwordErrorMessage: "Use 6 characters or more for your password",
      });
    } else {
        this.loginHandler()
      this.setState({
        usernameErrorMessage: "",
        passwordErrorMessage: "",
      });
    }
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  errMsgHandler = () => {
    this.setState({
      usernameErrorMessage: "",
      passwordErrorMessage: "",
    });
  };

  loginHandler = async () => {
    const user = {
      user_email: this.state.username,
      password: this.state.password,
    };
    try {
      const resp = await axios.post("http://api.ganies.com/login", user);
      console.log(resp);
      if (resp.status && resp.status === 200) {
          return this.props.history.push("/ToDo")
        localStorage.setItem("auth", resp.data.auth_token);
      } else {
        console.log(resp.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  render() {
    return (
      <div className="main-div">
        <form onSubmit={this.SubmitHandler} className="center-div">
          <span className="form-heading"> Login to your Account </span>
          <div className="username-div">
          <input type="text" className="form-input" placeholder=' ' autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            onClick={this.errMsgHandler}/>
            <label className="username-text">Username</label> 
          </div>
          <span className="errorMsg">{this.state.usernameErrorMessage}</span>

          <div className="password-div">
          <input className="form-input" placeholder=' ' autoComplete="off"
            type={this.state.passwordtype ? "text" : "password"}
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            onClick={this.errMsgHandler}/>
            <label className="password-text">Password</label> 
            </div>
          <span className="errorMsg">{this.state.passwordErrorMessage}</span>

          <button className="submitbutton">LogIn</button>
          <span className="create-new-account-link"> Create a account</span>
        </form>
        <div className="Google-logo">
          <img className="account-image" src={account}></img>
        </div>
      </div>
    );
  }
}

export default Loginpage;