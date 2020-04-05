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
  const { name, room } = queryString.parse(location.search);
  const [currName, setCurrName] = useState(name);
  const [currRoom, setCurrRoom] = useState(room);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://app-chat-gl.herokuapp.com/';

  useEffect(() => {
    setCurrName(name);
    setCurrRoom(room);
    socket = io(ENDPOINT);
    socket.emit('join', { name: currName, room: currRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  // Function for sending messages.
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      socket.on('message', (mess) => {
        setMessages([...messages, mess]);
      });
    }
  };

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

export default React.memo(Chat);
