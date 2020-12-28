import React from 'react'
import axios from 'axios'
import './login.css'
import LoginPage from "./LoginPage";

class Login extends React.Component {
    constructor()
    {
        super()
        this.state = {
            userName: '',
            password: '',
            userNameErrorMessage: '',
            passwordErrorMessage: '',
            passwordVisibility: true
        }
    }

    handleLoginFormSubmit = (event) => {
        event.preventDefault()
        const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.userName === '' && this.state.password === '') {
            this.setState({userNameErrorMessage: 'User name cannot be empty!', passwordErrorMessage: 'Password cannot be empty!'})
        } else if (!emailValidation.test(this.state.userName)) {
            this.setState({userNameErrorMessage: 'Enter a valid email id!'})
        } 
        else if (this.state.password.length<5) {
            this.setState({passwordErrorMessage: 'Enter a valid password!'})
        }
        else {
            this.handleLogin()
            this.setState({userNameErrorMessage: '', passwordErrorMessage: ''})

        }
    }

    handleInputChange = (event) => {
        this.setState({
                [event.target.name]: event.target.value
        })
    }

    handleUserErrorMessage = () => {
        this.setState({userNameErrorMessage: ''})
    }

    handlePasswordErrorMessage = () => {
        this.setState({passwordErrorMessage: ''})
    }

    changePasswordVisibilityType = () => {
        this.setState(preState => {
            return {
                passwordVisibility: !preState.passwordVisibility
            }
        })
    }

    handleLogin = async () => {
       const user={
            user_email:this.state.userName,
            password:this.state.password
        }
        try {
            const resp = await axios.post('http://api.ganies.com/login', user);
            // console.log(resp);
            if (resp.status && resp.status === 200) {
              localStorage.setItem('auth', resp.data.auth_token);

            } else {
              console.log(resp.statusText);
            }
          } catch (err) {
            console.log(err);
          }
    }

    render() {
        return (<LoginPage
            stateData={this.state}
            handleLoginFormSubmit={this.handleLoginFormSubmit}
            handleInputChange={this.handleInputChange}
            handleUserErrorMessage={this.handleUserErrorMessage}
            handlePasswordErrorMessage={this.handlePasswordErrorMessage}
            changePasswordVisibilityType={this.changePasswordVisibilityType}/>)
    }

}

export default Login