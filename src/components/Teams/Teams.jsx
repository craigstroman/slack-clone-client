import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import meQuery from '../../shared/queries/team';

const StyledModal = styled(Modal)`
  .modal-dialog {
    .modal-content {
      width: 600px;
      .modal-header,
      .modal-title {
        width: 100%;
      }
      .modal-body {
        ul {
          list-style-type: none;
        }
      }
    }
  }
`;

const StyledTextLink = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.black};
    text-decoration: underline;
  }
`;

class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Closes the teams modal.
   *
   */
  handleClose = () => {
    const { handleCloseTeamsModal } = this.props;

    handleCloseTeamsModal();
  };

  render() {
    const { isOpen, me } = this.props;
    const { teams } = me;

    if (!isOpen) {
      return '';
    }

    return (
      <StyledModal show={isOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {teams.length >= 2 && (
            <ul>
              {teams.map((el) => {
                const { uuid, name, channels, id } = el;
                const channel = channels[0];

                return (
                  <li key={`${uuid}-${id}`}>
                    <StyledTextLink
                      to={`/dashboard/view/team/${uuid}/channel/${channel.uuid}`}
                      onClick={this.handleClose}
                    >
                      {name}
                    </StyledTextLink>
                  </li>
                );
              })}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="light" onClick={() => this.handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </StyledModal>
    );
  }
}

Teams.defaultProps = {
  isOpen: false,
  handleCloseTeamsModal: () => {},
  me: {},
};

Teams.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseTeamsModal: PropTypes.func,
  me: PropTypes.object,
};

export default Teams;
