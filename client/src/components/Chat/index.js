/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './style.css';
import InfoBar from '../InfoBar';
import Input from '../Input';
import Messages from '../Messages';

let socket;

const Chat = ({ location }) => {
  const [currName, setCurrName] = useState('');
  const [currRoom, setCurrRoom] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room);

    socket = io(ENDPOINT);

    setCurrName(name);
    setCurrRoom(room);

    socket.emit('join', { name: currName, room: currRoom }, (error) => {
      console.log(`join: ${currName}`, currRoom);
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search, currName, currRoom]);

  useEffect(() => {
    socket.on('message', (mess) => {
      setMessages([...messages, mess]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, [messages]);
  console.log('users', users);

  // Function for sending messages.
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={currRoom} />
          <Messages messages={messages} name={currName} />
          <Input
            setMessage={setMessage}
            sendMessage={sendMessage}
            message={message}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
