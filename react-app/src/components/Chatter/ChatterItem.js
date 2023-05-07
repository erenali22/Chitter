import React from 'react';

const ChatterItem = ({ chatter }) => {
  return (
    <div className="chatter-item">
      <h2>{chatter.title}</h2>
      <p>{chatter.content}</p>
      {chatter.user && chatter.user.username ? (
        <div className="chatter-author"><h4>Posted by: {chatter.user.username}</h4></div>
      ) : (
        <div className="chatter-author"><h4>Posted by: Unknown</h4></div>
      )}
    </div>
  );
};

export default ChatterItem;

