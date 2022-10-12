import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Actions, useAppContext } from '../context/app-context';

const AdminLogin = (): JSX.Element => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCreds, setWrongCreds] = useState(false);

  const handleLogin = async (evt: FormEvent): Promise<void> => {
    evt.preventDefault();
    const credsPayload = {
      username,
      password
    };
    const tokenResp = await fetch('/auth/token', {
      method: 'POST',
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
    localStorage.setItem('jwt', jwtData.jwt);
    dispatch({ type: Actions.UpdateJWT, data: jwtData });
    navigate('/internal/admin/manage');
  };

  return <div>
    <p>Admin Login here!</p>
    <form onSubmit={evt => { void handleLogin(evt); }}>
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
    <p style={{ display: wrongCreds ? 'block' : 'none' }}>Wrong credentials</p>
  </div>;
};

export default AdminLogin;
