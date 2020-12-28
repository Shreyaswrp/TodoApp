import React from 'react'
import axios from 'axios'
import './login.css'
import LoginPage from "./LoginPage";

class Login extends React.Component {
    constructor()
    {
        super()
        this.state = {
            user: {
                userName: '',
                password: ''
            },
            userNameErrorMessage: '',
            passwordErrorMessage: '',
            passwordVisibility:true
        }
    }

    handleLoginFormSubmit = (event) => {
        event.preventDefault()
        const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.user.userName === '' && this.state.user.password === '') {
            this.setState({userNameErrorMessage: 'User name cannot be empty!', passwordErrorMessage: 'Password cannot be empty!'})
        } else if (!emailValidation.test(this.state.user.userName)) {
            this.setState({userNameErrorMessage: 'Enter a valid email id!'})
            this.setState({
                user: {
                    userName: '',
                    password: ''
                }
            })
        } else {
            this.setState({userNameErrorMessage: '', passwordErrorMessage: ''})
            
        }
    }

    handleInputChange = (event) => {
        this.setState({
            user: {
                [event.target.name]: event.target.value
            }
        })
    }

    handleUserErrorMessage = () => {
        this.setState({userNameErrorMessage: ''})
    }

    handlePasswordErrorMessage = () => {
        this.setState({passwordErrorMessage: ''})
    }

    changePasswordVisibilityType=()=>
    {
        this.setState(preState=>
            {
                return{
                    passwordVisibility:!preState.passwordVisibility
                }
            })
    }

    handleLogin = () => {
        axios
            .post('http://api.ganies.com/login', this.state.user)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
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