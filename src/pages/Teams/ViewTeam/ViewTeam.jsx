import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';
import meQuery from '../../../shared/queries/team';
import Dashboard from '../../Dashboard/Dashboard';
import NoTeams from '../NoTeams/NoTeams';
import Themes from '../../../shared/themes';

const Wrapper = styled.div`
  display: block;
  height: 100%;
  width: 100%;
`;

const ViewTeam = (props) => {
  const {
    data: { loading, error, me, refetch },
    match,
  } = props;

  const { params } = match;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error. {error}</div>;
  }

  const { teams } = me;

  if (Array.isArray(teams)) {
    if (!teams.length) {
      return <NoTeams />;
    }
  }

  const team = teams.find((el) => el.uuid === params.teamId);

  return (
    <ThemeProvider theme={Themes}>
      <Wrapper>
        <Dashboard me={me} team={team} teamId={team.id} userId={me.id} refetch={refetch} />
      </Wrapper>
    </ThemeProvider>
  );
};

ViewTeam.defaultProps = {
  data: {},
  match: {},
};

ViewTeam.propTypes = {
  data: PropTypes.object,
  match: PropTypes.object,
};

export default graphql(meQuery, { options: { fetchPolicy: 'network-only' } })(ViewTeam);
