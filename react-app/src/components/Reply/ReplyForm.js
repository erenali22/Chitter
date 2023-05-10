import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ReplyForm = () => {
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const { chatterId, replyId } = useParams();
    const history = useHistory();
    const isEditing = !!replyId;

    useEffect(() => {
      if (isEditing) {
        async function fetchData() {
          const response = await fetch(`/api/replies/${replyId}`);
          if (response.ok) {
            const data = await response.json();
            setContent(data.content);
          }
        }
        fetchData();
      }
    }, [isEditing, replyId]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch(isEditing ? `/api/replies/${replyId}` : `/api/chatters/${chatterId}/replies`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      });

      if (response.ok) {
        history.push(`/chatters/${chatterId}`);
      } else {
        const data = await response.json();
        setErrors(data.errors);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <button type="submit">{isEditing ? 'Update Reply' : 'Post Reply'}</button>
    </form>
  );
};

export default ReplyForm;
