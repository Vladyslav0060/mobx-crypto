import StoreContext from '../store/StoreContext'
import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite';
import modulee from '../ComponentsCSS/Login.module.css'
const axios = require('axios');


const Login = () => {
    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let onChangePassword = (event) => {
        setPassword(event.target.value);
      }
      let onChangeLogin = (event) => {
        setUsername(event.target.value);
      }
      let onSubmit = (e) => {
        if(login())alert(`Welcome,${username}`)
        e.preventDefault();
      }
    const store = React.useContext(StoreContext)
    let login = () =>{
        const body = {
            username: username,
            password: password
        }
        axios({
          method: 'post',
          url: 'http://localhost:5000/auth/login',
          data: body
      })
      .then(function (response) {
        store.addToken(response.data.token)
        console.log('aaaa',response.data.token)
        console.log('store',store.token)
        if(store.token) store.authentication.onAuthentication()
        alert('Authorization succeed!')
      })
      .catch(function (error) {
          console.log(error);
          alert('try again')
      });
    }

    return useObserver(()=>(
        <div className={modulee.container}>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit}>
          <input className={modulee.inpuut} type="text" name="login" placeholder="username" onChange={onChangeLogin}/>
          <br/>
          <input type="password" name="password" placeholder="password" onChange={onChangePassword}/>
        <p><input className={modulee.confirmButton}type="submit" value="Login" /></p>
  </form>
            {store.token ? (<p>Your token: {store.token}</p>):(console.log())}
        </div>
    ))
}

export default Login
