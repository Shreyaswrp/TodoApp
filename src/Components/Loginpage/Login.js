import React, { Component } from "react";
import "../../Styles/Login.css";
import accountSvg from "../../Assets/account.svg";
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

  changePasswordType = () => {
    this.setState({
      passwordtype: !this.state.passwordtype,
    });
  };

  loginHandler = async () => {
    const user = {
      user_email: this.state.username,
      password: this.state.password,
    };

    const resp = axios
      .post("http://api.ganies.com/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          return this.props.history.push("/Todo");
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log("comming");
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className="main-login-container">
        <form
          className="userLogin-Form"
          autoComplete="off"
          onSubmit={this.formSubmitHandler}
        >
          <header className="account-Heading">Login to your Account</header>
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
          <span className="error-Message">{this.state.usernameErrMsg}</span>

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
              onClick={this.changePasswordType}
            ></i>
          </div>

          <span className="error-Message">{this.state.passwordErrMsg}</span>
          <button className="submit-Button" type="submit">
            LogIn
          </button>
          <a className="newAccount-Link"> Create a account</a>
        </form>
        <div className="rightImage-Container ">
          <img className="account-Image" src={accountSvg}></img>
        </div>
      </div>
    );
  }
}

export default Login;
