import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Reply from './Reply';

const ReplyList = ({ match }) => {
  const [replies, setReplies] = useState(null);
  const chatterId = match.params.chatterId;

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
      <Link to={`/chatters/${chatterId}/replies/new`}>Add a reply</Link>
    </div>
  );
};

export default ReplyList;
