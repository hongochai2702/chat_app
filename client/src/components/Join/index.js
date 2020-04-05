import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './styles.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="joinInput"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Room"
            className="joinInput mt-20"
            onChange={(ev) => setRoom(ev.target.value)}
            value={room}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`${routes.CHAT}?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Join);
