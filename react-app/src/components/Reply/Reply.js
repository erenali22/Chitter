import React, { useState } from 'react';

const Reply = ({ reply, onDelete, onUpdate, chatterOwnerId, currentUserId, chatterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);
  const [errors, setErrors] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date);
  };

  const handleSave = async () => {
    const trimmedContent = editedContent.trim();
    if (!trimmedContent) {
      setErrors(['Content cannot be empty.']);
      return;
    }

    const response = await fetch(`/api/replies/${reply.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: trimmedContent,
      }),
    });

    if (response.ok) {
      const updatedReply = await response.json();
      onUpdate(updatedReply);
      setIsEditing(false);
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/replies/${reply.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onDelete(reply.id);
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  return (
    <div className="reply">
      {isEditing ? (
        <input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div className="reply-content">{reply.content}</div>
      )}
      <div className="reply-author">
        Posted by: {reply.user.username} at {formatDate(reply.created_at)}
        {reply.updated_at && (
          <span>
            {' '}
            (edited at {formatDate(reply.updated_at)})
          </span>
        )}
      </div>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      {!isEditing && currentUserId === reply.user.id && (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      {isEditing && (
        <button onClick={handleSave} disabled={!editedContent.trim()}>
          Save
        </button>
      )}
      {(currentUserId === reply.user.id || currentUserId === chatterOwnerId) && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Reply;
