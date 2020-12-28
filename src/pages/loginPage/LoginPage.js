import React from 'react'
import loginImage from './images/account.svg'

function LoginPage(props) {
    return (
        <div>
            <div className='login-container'>
                <div className="login-form-heading">
                    <div>Login to your account</div>
                </div>
                <div className='form-container'>
                    <form
                        className='login-form'
                        onSubmit={event => props.handleLoginFormSubmit(event)}
                        autoComplete="off">
                        <div className='input-box-position'>
                            <div className='userInput-box'>
                                <input
                                    type='text'
                                    name='userName'
                                    placeholder=' '
                                    value={props.stateData.user.userName}
                                    className='login-input'
                                    onChange={event => props.handleInputChange(event)}
                                    onInput={props.handleUserErrorMessage}/>
                                <label className='username-label'>Username</label>
                            </div>
                            <span className='username-error-message'>{props.stateData.userNameErrorMessage}</span>
                        </div>
                        <div className='password-box'>
                            <input
                                className='login-password'
                                type={props.stateData.passwordVisibility?'password':'text'}
                                name='password'
                                placeholder=' '
                                value={props.stateData.user.password}
                                onChange={event => props.handleInputChange(event)}
                                onInput={props.handlePasswordErrorMessage}/>
                            <label className='password-label'>Password</label>
                            <i
                                className={props.stateData.passwordVisibility
                                ? "fas fa-eye-slash"
                                : "far fa-eye"}
                                onClick={props.changePasswordVisibilityType}></i>
                        </div>
                        <span className='password-error-message'>{props.stateData.passwordErrorMessage}</span>
                        <button type="submit" className='login-button'>Login</button>
                        <div className='forgot-password-link'>Forgot password?</div>
                    </form>
                    <div className='new-account-link'>Create Account</div>
                </div>
                <div className='image-position'>
                    <figure>
                        <img src={loginImage} alt='Login-image'/>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
