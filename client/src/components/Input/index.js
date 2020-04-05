import React from 'react';
import './style.css';

const Input = ({ setMessage, sendMessage, message }) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message ..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="sendButton"
        onClick={(ev) => sendMessage(ev)}
      >
        Send
      </button>
    </form>
  );
};

export default React.memo(Input);
