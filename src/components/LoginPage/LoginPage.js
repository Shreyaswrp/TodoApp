import React from 'react'
import loginImage from '../../asset/account.svg'

function LoginPage(props) {
    return (
        <div>
            <div className='login-page-container'>
                <div className="login-page-heading">
                    <h4>Login to your account</h4>
                </div>
                <div className='form-container'>
                    <form
                        className='login-form'
                        onSubmit={event => props.handleLoginFormSubmit(event)}
                        autoComplete="off">
                        <div className='username-input-field'>
                            <div className='user-input-box'>
                                <input
                                    type='text'
                                    name='userName'
                                    placeholder=' '
                                    value={props.stateData.userName}
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
                                type={props.stateData.passwordVisibility
                                ? 'password'
                                : 'text'}
                                name='password'
                                placeholder=' '
                                value={props.stateData.password}
                                onChange={event => props.handleInputChange(event)}
                                onInput={props.handlePasswordErrorMessage}/>
                            <label className='password-label'>Password</label>
                            <i
                                className={props.stateData.passwordVisibility
                                ? "fas fa-eye-slash password-visibility-icon"
                                : "far fa-eye password-visibility-icon"}
                                onClick={props.changePasswordVisibilityType}></i>
                        </div>
                        <span className='password-error-message'>{props.stateData.passwordErrorMessage}</span>
                        <div>
                        <span className='login-fail-error-message'>{props.stateData.userAuthenticationFail}</span>
                        </div>
                        <button type="submit" className='login-button'>Login</button>
                        <div className='new-account-link'>Create Account</div>
                    </form>
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
