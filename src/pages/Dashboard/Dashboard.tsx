import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [{ data, fetching: meLoading }] = useMeQuery();

  console.log('data: ', data);

  useEffect(() => {
    if (!meLoading) {
      if (data && data.me && !data?.me.username) {
        navigate('/');
      }
    }
  }, [data, meLoading]);

  return <div>Dashboard</div>;
};
