import React from 'react';
import './style.css';

const Message = ({ message: { user, text }, name }) => {
  let isSendCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (trimmedName === user) {
    isSendCurrentUser = true;
  }

  return (
    <>
      {isSendCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <p className="sendText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <p className="sendText">{trimmedName}</p>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
