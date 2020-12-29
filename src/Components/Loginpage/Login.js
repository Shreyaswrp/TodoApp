import React, {Component} from "react";
import "../../Styles/Login.css";
import accountSvg from "../../Assets/account.svg";
import axios from "axios";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameErrorMsg: "",
            passwordErrorMsg: "",
            passwordtype: true
        };
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.username === "" && this.state.password === "") {
            this.setState({usernameErrorMsg: "Username cannot be empty", passwordErrorMsg: "Password cannot be empty"});
        } else if (!regEmail.test(this.state.username)) {
            this.setState({usernameErrorMsg: "enter a proper Username"});
        } else {
            this.loginHandler();
            this.setState({usernameErrorMsg: "", passwordErrorMsg: ""});
        }
        this.setState({username: "", password: ""});
    };

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    usererrMsgHandler = () => {
        this.setState({usernameErrorMsg: ""});
    };

    psswderrMsgHandler = () => {
        this.setState({passwordErrorMsg: ""});
    };

    changePasswordType = () => {
        this.setState({
            passwordtype: !this.state.passwordtype
        });
    };

    loginHandler = async() => {
        const user = {
            user_email: this.state.username,
            password: this.state.password
        };
        axios
            .post("http://api.ganies.com/login", user)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    return this
                        .props
                        .history
                        .push("/Todo");
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
                    className="user-login-Form"
                    autoComplete="off"
                    onSubmit={this.formSubmitHandler}>
                    <header className="account-heading">Login to your Account</header>
                    <div className="username-wrapper">
                        <input
                            placeholder=" "
                            className="input-field-username"
                            name="username"
                            value={this.state.username}
                            onChange={this.inputHandler}
                            onClick={this.usererrMsgHandler}></input>
                        <label className="username-text">Username or Email</label>
                    </div>
                    <span className="error-message">{this.state.usernameErrorMsg}</span>
                    <div className="password-wrapper">
                        <input
                            type={this.state.passwordtype
                            ? "password"
                            : "text"}
                            name="password"
                            value={this.state.password}
                            placeholder=" "
                            className="input-field-password"
                            onChange={this.inputHandler}
                            onClick={this.psswderrMsgHandler}></input>
                        <label className="password-text">Password</label>
                        <i
                            class={this.state.passwordtype
                            ? "fas fa-eye-slash password-hide-icon"
                            : "far fa-eye password-show-icon"}
                            onClick={this.changePasswordType}></i>
                    </div>
                    <span className="error-message">{this.state.passwordErrorMsg}</span>
                    <button className="login-button" type="submit">
                        LogIn</button>
                </form>
                <span className="new-account-Link">create a account</span>
                <div className="right-image-container ">
                    <img className="account-image" src={accountSvg}></img>
                </div>
            </div>
        );
    }
}
export default Login;
