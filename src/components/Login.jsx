import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const SubmitLoginInfo = (e) => {
    e.preventDefault();
    axios
      .post('https://whatsapp-app-api.herokuapp.com/user/sync', {
        email: LoginInfo.email,
        password: LoginInfo.password,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setError('')
          localStorage.setItem('UserIdRegistered', res.data[0]._id);
          navigate('/chat');
        } else {
          
          setError('credentials are not valid');
          
        }
      })
      .catch((err) => {
        console.log(err);
        alert('error')
      });
  };
  return (
    <div>
      <Typography variant='h5' style={{marginBottom:10,color:'red'}}>{error}</Typography>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={SubmitLoginInfo}
      >
        <TextField
          type="email"
          label="Email"
          onChange={(e) => {
            setLoginInfo({ ...LoginInfo, email: e.target.value });
          }}
          style={{ marginBottom: 10 }}
        />
        <TextField
          type="password"
          label="Password"
          onChange={(e) => {
            setLoginInfo({ ...LoginInfo, password: e.target.value });
          }}
          style={{ marginBottom: 10 }}
        />
        <Button type="submit">Login</Button>
        <Typography>
          Don't Have an Account? <a href="/">Register</a>
        </Typography>
      </form>
    </div>
  );
}
