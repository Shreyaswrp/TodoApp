import React from "react";
import "./Loginpage.css";
import account from "./account.svg";

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

componentDidMount(){
    axios.get()
}

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

  render() {
    return (
      <div className="main-div">
        <form onSubmit={this.SubmitHandler} className="center-div">
          <span className="form-heading"> Login to your Account </span>
          <input type="text" className="form-input" placeholder='Username'
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            onClick={this.errMsgHandler}/>

          <span className="errorMsg">{this.state.usernameErrorMessage}</span>
          <input type="password" className="form-input" placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            onClick={this.errMsgHandler}/>
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