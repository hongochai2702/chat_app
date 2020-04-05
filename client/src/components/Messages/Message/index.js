import React from 'react';
import ReactEmoji from 'react-emoji';
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
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <p className="sendTex pl-10">{user}</p>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Message);
