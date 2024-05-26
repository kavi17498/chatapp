// src/App.js
import React, { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import {auth} from "./firebase-config";
import "./styles/Chat.css";
const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState('');
  const roomInputRef = useRef(null);

  const handleEnterChat = () => {
    const roomName = roomInputRef.current.value.trim();
    if (roomName !== '') {
      setRoom(roomName);
      console.log(`Entering room: ${roomName}`);
      // Add your logic to enter the chat room here
    }
  };

  const signUserOut = async() =>{
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="App">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name</label>
          <input ref={roomInputRef} />
          <button onClick={handleEnterChat}>Enter Chat</button>
        </div>
      )}
      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
