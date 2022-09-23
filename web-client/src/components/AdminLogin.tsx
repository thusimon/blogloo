import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actions, useAppContext } from '../context/app-context';

const AdminLogin = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCreds, setWrongCreds] = useState(false);

  const handleLogin = async (evt: FormEvent) => {
    evt.preventDefault();
    const credsPayload = {
      username,
      password
    };
    const tokenResp = await fetch('/auth/token', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credsPayload)
    });
    if (tokenResp.status !== 200) {
      setWrongCreds(true);
      return;
    }
    setWrongCreds(false);
    const jwtData = await tokenResp.json();
    dispatch({type: Actions.UpdateJWT, data: jwtData});
    navigate('/home');
  }
  return <div>
    <p>Admin Login here!</p>
    <form onSubmit={evt => handleLogin(evt)}>
      <label htmlFor='username'>Username</label>
      <input type="text" id='username' name='username' placeholder='Username' value={username}
        onChange={evt => setUsername(evt.target.value)}></input>
      <br />
      <label htmlFor='password'>Password</label>
      <input type="password" id='password' name='password' placeholder='Password' value={password}
        onChange={evt => setPassword(evt.target.value)}></input>
      <br />
      <input type="submit" value="Login" />
    </form>
    <p style={{display: wrongCreds ? 'block' : 'none' }}>Wrong credentials</p>
  </div>
};

export default AdminLogin;
