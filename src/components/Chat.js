import React, { useEffect, useState } from 'react';
import '../styles/Chat.css';
import { Avatar, IconButton, Switch, Tooltip } from '@mui/material';
import SeachOutlined from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmodIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';

import { useSearchParams } from 'react-router-dom';

import Pusher from 'pusher-js';
import axios from '../axios';

export default function Chat() {
  const [searchParams] = useSearchParams();
  let toUser = searchParams.get('to');
  let fromUser = searchParams.get('from');
  const [triggerNewMessage, settriggerNewMessage] = useState([]);
  const [userMessage, setUserMessage] = useState({
    message: '',
  });
  const [user, setUser] = useState([]);

  const addMessage = (e) => {
    e.preventDefault();
    console.log(`user ${fromUser}`);
    axios
      .post('/messages/new', {
        message: userMessage.message,
        from: fromUser,
        to: toUser,
      })
      .then((res) => {
        console.log(res.data);
        // setMessage(res.data)
        setUserMessage({ ...userMessage, message: '' });
        const element = document.getElementById('chat__body');
        element.scrollTop = element.scrollHeight;
        // window.scrollTo(0, document.body.scrollHeight);
      });
  };
  useEffect(() => {
    axios.post('/messages/sync', {}).then((res) => {
      settriggerNewMessage(res.data);
    });
    axios
      .post('/singleUser', {
        _id: toUser,
      })
      .then((res) => {
        console.log(res.data[0]);
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toUser, userMessage, triggerNewMessage]);

  useEffect(() => {
    var pusher = new Pusher('44c797267a9d1725dc46', {
      cluster: 'eu',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newmessage) {
      settriggerNewMessage([...triggerNewMessage, newmessage]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      window.scrollTo(0, document.body.scrollHeight);
    };
  }, [triggerNewMessage]);

  return (
    <div className="chat">
      <div className="chat__header">
        <IconButton onClick={() => window.open(user.image, '_blank').focus()}><Avatar src={user?.image} /></IconButton>
        <div className="chat__headerInfo">
          <h3>{user?.name}</h3>
          {/* <p>last seen at....</p> */}
        </div>

        <div className="chat__headerRight">
          {/* <Tooltip title='dark mode'><Switch /></Tooltip> */}
        </div>
      </div>
      <div className="chat__body">
        {triggerNewMessage.map((data) => (
          <SenderOrReceiver
            message={data}
            fromUser={fromUser}
            toUser={toUser}
          />
        ))}
      </div>
      {/* <p className="chat__message">{message.message}</p> 
      {/* <p className="chat__message chat__receiver">{message.message}</p> } */}

      <div className="chat__footer">
        <InsertEmodIcon />
        <form onSubmit={addMessage}>
          <input
            value={userMessage.message}
            placeholder="type message...."
            onChange={(e) => {
              setUserMessage({ ...userMessage, message: e.target.value });
            }}
          />
          <button style={{ display: 'none' }} type="submit">
            send message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

{
  /* <p className="chat__message">{message.message}</p>
) : (
  <p className="chat__message chat__receiver">{message.message}</p> */
}

const SenderOrReceiver = ({ message, toUser, fromUser }) => {
  if (
    (message.from === fromUser && message.to === toUser) ||
    (message.from === toUser && message.to === fromUser)
  ) {
    if (message.from === fromUser) {
      return <p className="chat__message chat__receiver">{message.message}</p>;
    } else {
      return <p className="chat__message">{message.message}</p>;
    }
  }
};
