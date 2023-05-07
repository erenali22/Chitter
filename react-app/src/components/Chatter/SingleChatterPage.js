import React, { useEffect, useState, useContext } from 'react';
import ChatterItem from './ChatterItem';
import ReplyList from '../Reply/ReplyList';
import ReplyForm from '../Reply/ReplyForm';
import UserContext from '../../context/UserContext';

const SingleChatterPage = ({ match }) => {
  const [chatter, setChatter] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChatter = async () => {
      try {
        const response = await fetch(`/api/chatters/${match.params.id}`);
        const data = await response.json();
        setChatter(data);
      } catch (error) {
        console.error('Error fetching chatter:', error);
      }
    };

    fetchChatter();
  }, [match.params.id]);

  return (
    <div>
      {chatter && <ChatterItem chatter={chatter} currentUserId={user && user.id} />}
      <ReplyList chatterId={match.params.id} />
      <ReplyForm chatterId={match.params.id} />
    </div>
  );
};

export default SingleChatterPage;
