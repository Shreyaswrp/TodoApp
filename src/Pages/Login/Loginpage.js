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
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
         usernameErrorMessage: "Username cannot be empty",
        passwordErrorMessage: "Password cannot be empty",
      });
    } else if (!regUsername.test(this.state.username) || this.state.password.length < 6) {
      this.setState({
         usernameErrorMessage: "Please Enter a valid Username",
         passwordErrorMessage: "Use 6 characters or more for your password",
      });
    } else {
      this.loginHandler();
      this.setState({
         usernameErrorMessage: "",
        passwordErrMsg: "",
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
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className="main-container">
        <form className="userLogin-Form" onSubmit={this.SubmitHandler} autoComplete="off">
          <header className="form-heading">Login to your Account</header>
          <div className="username-Wrapper">
            <input className="username-input" placeholder=" "
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              onClick={this.errMsgHandler}/>
            <label className="username-text">Username or Email</label>
          </div>
          <span className="errorMsg">{this.state.usernameErrorMessage}</span>

          <div className="password-Wrapper">
            <input className="password-input" placeholder=" "
              type={this.state.passwordtype ? "password" : "password"}
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              onClick={this.errMsgHandler}/>
            <label className="password-text">Password</label>
          </div>
          <span className="errorMsg">{this.state.passwordErrorMessage}</span>

          <button className="submit-Button" type="submit">LogIn</button>
          <a className="create-new-account-link"> Create a account</a>
        </form>
        <div className="Image-Container ">
          <img className="account-Image" src={account}></img>
        </div>
      </div>
    );
  }
}

export default Loginpage;