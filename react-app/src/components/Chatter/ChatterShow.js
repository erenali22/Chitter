import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatterShow = () => {
  const [chatter, setChatter] = useState(null);
  const [replies, setReplies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchChatter = async () => {
      const response = await fetch(`/api/chatters/${id}`);
      const data = await response.json();
      setChatter(data);
      setReplies(data.replies);
    };

    fetchChatter();
  }, [id]);

  return (
    <div>
      {chatter && (
        <div>
          <h1>{chatter.content}</h1>
          <p>By: {chatter.user.username}</p>
          <p>Location: {chatter.location ? chatter.location.name : 'N/A'}</p>
          <p>Created at: {new Date(chatter.created_at).toLocaleString()}</p>
        </div>
      )}
      <h2>Replies:</h2>
      {replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <p>{reply.content}</p>
              <p>By: {reply.user.username}</p>
              <p>Created at: {new Date(reply.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <a href={`/chatters/${id}/replies/new`}>Add a reply</a>
    </div>
  );
};

export default ChatterShow;
