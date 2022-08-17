import React from 'react';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import './styles/App.css';

export default function ChatComponent() {

  return (
    
      <div className="app">
        <div className="app__body">
          <SideBar />
          <Chat />
        </div>
      </div>
  );
}
