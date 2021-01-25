import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';
import gql from 'graphql-tag';
import Themes from '../../shared/themes';

const StyledModal = styled(Modal)`
  .modal-dialog {
    .modal-content {
      width: 600px;
      .modal-header,
      .modal-title {
        width: 100%;
      }
      .modal-footer {
        .cancel-button {
          color: ${(props) => props.theme.colors.black};
        }
      }
    }
  }
`;

class CreateTeams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      fieldErrors: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  /**
   * Validates the form.
   *
   * @return     {boolean}  The result of the form validation.
   */
  validateForm = () => {
    const { name } = this.state;
    const errors = {};

    if (!name.length) {
      errors.name = 'Team name is required.';
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
   * Updates the form field.
   *
   * @param      {Object}  e       The event object.
   */
  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ name: value });
  };

  /**
   * Closes the create team modal.
   *
   */
  handleClose = () => {
    const { handleCloseCreateTeamModal } = this.props;

    handleCloseCreateTeamModal();
  };

  /**
   * Submits the team name.
   */
  handleSubmit = async () => {
    const { name } = this.state;
    const { refetch } = this.props;
    let response = null;

    if (this.validateForm()) {
      const { mutate } = this.props;

      try {
        response = await mutate({ variables: { name } });
        refetch();

        this.setState({ name: '' });
      } catch (err) {
        this.handleClose();
      }

      const { ok, errors } = response.data.createTeam;

      if (ok) {
        this.handleClose();
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });

        this.errors = err;
      }
    }
  };

  render() {
    const { name, fieldErrors } = this.state;
    const { isOpen } = this.props;

    return (
      <>
        <ThemeProvider theme={Themes}>
          <StyledModal show={isOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Team</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Enter a channel name.</div>
              <Form.Control
                type="text"
                name="name"
                placeholder="Team Name *"
                onChange={(e) => this.handleChange(e)}
                value={name}
                isInvalid={fieldErrors.name}
                required
              />
              <Form.Control.Feedback type="invalid">{fieldErrors.name}</Form.Control.Feedback>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-secondary"
                className="cancel-button"
                onClick={() => this.handleClose()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={!fieldErrors.channel && name.length ? 'success' : 'secondary'}
                onClick={this.handleSubmit}
              >
                Create Team
              </Button>
            </Modal.Footer>
          </StyledModal>
        </ThemeProvider>
      </>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
        uuid
      }
      errors {
        path
        message
      }
      channelUUID
    }
  }
`;

CreateTeams.defaultProps = {
  isOpen: false,
  handleCloseCreateTeamModal: () => {},
  mutate: () => {},
  refetch: () => {},
};

CreateTeams.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseCreateTeamModal: PropTypes.func,
  mutate: PropTypes.func,
  refetch: PropTypes.func,
};

export default graphql(createTeamMutation)(CreateTeams);
