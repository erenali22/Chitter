import React, { useState, useEffect } from 'react';
import Reply from './Reply';

const ReplyList = ({ chatterId }) => {
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

  return (
    <div className="reply-list">
      <h1>Replies</h1>
      {replies && replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

export default ReplyList;

