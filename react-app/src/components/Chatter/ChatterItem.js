import React, { useState } from 'react';

const ChatterItem = ({ chatter, currentUserId, setChatter }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(chatter.content);
  const isCurrentUserAuthor = chatter.user && chatter.user.id === currentUserId;

  const editChatter = async () => {
    const response = await fetch(`/api/chatters/${chatter.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      const updatedChatter = await response.json();
      console.log('Chatter updated:', updatedChatter);
      setChatter(updatedChatter);
      setEditing(false);
    } else {
      console.error('Error updating chatter');
    }
  };

  const deleteChatter = async () => {
    const response = await fetch(`/api/chatters/${chatter.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Chatter deleted');
      setChatter(null);
    } else {
      console.error('Error deleting chatter');
    }
  };

  if (!chatter) {
    return null;
  }

  return (
    <div className="chatter-item">
      <h2>{chatter.title}</h2>
      {editing ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={editChatter}>Post</button>
        </>
      ) : (
        <p>{chatter.content}</p>
      )}
      {chatter.user && chatter.user.username ? (
        <div     className="chatter-author">
        <h4>Posted by: {chatter.user.username}</h4>
      </div>
    ) : (
      <div className="chatter-author">
        <h4>Posted by: Unknown</h4>
      </div>
    )}
    {isCurrentUserAuthor && (
      <div>
        {editing ? (
          <button onClick={() => setEditing(false)}>Cancel</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button onClick={deleteChatter}>Delete</button>
      </div>
    )}
  </div>
);
};

export default ChatterItem;
