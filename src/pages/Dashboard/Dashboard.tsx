import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery, useGetTeamsQuery } from '../../generated/graphql';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { SideBar } from '../../components/SideBar/SideBar';
import { ChannelMessages } from '../../components/ChannelMessages/ChannelMessages';
import { ITeams } from '../../shared/Interfaces';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [{ data, fetching: meLoading }] = useMeQuery();
  const [{ data: teams, fetching }] = useGetTeamsQuery({});
  const [hasTeams, setHasTeams] = useState<boolean>(false);

  useEffect(() => {
    if (!meLoading) {
      if (data && data.me && !data?.me.username) {
        navigate('/');
      }
    }
  }, [data, meLoading]);

  let teamsArray: ITeams[] = [];

  useEffect(() => {
    if (!fetching) {
      if (teams?.getTeams) {
        if (Array.isArray(teams.getTeams.teams) && teams.getTeams.teams.length >= 1) {
          teamsArray = teams.getTeams.teams;

          setHasTeams(true);
        }
      }
    }
  }, [teams, fetching, teamsArray]);

  if (!hasTeams) {
    return (
      <div className="dashboard-container">
        <header>
          <Header />
        </header>
        <main>
          <div className="content">
            <a href="/create-team">Create a Team</a>
          </div>
        </main>
      </div>
    );
  }

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
