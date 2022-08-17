import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styles/SideBarChats.css';
import axios from '../axios';
import { useNavigate, useSearchParams } from 'react-router-dom';




export default function SideBarChats({ searchValue }) {
  let navigate = useNavigate()
  const [searchParams] = useSearchParams()
  let from = localStorage.getItem('UserIdRegistered')
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <>
      {users?.filter(val => val.name.includes(searchValue)).map((user) => (
        user._id !== from && (
          searchParams.get('to') === user._id ? <div style={{ background: '#3390EC', color: '#fff' }} className="sideBarChats" onClick={() => { navigate(`/chat?from=${from}&to=${user._id}`) }}>
            <Avatar src={user.image}></Avatar>
            <div className="sidebarChat__info">
              <p style={{ marginBottom: 8 }}>{user.name}</p>
            </div>
          </div> : <div className="sideBarChats" onClick={() => { navigate(`/chat?from=${from}&to=${user._id}`) }}>
            <Avatar src={user.image}></Avatar>
            <div className="sidebarChat__info">
              <p style={{ marginBottom: 8 }}>{user.name}</p>
            </div>
          </div>
        )
      ))}
    </>
  );
}


