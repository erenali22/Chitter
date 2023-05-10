import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ChatterForm = () => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const response = await fetch("/api/chatters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      credentials: "include", 
    });

    if (response.ok) {
      const chatter = await response.json();
      history.push(`/chatters/${chatter.id}`);
    } else {
      const errorData = await response.json();
      if (errorData.errors) {
        setErrors(errorData.errors);
      }
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
      <button type="submit">Post Chatter</button>
    </form>
  );
};

export default ChatterForm;
