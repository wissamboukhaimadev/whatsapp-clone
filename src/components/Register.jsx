import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();
  const [RegisterInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });

  const SubmitRegisterInfo = (e) => {
    e.preventDefault();
    axios
      .post('/user/create', {
        name: RegisterInfo.name,
        email: RegisterInfo.email,
        password: RegisterInfo.password,
        image:RegisterInfo.image
      })
      .then((res) => {
        localStorage.setItem('UserIdRegistered', res.data._id);
        navigate('/chat');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={SubmitRegisterInfo}
      >
        <TextField
          type="text"
          label="Name"
          onChange={(e) => {
            setRegisterInfo({ ...RegisterInfo, name: e.target.value });
          }}
          style={{ marginBottom: 10 }}
        />
        <TextField
          type="email"
          label="Email"
          onChange={(e) => {
            setRegisterInfo({ ...RegisterInfo, email: e.target.value });
          }}
          style={{ marginBottom: 10 }}
        />
        <TextField
          type="password"
          label="Password"
          onChange={(e) => {
            setRegisterInfo({ ...RegisterInfo, password: e.target.value });
          }}
          style={{ marginBottom: 10 }}
        />
        <TextField
          type="file"
          onChange={(e) => {
            const reader = new FileReader();
            reader.onload = () => {
              // localStorage.setItem("image",reader.result)
              setRegisterInfo({ ...RegisterInfo, image: reader.result });
            };
            reader.readAsDataURL(e.target.files[0]);
          }}
          style={{ marginBottom: 10 }}
        />
        <Button type="submit">Register</Button>
        <Typography>
          Already Have an Account? <a href="/login">Login</a>
        </Typography>
      </form>
    </div>
  );
}
