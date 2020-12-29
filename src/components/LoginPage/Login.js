import React from 'react'
import axios from 'axios'
import '../../style/login.css'
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
<<<<<<< HEAD
            userAuthenticationFail: '',
=======
<<<<<<< HEAD:src/components/LoginPage/Login.js
            userAuthentication: '',
=======
>>>>>>> refacter-> changed folder structure:src/pages/loginPage/Login.js
>>>>>>> 5f09260372cbc0b21f9f3ab4426d9582226b9d7c
            passwordVisibility: true
        }
    }

    componentDidMount = () => {
        localStorage.clear();
    }

    handleLoginFormSubmit = (event) => {
        event.preventDefault()
        const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.userName === '' && this.state.password === '') {
            this.setState({userNameErrorMessage: 'User name cannot be empty!', passwordErrorMessage: 'Password cannot be empty!'})
        } else if (!emailValidation.test(this.state.userName)) {
            this.setState({userNameErrorMessage: 'Enter a valid email id!'})
<<<<<<< HEAD:src/components/LoginPage/Login.js
        } else if (this.state.password.length < 5) {
            this.setState({passwordErrorMessage: 'Enter a valid password!'})
        } else {
            this.handleUserLogin()
            this.setState({userNameErrorMessage: '', passwordErrorMessage: ''})
=======
        } else {
            this.handleLogin()
            this.setState({userNameErrorMessage: '', passwordErrorMessage: ''})

>>>>>>> refacter-> changed folder structure:src/pages/loginPage/Login.js
        }
    }

    handleInputChange = (event) => {
        this.setState({
<<<<<<< HEAD:src/components/LoginPage/Login.js
            [event.target.name]: event.target.value
=======
                [event.target.name]: event.target.value
>>>>>>> refacter-> changed folder structure:src/pages/loginPage/Login.js
        })
        this.setState({userAuthenticationFail: ''})
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

<<<<<<< HEAD:src/components/LoginPage/Login.js
    handleUserLogin = async() => {
        const user = {
            user_email: this.state.userName,
            password: this.state.password
        }
        try {
            const response = await axios.post('http://api.ganies.com/login', user);
            console.log(response.data)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.auth_token)
                return this
                    .props
                    .history
                    .push('/todo')
            }
        } catch (error) {
            this.setState({userAuthenticationFail: 'failed to login, user not found'})
        }
=======
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
>>>>>>> refacter-> changed folder structure:src/pages/loginPage/Login.js
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