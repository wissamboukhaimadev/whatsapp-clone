import React, { useState,useEffect } from 'react';
import '../styles/SideBar.css';
// import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { IconButton } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import SeachOutlined from '@mui/icons-material/SearchOutlined';
import { Avatar } from '@mui/material'
import SideBarChats from './SideBarChats';

import axios from '../axios'
export default function SideBar() {

  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([]);
  const userId=localStorage.getItem('UserIdRegistered');
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        let currentUsers=res.data
        currentUsers=currentUsers.filter(val=>val._id===userId)
        setUsers(currentUsers[0])
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconButton onClick={()=>window.open(users.image, '_blank').focus()}>
          <Avatar src={users.image} ></Avatar>
        </IconButton>
        {/* <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div> */}
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SeachOutlined />
          <input placeholder='SearchOutlined' onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </div>


      <div className='sidebar__chats' >
        <SideBarChats searchValue={searchValue} />
      </div>

    </div>
  );
}
