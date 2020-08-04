import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import gql from 'graphql-tag';
import Channels from '../Channels/Channels';
import Themes from '../../shared/themes';

const Wrapper = styled.div`
  padding-top: 15px;
`;

const Header = styled.header`
  margin-bottom: 20px;
  h2 {
    color: ${(props) => props.theme.colors.white};
    text-align: center;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;

const User = styled.div`
  margin: 0 auto;
  text-align: center;
  h3 {
    color: ${(props) => props.theme.colors.white};
    display: inline-block;
    text-align: center;
  }
  svg {
    color: ${(props) => props.theme.colors.jungleGreen};
    font-size: 0.85em;
    margin-right: 5px;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;

const Invite = styled.section`
  color: ${(props) => props.theme.colors.shadyLady};
  display: block;
  height: 40px;
  width: 100%;
  h3,
  button {
    float: left;
  }

  h3 {
    margin-left: 10px;
    padding-top: 8px;
  }

  button {
    bottom: 13px;
    color: ${(props) => props.theme.colors.shadyLady};
    margin-left: 5px;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeEl: '',
      invitePeopleModal: false,
      user: null,
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleOpenInvitePeople = this.handleOpenInvitePeople.bind(this);
    this.handleCloseInvitePeople = this.handleCloseInvitePeople.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  /**
   * Sets which item is selected when component loads.
   */
  componentDidMount = () => {
    const { match, channels, teamMembers, teamId } = this.props;

    if (match.params.channelId) {
      const channel = channels.filter((el) => el.uuid === match.params.channelId);

      this.setState({ activeEl: channel[0].uuid });
    } else if (match.params.userId) {
      const user = teamMembers.filter((el) => el.uuid === match.params.userId);

      this.setState({ activeEl: user[0].uuid });
    }
  };

  /**
   * Sets the selected channel if a team is changed.  Will select general channel of team.
   *
   * @param      {Object}  prevProps  The previous properties.
   */
  componentDidUpdate = (prevProps) => {
    const { channels, currentUser, match } = this.props;
    const { uuid } = currentUser;

    if (match.params.channelId) {
      if (prevProps.match.params.channelId !== match.params.channelId) {
        const channel = channels.filter((el) => el.uuid === match.params.channelId);

        this.setState({ activeEl: channel[0].uuid }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  };

  /**
   * Handles getting the selected user.
   *
   * @param      {Object}  user    The user.
   */
  handleGetUser = (user) => {
    this.setState({ user, activeEl: user.uuid });
  };

  /**
   * Sets focus to an item selected in the sidebar.
   *
   */
  handleSelectItem = (e) => {
    const { currentTarget } = e;
    const { parentNode } = currentTarget;
    const elId = parentNode.id;

    this.setState({
      activeEl: elId,
    });
  };

  /**
   * Opens the invite people modal.
   *
   */
  handleOpenInvitePeople = () => {
    this.setState({ invitePeopleModal: true });
  };

  /**
   * Closes the invite people modal.
   *
   */
  handleCloseInvitePeople = () => {
    this.setState({ invitePeopleModal: false });
  };

  render() {
    const {
      channels,
      directMessageMembers,
      directMessagesReceived,
      history,
      teamMembers,
      teamName,
      teamId,
      teamUUID,
      currentUser,
      isOwner,
    } = this.props;
    const { activeEl, invitePeopleModal, user } = this.state;

    return (
      <ThemeProvider theme={Themes}>
        <Wrapper>
          <Header>
            <h2>{teamName}</h2>
            <User>
              <FontAwesomeIcon icon={faCircle} className="user-status" />
              <h3>{currentUser.username}</h3>
            </User>
          </Header>
          <section>
            <>
              <Channels
                isOwner={isOwner}
                channels={channels}
                activeEl={activeEl}
                teamId={teamId}
                teamUUID={teamUUID}
                selectItem={this.handleSelectItem}
                history={history}
              />
            </>
            <>
              <div>Direct Messages</div>
            </>
            {isOwner && <div>Invite people</div>}
          </section>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

Sidebar.defaultProps = {
  channels: [],
  directMessageMembers: [],
  directMessagesReceived: [],
  history: {},
  teamMembers: [],
  teamName: '',
  teamId: null,
  teamUUID: null,
  currentUser: null,
  isOwner: false,
  match: {},
};

Sidebar.propTypes = {
  channels: PropTypes.array,
  directMessageMembers: PropTypes.array,
  directMessagesReceived: PropTypes.array,
  history: PropTypes.object,
  teamMembers: PropTypes.array,
  teamName: PropTypes.string,
  teamId: PropTypes.number,
  teamUUID: PropTypes.string,
  currentUser: PropTypes.object,
  isOwner: PropTypes.bool,
  match: PropTypes.object,
};

export default Sidebar;
