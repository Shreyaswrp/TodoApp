import React from "react";
import "../../Styles/Loginpage.css";
import account from "../../Assets/account.svg";
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
        passwordErrorMessge: "",
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
      user_email: this.state.userName,
      password: this.state.password
  }
  try {
      const response = await axios.post('http://api.ganies.com/login',user);
      console.log(response.data)
      if (response.status === 200) {
          localStorage.setItem('token', response.data.auth_token)
          return this
              .props
              .history
              .push('/todo')
      } 
  } catch (err) {
      this.setState({userAuthenticationFail: 'failed to login, user not found'})
      console.log(err);
  }
  };

  render() {
    return (
      <div className="main-container">
        <form className="userlogin-form" onSubmit={this.SubmitHandler} autoComplete="off">
          <header className="form-heading">Login to your Account</header>
          <div className="username-wrapper">
           <input className="username-input" placeholder=" "
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              onClick={this.errMsgHandler} />
            <label className="username-text">Username</label>
          </div>
          <span className="errormessage">{this.state.usernameErrorMessage}</span>
          <div className="password-wrapper">
            <input className="password-input" placeholder=" "
              type={this.state.passwordtype ? "password" : "password"}
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              onClick={this.errMsgHandler} />
            <label className="password-text">Password</label>
          </div>
          <span className="errormessage">{this.state.passwordErrorMessage}</span>
          <button className="submit-button" type="submit">LogIn</button>
          <a className="account-link"> Create a account</a>
        </form>
        <div className="image-container">
          <img className="account-image" src={account}></img>
        </div>
      </div>
    );
  }
}

export default Loginpage;