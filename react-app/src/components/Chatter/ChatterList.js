import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ChatterList() {
  const [chatters, setChatters] = useState([null]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chatters");
        if (response.ok) {
          const fetchedChatters = await response.json();
          setChatters(fetchedChatters);
        } else {
          setError("Failed to fetch chatters");
        }
      } catch (err) {
        setError("An error occurred while fetching chatters");
      }
    };
    fetchData();
  }, []);

  console.log("Chatters to render:", chatters);
  console.log("Chatters JSON:", JSON.stringify(chatters, null, 2));


  return (
    <div className="chatter-list">
      <h1>Chatters</h1>
      {error ? (
        <p>{error}</p>
      ) : chatters.length === 0 ? (
        <p>Loading...</p>
      ) : (
        chatters
          .filter((chatter) => chatter !== null)
          .map((chatter) => (
            <div key={chatter.id}>
              <Link to={`/chatters/${chatter.id}`}>
                <h2>{chatter.content}</h2>
              </Link>
              <p>{chatter.content}</p>
            </div>
          ))
      )}
    </div>
  );
}

export default ChatterList;

