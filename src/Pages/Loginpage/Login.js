import React, { Component } from "react";
import "./Login.css";
import accountSvg from "./account.svg";
import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameErrMsg: "",
      passwordErrMsg: "",
      passwordtype: true,
    };
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.username === "" && this.state.password === "") {
      this.setState({
        usernameErrMsg: "Username cannot be empty",
        passwordErrMsg: "Password cannot be empty",
      });
    } else if (!regEmail.test(this.state.username)) {
      this.setState({
        usernameErrMsg: "enter a proper Username",
      });
    } else {
      this.loginHandler();
      this.setState({
        usernameErrMsg: "",
        passwordErrMsg: "",
      });
    }

    this.setState({
      username: "",
      password: "",
    });
  };

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  usererrMsgHandler = () => {
    this.setState({
      usernameErrMsg: "",
    });
  };
  psswderrMsgHandler = () => {
    this.setState({
      passwordErrMsg: "",
    });
  };

  loginHandler = () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("http://api.ganies.com/login", user)
      .then((res) => {
        console.log(res.data);
        alert("your loged in");
      })
      .catch((err) => {
        console.log(err.response.statusText);
        alert("cannot login");
      });
  };

  changeType = () => {
    this.setState({
      passwordtype: !this.state.passwordtype,
    });
  };

  render() {
    return (
      <div className="main-container">
        <form
          className="userLogin-Form"
          autoComplete="off"
          onSubmit={this.formSubmitHandler}
        >
          <header className="account-Heading">Create your Account</header>
          <div className="username-Wrapper">
            <input
              placeholder=" "
              className="inputField-Username"
              name="username"
              value={this.state.username}
              onChange={this.inputHandler}
              onClick={this.usererrMsgHandler}
            ></input>
            <label className="username-text">Username or Email</label>
          </div>
          <span className="errorMsg">{this.state.usernameErrMsg}</span>

          <div className="password-Wrapper">
            <input
              type={this.state.passwordtype ? "password" : "text"}
              name="password"
              value={this.state.password}
              placeholder=" "
              className="inputField-Password"
              onChange={this.inputHandler}
              onClick={this.psswderrMsgHandler}
            ></input>
            <label className="password-text">Password</label>
            <i
              class={
                this.state.passwordtype ? "fas fa-eye-slash" : "far fa-eye"
              }
              onClick={this.changeType}
            ></i>
          </div>

          <span className="errorMsg">{this.state.passwordErrMsg}</span>
          <button className="submit-Button" type="submit">
            submit
          </button>
          <a className="newAccount-Link"> Create a account</a>
        </form>
        <div className="rightImage-Container ">
          <img className="account-Image" src={accountSvg}></img>
          <figcaption className="accountImage-caption">
            One account for all your services
          </figcaption>
        </div>
      </div>
    );
  }
}

export default Login;
