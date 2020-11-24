import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from '@material-ui/core';
import jwt from 'jsonwebtoken';
import uuid from 'react-uuid';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { Wrapper, ModalContent, ListContent } from '../../shared/styled/components/Header/Header';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
import Modal from '../UI/Modal/Modal';

const lastSeenSubscription = gql`
  subscription($username: String!, $lastSeen: String!) {
    newChannelMessage(username: $username, lastSeen: $lastSeen) {
      id
      text
      user {
        usernamed
      }
      createdAt
    }
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserModal: false,
    };

    this.handleOpenUserModal = this.handleOpenUserModal.bind(this);
    this.handleCloseUserModal = this.handleCloseUserModal.bind(this);
  }

  handleOpenUserModal = () => {
    this.setState({ showUserModal: true });
  };

  handleCloseUserModal = () => {
    this.setState({ showUserModal: false });
  };

  render() {
    const { showUserModal } = this.state;
    const { history, match, channels, teamName, users } = this.props;
    const token = jwt.decode(localStorage.getItem('token'));
    let title = '';

    console.log('users: ', users);

    if (match.params.channelId) {
      const channel = channels.filter((el) => el.uuid === match.params.channelId);

      title = `#${channel[0].name}`;
    } else if (match.params.userId) {
      const user = users.filter((el) => el.uuid === match.params.userId);

      if (user[0].id === token.user.id) {
        title = `${user[0].username} (you)`;
      } else {
        title = `${user[0].username}`;
      }
    }

    return (
      <Wrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>{title}</h3>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'left' }}>
            {match.params.channelId && (
              <IconButton
                type="button"
                className="header__users"
                size="small"
                onClick={this.handleOpenUserModal}
              >
                <FontAwesomeIcon icon={faUserAlt} />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <PopUpMenu />
          </Grid>
        </Grid>
        <Modal isOpen={showUserModal} fullWidth={true} handleClose={this.handleCloseUserModal}>
          <DialogTitle>{teamName} Users</DialogTitle>
          <DialogContent>
            <ModalContent>
              <ListContent>
                {users.map((el, i) => (
                  <li key={uuid()}>
                    {el.username}
                    <FontAwesomeIcon icon={faCircle} className="user-status" />
                  </li>
                ))}
              </ListContent>
            </ModalContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseUserModal()}>Close</Button>
          </DialogActions>
        </Modal>
      </Wrapper>
    );
  }
}

Header.defaultProps = {
  match: {},
  history: {},
  teamName: '',
  channels: [],
  users: [],
};

Header.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  teamName: PropTypes.string,
  channels: PropTypes.array,
  users: PropTypes.array,
};

export default withRouter(Header);
