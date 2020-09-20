import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';
import meQuery from '../../shared/queries/team';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ChannelMessages from '../../components/Messages/ChannelMessages/ChannelMessages';
import ChannelInput from '../../components/MessageInput/ChannelInput/ChannelInput';
import Themes from '../../shared/themes';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr;
  aside {
    display: grid;
    grid-template-columns: 250px;
  }
  main {
    display: grid;
  }
`;

const SidebarWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.valentino};
  grid-column: 1;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  header {
    grid-column: 1;
    grid-row: 1;
  }
  section {
    border-bottom: 1px solid ${(props) => props.theme.colors.black};
    border-top: 1px solid ${(props) => props.theme.colors.black};
    grid-column: 1;
    grid-row: 2;
  }
  footer {
    grid-column: 1;
    grid-row: 3;
  }
`;

const Messages = styled.div`
  height: 98%;
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // directMessagesReceived: null,
      // filteredMessages: null,
      itemName: null,
      selectedUserId: null,
      selectedUserUUID: null,
      selectedChannelId: null,
      selectedChannelUUID: null,
    };

    // this.subscribeToDirectMessages = this.subscribeToDirectMessages.bind(this);
    this.handleChangeItem = this.handleChangeItem.bind(this);
  }

  componentDidMount = () => {
    const { teamId, userId, match, me } = this.props;
    const teamUUID = match.params.teamId;

    if (match.params.channelId) {
      const channelUUID = match.params.channelId;

      this.handleChangeItem(teamUUID, channelUUID, 'channel', me);
    } else if (match.params.userId) {
      const userUUID = match.params.userId;

      this.handleChangeItem(teamUUID, userUUID, 'user', me);
    }
  };

  componentDidUpdate = (prevProps) => {
    const {
      // data: { directMessages },
      match,
      me,
      teamId,
      userId,
    } = this.props;
    const { channelUUID, userUUID } = this.state;
    const { uuid } = me;

    if (prevProps.userId !== userId) {
      this.unsubscribe = this.subscribeToDirectMessages(teamId, userId);
    }

    // if (Array.isArray(directMessages) && Array.isArray(prevProps.data.directMessages)) {
    //   if (directMessages.length > prevProps.data.directMessages) {
    //     this.setState({
    //       directMessagesReceived: directMessages,
    //     });
    //   }
    // }

    if (match.params.channelId) {
      const teamUUID = match.params.teamId;
      const selectedChannel = match.params.channelId;

      if (prevProps.match.params.channelId !== match.params.channelId) {
        this.handleChangeItem(teamUUID, selectedChannel, 'channel', me);
      } else if (channelUUID === null) {
        this.handleChangeItem(teamUUID, selectedChannel, 'channel', me);
      }
    } else if (match.params.userId) {
      const teamUUID = match.params.teamId;
      const selectedUser = match.params.userId;

      if (prevProps.match.params.userId !== match.params.userId) {
        this.handleChangeItem(teamUUID, selectedUser, 'user', me);
      } else if (userUUID === null) {
        this.handleChangeItem(teamUUID, selectedUser, 'user', me);
      }
    }
  };

  handleChangeItem = (teamUUID, uuid, type, me) => {
    const { teams } = me;
    const teamIdx = teams.findIndex((el) => el.uuid === teamUUID);
    const team = teams[teamIdx];

    if (type === 'channel') {
      const { channels } = team;
      const channel = channels.filter((el) => el.uuid === uuid);

      if (Array.isArray(channel)) {
        if (channel.length) {
          this.setState({
            selectedUserId: null,
            selectedUserUUID: null,
            selectedChannelUUID: channel[0].uuid,
            selectedChannelId: channel[0].id,
            itemName: channel[0].name,
          });
        }
      }
    } else if (type === 'user') {
      const { teamMembers } = team;
      const user = teamMembers.filter((el) => el.uuid === uuid);

      if (Array.isArray(user)) {
        if (user.length) {
          this.setState({
            selectedUserId: user[0].id,
            selectedUserUUID: user[0].uuid,
            selectedChannelUUID: null,
            selectedChannelId: null,
            itemName: null,
          });
        }
      }
    }
  };

  render() {
    const { history, me, team, teamId, userId, match } = this.props;
    const {
      directMessagesReceived,
      filteredMessages,
      itemName,
      selectedUserId,
      selectedUserUUID,
      selectedChannelId,
      selectedChannelUUID,
    } = this.state;
    const { username } = me;
    const { admin, name, channels, teamMembers, directMessageMembers, uuid } = team;
    const currentUser = {
      id: me.id,
      uuid: me.uuid,
      username: me.username,
    };

    return (
      <ThemeProvider theme={Themes}>
        <Wrapper>
          <aside>
            <SidebarWrapper>
              <Sidebar
                channels={channels}
                currentUser={currentUser}
                directMessageMembers={directMessageMembers}
                directMessagesReceived={directMessagesReceived}
                isOwner={admin}
                teamMembers={teamMembers}
                teamName={name}
                teamId={teamId}
                teamUUID={uuid}
                username={username}
                match={match}
                history={history}
              />
            </SidebarWrapper>
          </aside>
          <main>
            <Content>
              <header>
                <Header channels={channels} users={teamMembers} />
              </header>
              <>
                {match.params.channelId && selectedChannelId !== null && (
                  <>
                    <section>
                      <Messages>
                        <ChannelMessages
                          channelId={parseInt(selectedChannelId, 10)}
                          channels={channels}
                          match={match}
                        />
                      </Messages>
                    </section>
                  </>
                )}
                {match.params.userId && selectedUserId !== null && (
                  <>
                    <section>
                      <Messages>UserMessages</Messages>
                    </section>
                  </>
                )}
              </>
              <>
                {match.params.channelId && (
                  <>
                    <footer>
                      <ChannelInput
                        channelId={parseInt(selectedChannelId, 10)}
                        channels={channels}
                        match={match}
                      />
                    </footer>
                  </>
                )}
                {match.params.userId && (
                  <>
                    <footer>UserInput</footer>
                  </>
                )}
              </>
            </Content>
          </main>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

Dashboard.defaultProps = {
  history: {},
  match: {},
  // data: {},
  team: {},
  me: {},
  teamId: 0,
  userId: 0,
};

Dashboard.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  // data: PropTypes.object,
  team: PropTypes.object,
  me: PropTypes.object,
  teamId: PropTypes.number,
  userId: PropTypes.number,
};

export default graphql(meQuery, { options: { fetchPolicy: 'network-only' } })(Dashboard);
