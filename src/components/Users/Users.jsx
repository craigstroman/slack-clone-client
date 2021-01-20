import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-dialog {
    .modal-content {
      width: 500px;
      .modal-header,
      .modal-title {
        text-align: center;
        width: 100%;
      }
      .modal-body {
        .user-list {
          list-style-type: none;
        }
      }
    }
  }
`;

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal = () => {
    const { handleCloseUsers } = this.props;
    handleCloseUsers();
  };

  render() {
    const { isOpen, teamName, users } = this.props;

    return (
      <>
        <StyledModal show={isOpen} onHide={this.handleCloseModal}>
          <Modal.Title>{teamName} Users</Modal.Title>
          <Modal.Body>
            <ul className="user-list">
              {users.map((el, i) => (
                <li key={el.uuid}>{el.username}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="light" onClick={() => this.handleCloseModal()}>
              Close
            </Button>
          </Modal.Footer>
        </StyledModal>
      </>
    );
  }
}

Users.defaultProps = {
  isOpen: false,
  teamName: '',
  users: [],
  handleCloseUsers: () => {},
};

Users.propTypes = {
  isOpen: PropTypes.bool,
  teamName: PropTypes.string,
  users: PropTypes.array,
  handleCloseUsers: PropTypes.func,
};

export default Users;
