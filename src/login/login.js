import React from "react";
import Img from "../img.png";
import {} from "../style/login.css";
import { Redirect, Route } from "react-router-dom";
import Todo from "../ToDo";

import axios from "axios";
class Login extends React.Component {
  state = {
    user_email: "",
    user_password: "",
    EmailError: "",
    PasswordError: "",
    PassWordVisibility: true,
    InvalidResponse: "",
  };
  Validate = (e) => {
    e.preventDefault();
    let validate_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!validate_email.test(this.state.user_email)) {
      if (this.state.user_email.length === 0) {
        this.setState({ EmailError: "UserName is required" });
      } else {
        this.setState({ EmailError: "Email is invalid" });
      }
    } else {
      this.setState({
        EmailError: "",
      });
    }
    if (this.state.user_password.length < 5) {
      if (this.state.user_password.length === 0) {
        this.setState({ PasswordError: "Password is required" });
      } else {
        this.setState({ PasswordError: "password is invalid" });
      }
    } else {
      this.setState({ PasswordError: "" });
    }
    this.loginHandler();
  };

  loginHandler = async () => {
    const user = {
      user_email: this.state.user_email,
      password: this.state.user_password,
    };
    const resp = await axios.post("http://api.ganies.com/login", user);
    try {
     
      if (resp.status === 200) {
        localStorage.setItem("auth", resp.data.auth_token);
        this.props.history.push("/Todo");
      } else {
        
        console.log(resp.status);
        this.setState({ InvalidResponse: "User not Found" });
      }
    } catch (err) {
    //setMsgUserNotFound('User Not Found');

     this.setState({ InvalidResponse: "User not Found" });
     }
   };

  render() {
    return (
      <div className="body1">
        <div className="LoginCard">
          <h1 class="formTitle">Login to your Account</h1>
          <span>{this.state.InvalidResponse}</span>
          <form className="form">
            <div className="LoginForm">
              <input
                type="text"
                className="formInput"
                placeholder=" "
                onChange={(e) => this.setState({ user_email: e.target.value })}
                value={this.user_email}
                // onInput={this.Validate}
              />
              <label for="" className="formLabel">
                Email
              </label>
            </div>
            <div className="ErrorMsg">
              <span>{this.state.EmailError}</span>
            </div>
            <div className="LoginForm">
              <input
                type="text"
                className="formInput "
                placeholder=" "
                value={this.user_password}
                onChange={(e) =>
                  this.setState({ user_password: e.target.value })
                }
                // onInput={this.Validate}
              />
              <label for="" className="formLabel">
                Password
              </label>
            </div>
            <div className="ErrorMsg">
              <span>{this.state.PasswordError}</span>
            </div>
            <a className="SignUpBtn" href="#">
              Sign-up instead?
            </a>

            <input
              type="submit"
              class="formButton"
              value="Sign In"
              onClick={this.Validate}
            ></input>
          </form>
        </div>

        <div className="imgCard">
          <img src={Img} width="150" className="img" />
        </div>
      </div>
    );
  }
}
export default Login;
