import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
import Users from '../Users/Users';

const Wrapper = styled.div`
  height: 10%;
  margin-left: 10px;
  margin-right: 10px;
  .header__users {
    position: relative;
    button {
      position: absolute;
      bottom: 5px;
    }
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    const { showUserModal } = this.state;

    if (showUserModal) {
      this.setState({ showUserModal: false });
    } else {
      this.setState({ showUserModal: true });
    }
  };

  render() {
    const { showUserModal } = this.state;
    const { channels, isOwner, match, me, teamName, users, refetch } = this.props;
    const token = jwt.decode(localStorage.getItem('token'));
    let title = '';

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
        <Row>
          <Col md={12}>
            <h3>{title}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="header__users">
            {match.params.channelId && (
              <Button type="button" variant="light" onClick={this.toggleModal}>
                <FontAwesomeIcon icon={faUserAlt} />
              </Button>
            )}
          </Col>
          <Col md={6} style={{ textAlign: 'right' }}>
            <PopUpMenu me={me} refetch={refetch} isOwner={isOwner} />
          </Col>
        </Row>
        <Users isOpen={showUserModal} teamName={teamName} users={users} handleCloseUsers={this.toggleModal} />
      </Wrapper>
    );
  }
}

Header.defaultProps = {
  match: {},
  teamName: '',
  channels: [],
  users: [],
  me: {},
  refetch: () => {},
  isOwner: false,
};

Header.propTypes = {
  match: PropTypes.object,
  teamName: PropTypes.string,
  channels: PropTypes.array,
  users: PropTypes.array,
  me: PropTypes.object,
  refetch: PropTypes.func,
  isOwner: PropTypes.bool,
};

export default withRouter(Header);
