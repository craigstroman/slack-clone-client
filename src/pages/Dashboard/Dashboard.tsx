import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../generated/graphql';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { SideBar } from '../../components/SideBar/SideBar';
import { ChannelMessages } from '../../components/ChannelMessages/ChannelMessages';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [{ data, fetching: meLoading }] = useMeQuery();

  useEffect(() => {
    if (!meLoading) {
      if (data && data.me && !data?.me.username) {
        navigate('/');
      }
    }
  }, [data, meLoading]);

  return (
    <div className="dashboard-container">
      <header>
        <Header />
      </header>
      <aside>
        <SideBar />
      </aside>
      <main>
        <ChannelMessages />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
