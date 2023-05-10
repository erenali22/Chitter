import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ChatterItem from './ChatterItem';
import ReplyList from '../Reply/ReplyList';
import ReplyForm from '../Reply/ReplyForm';
import UserContext from '../../context/UserContext';

const SingleChatterPage = ({ match }) => {
  const [chatter, setChatter] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchChatter = async () => {
      try {
        const response = await fetch(`/api/chatters/${match.params.id}`);
        const data = await response.json();
        setChatter(data);
      } catch (error) {
        console.error('Error fetching chatter:', error);
      } finally {
        setIsDataFetched(true);
      }
    };

    fetchChatter();
  }, [match.params.id]);

  useEffect(() => {
    if (isDataFetched && chatter === null) {
      history.push('/chatters');
    }
  }, [chatter, history, isDataFetched]);

  return (
    <div>
      {chatter && (
        <ChatterItem
          chatter={chatter}
          currentUserId={user && user.id}
          setChatter={setChatter}
        />
      )}
      <ReplyList chatterId={match.params.id} />
      <ReplyForm chatterId={match.params.id} />
    </div>
  );
};

export default SingleChatterPage;
