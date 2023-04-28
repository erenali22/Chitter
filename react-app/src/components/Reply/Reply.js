import React from 'react';

const Reply = ({ reply }) => {
  return (
    <div className="reply">
      <div className="reply-content">{reply.content}</div>
      <div className="reply-author">Posted by: {reply.user.username}</div>
    </div>
  );
};

export default Reply;
