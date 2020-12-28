import React, { useState, useEffect } from "react";
import axios from 'axios';
import './UserLogin.css';
import formImg from '../../images/form_pic.png';

const userLogin = (props) => {

  const [user_email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmailMsg, setErrEmailMsg] = useState("");
  const [errPasswordMsg, setErrPasswordMsg] = useState("");
  const [msgUserNotFound, setMsgUserNotFound] = useState("");

  useEffect(() => {
    console.log('login page');
    localStorage.clear();
  }, [])

  const setCurrentUserEmail = (email) => {
    setMsgUserNotFound('');
    setErrEmailMsg('');
    setErrPasswordMsg('');
    setUserEmail(email);
  }

  const setCurrentPassword = (password) => {
    setMsgUserNotFound('');
    setErrEmailMsg('');
    setErrPasswordMsg('');
    setPassword(password);
  }

  const checkValidityHandler = (event) => {
    event.preventDefault();
    setMsgUserNotFound('');
    setErrEmailMsg('');
    setErrPasswordMsg('');
    const regEx = /^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\.([a-zA-Z]{2,5})$/
    if (!regEx.test(user_email) && password.length < 5) {
      setErrEmailMsg("Please provide a valid Email");
      setErrPasswordMsg("Please provide a valid password");
      return false;
    } else if (!regEx.test(user_email)) {
      setErrEmailMsg("Please provide a valid Email");
      //setErrPasswordMsg("");
      return false;
    } else if (password.length > 0 && password.length < 5) {
      setErrPasswordMsg("Please provide a valid password");
      return false;
    }
    setErrEmailMsg("");
    setErrPasswordMsg("");
    loginHandler();

  };

  const loginHandler = async () => {
    const user = {
      user_email: user_email,
      password: password
    }
    try {
      const resp = await axios.post('http://api.ganies.com/login', user);
      console.log(resp);
      if (resp.status && resp.status === 200) {
        localStorage.setItem('auth', resp.data.auth_token);
        props.history.push('/todoapp');
      } else {
        console.log(resp.status);
      }
    } catch (err) {
      setMsgUserNotFound('User Not Found');
      console.log(err);
    }

  }

  const formResetHandler = () => {
    setUserEmail("");
    setPassword("");
    setMsgUserNotFound("");
    setErrEmailMsg("");
    setErrPasswordMsg("");
  }

  return (

    <div className='loginFormContainer'>

      <form className='loginForm' onSubmit={checkValidityHandler}>
        <h2>Login to your account</h2>
        <p className='noUserFoundMsg'>{msgUserNotFound}</p>
        <input
          className='loginInputField'
          id="email"
          type='text'
          placeholder='Email'
          required
          value={user_email}
          onChange={(e) => setCurrentUserEmail(e.target.value)}
        />
        <p className='errInputMsg'>{errEmailMsg}</p>
        <input
          className='loginInputField'
          id="password"
          placeholder="Password"
          value={password}
          type="password"
          required
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <p className='errInputMsg'>{errPasswordMsg}</p>
        <div className='loginFormBtns' >
          <button className='loginFormBtn' type='submit'>Login</button>
          <button className='loginFormBtn' onClick={formResetHandler}>Reset</button>
        </div>
        <span className='signUpMsg'>Sign Up Instead?</span>
      </form>
      <div className='formImageController'>
        <img className='formImage' alt='logo' src={formImg} />
      </div>

    </div>

  )
};


export default userLogin;
