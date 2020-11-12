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
import styled, { ThemeProvider } from 'styled-components';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import StyledIcons from '../UI/Status/Status';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
import Modal from '../UI/Modal/Modal';

// TODO: Automatically show list of users for a team when a user clicks the faUserAlt icon in a modal dialog like Slack does
// then work on making the last_seen work to show if a user is active or not.

// TODO: Also change InvitePeople and Channels components to using modal component but keep components files so that code is still organized.

// TODO: Figure out why channel member table is empty and continue work on showing channel members like with Slack when you
// click on icon and show status of users to weather or not they are active.

// TODO: Look at old slack clone code to make sure I'm not missing anything on the server side that connects channel with members in the database.

// TODO: Figure out if I'm going to use React Material icons or Font Awesome for status icons and create a component within UI if using Font Awesome to organize it.

const Wrapper = styled.div`
  height: 10%;
  margin-left: 10px;
  margin-right: 10px;
`;

const ModalContent = styled.div`
  height: 400px;
  overflow: scroll-y;
  width: 500px;
  svg {
    font-size: inherit;
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
              {users.map((el, i) => (
                <>
                  <div key={uniqid()}>{el.username}</div>
                </>
              ))}
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
