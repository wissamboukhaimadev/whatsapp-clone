import React from 'react';
import './styles/App.css';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import ChatComponent from './ChatComponent';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/chat' element={<ChatComponent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
