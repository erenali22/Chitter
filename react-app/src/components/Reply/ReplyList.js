import React, { useState, useEffect } from 'react';
import Reply from './Reply';

const ReplyList = ({ chatterId, chatterOwnerId, currentUserId }) => {
  const [replies, setReplies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/chatters/${chatterId}/replies`);
      if (response.ok) {
        const replies = await response.json();
        console.log("Fetched replies:", replies);
        setReplies(replies);
      }
    };
    fetchData();
  }, [chatterId]);

  const handleDelete = (deletedReplyId) => {
    setReplies(replies.filter((reply) => reply.id !== deletedReplyId));
  };

  return (
    <div className="reply-list">
      <h1>Replies</h1>
      {replies && replies.map((reply) => (
        <Reply
          key={reply.id}
          reply={reply}
          onDelete={handleDelete}
          chatterOwnerId={chatterOwnerId}
          currentUserId={currentUserId}
          chatterId={chatterId}
        />
      ))}
    </div>
  );
};

export default ReplyList;
