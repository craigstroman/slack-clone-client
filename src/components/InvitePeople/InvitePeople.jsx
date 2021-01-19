import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import normalizeErrors from '../../shared/util/normalizeErrors';
import { validateEmail } from '../../shared/util/utils';

const StyledModal = styled(Modal)`
  .modal-dialog {
    .modal-content {
      width: 600px;
      .modal-header,
      .modal-title {
        width: 100%;
      }
    }
  }
`;

class InvitePeople extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fieldErrors: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Sets the state on input change.
   *
   * @param      {Object}  e       The event object.
   */
  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (value.length) {
        this.setState({
          email: value,
        });
      } else {
        this.setState({
          email: '',
        });
      }
    }
  };

  /**
   * Validates the form.
   *
   * @return     {boolean}  The result of validating the form.
   */
  validateForm = () => {
    const { email } = this.state;
    const errors = {};

    if (!email.length) {
      errors.email = 'Email is required.';
    } else if (email.length) {
      if (!validateEmail(email)) {
        errors.email = 'Invalid email.';
      }
    }

    if (Object.keys(errors).length >= 1) {
      this.setState({
        fieldErrors: errors,
      });

      return false;
    }

    this.setState({
      fieldErrors: errors,
    });

    return true;
  };

  /**
   * Submits the form.
   *
   */
  handleSubmit = async () => {
    const { email } = this.state;
    const { mutate, teamId, handleCloseInvitePeople } = this.props;

    if (this.validateForm()) {
      const response = await mutate({ variables: { teamId, email } });

      const { ok, errors } = response.data.addTeamMember;

      if (ok) {
        handleCloseInvitePeople();
      } else if (errors) {
        const err = normalizeErrors(errors);

        this.setState({
          fieldErrors: err.email[0],
        });
      }
    }
  };

  /**
   * Closes the invite people modal.
   *
   */
  handleClose = () => {
    const { handleCloseInvitePeople } = this.props;

    this.setState({
      email: '',
      fieldErrors: '',
    });

    handleCloseInvitePeople();
  };

  render() {
    const { isOpen } = this.props;
    const { email, fieldErrors } = this.state;

    return (
      <>
        <StyledModal show={isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add People to your Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Invite a person to your team by entering their email address.</div>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => this.handleChange(e)}
              value={email}
              isInvalid={fieldErrors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="light" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={!fieldErrors.email && email.length ? 'success' : 'secondary'}
              onClick={this.handleSubmit}
            >
              Invite Person
            </Button>
          </Modal.Footer>
        </StyledModal>
      </>
    );
  }
}

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

InvitePeople.defaultProps = {
  isOpen: false,
  handleCloseInvitePeople: () => {},
  mutate: () => {},
  teamId: 0,
};

InvitePeople.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseInvitePeople: PropTypes.func,
  mutate: PropTypes.func,
  teamId: PropTypes.number,
};

export default graphql(addTeamMemberMutation)(InvitePeople);
