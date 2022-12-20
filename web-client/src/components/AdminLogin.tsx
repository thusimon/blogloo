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
    navigate('/view-admin/manage');
  };

  return <div className='m-3'>
    <h1 className='text-2xl text-blue-600 font-semibold'>Admin Login here!</h1>
    <form className='border-2 border-slate-400 my-2' onSubmit={evt => { void handleLogin(evt); }}>
      <div className='p-2 flex'>
        <label className='py-1 basis-[80px]' htmlFor='username'>Username: </label>
        <input type="text" id='username' name='username' placeholder='Username' value={username}
          onChange={evt => setUsername(evt.target.value)}
          className='px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
      </div>
      <div className='p-2 flex'>
        <label className='py-1 basis-[80px]' htmlFor='password'>Password: </label>
        <input type="password" id='password' name='password' placeholder='Password' value={password}
          onChange={evt => setPassword(evt.target.value)}
          className='px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'/>
      </div>
      <div className='p-2'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded' type="submit">Login</button>
      </div>
    </form>
    <p style={{ display: wrongCreds ? 'block' : 'none' }}>Wrong credentials</p>
  </div>;
};

export default AdminLogin;
