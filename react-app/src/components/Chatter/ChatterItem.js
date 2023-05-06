import React from 'react';
import { NavLink } from 'react-router-dom';

const Chatter = ({ chatter }) => {
  return (
    <div className="chatter">
      <h3>{chatter.content}</h3>
      <p>By: {chatter.user.username}</p>
      <NavLink to={`/chatters/${chatter.id}`}>
        View and reply to this chatter
      </NavLink>
    </div>
  );
};

export default Chatter;
