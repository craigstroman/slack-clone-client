import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { ThemeProvider } from 'styled-components';
import { validatePhoneNumber } from '../../shared/util/utils';
import Themes from '../../shared/themes';

const StyledModal = styled(Modal)`
  .modal-dialog {
    .modal-content {
      width: 600px;
      .modal-header,
      .modal-title {
        width: 100%;
      }
      .modal-body {
        .row {
          margin-bottom: 10px;
        }
      }
      .modal-footer {
        .cancel-button {
          color: ${(props) => props.theme.colors.black};
        }
      }
    }
  }
`;

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      username: '',
      fieldErrors: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    const { me } = this.props;
    const { id, firstName, lastName, phoneNumber, username } = me;

    this.setState({
      id,
      firstName,
      lastName,
      phoneNumber,
      username,
      fieldErrors: '',
    });
  };

  /**
   * Updates state when a value is entered in a field.
   *
   * @param      {Object}  e       The event object.
   */
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  /**
   * Validates the form.
   */
  validateForm = () => {
    const { phoneNumber, username } = this.state;
    const errors = {};

    if (username !== null && !username.length) {
      errors.username = 'Display name is required.';
    }

    if (phoneNumber !== null && phoneNumber.length) {
      if (!validatePhoneNumber(phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number.';
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

  handleSubmit = async (e) => {
    const { id, firstName, lastName, phoneNumber, username } = this.state;

    if (this.validateForm()) {
      const { client } = this.props;

      const response = await client.mutate({
        mutation: gql`
          mutation updateProfileMutation(
            $id: Int!
            $username: String!
            $firstName: String
            $lastName: String
            $phoneNumber: String
          ) {
            updateProfile(
              id: $id
              username: $username
              firstName: $firstName
              lastName: $lastName
              phoneNumber: $phoneNumber
            ) {
              ok
              errors {
                path
                message
              }
            }
          }
        `,
        variables: { id, username, firstName, lastName, phoneNumber },
      });

      const { ok, errors } = response.data.updateProfile;

      if (ok) {
        this.handleClose();
      } else if (errors) {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });

        this.setState(err);
      }
    }
  };

  /**
   * Closes the settings modal.
   *
   */
  handleClose = () => {
    const { handleCloseSettingsModal } = this.props;

    handleCloseSettingsModal();
  };

  render() {
    const { isOpen } = this.props;
    const { firstName, lastName, username, phoneNumber, fieldErrors } = this.state;

    return (
      <ThemeProvider theme={Themes}>
        <StyledModal show={isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {' '}
            <Row>
              <Col md={12}>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={(e) => this.handleChange(e)}
                  value={firstName || ''}
                  isInvalid={fieldErrors.channel}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={(e) => this.handleChange(e)}
                  value={lastName || ''}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Display name"
                  onChange={(e) => this.handleChange(e)}
                  value={username || ''}
                  isInvalid={fieldErrors.username}
                  required
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.username}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                  onChange={(e) => this.handleChange(e)}
                  value={phoneNumber || ''}
                  isInvalid={fieldErrors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.phoneNumber}</Form.Control.Feedback>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="outline-secondary"
              className="cancel-button"
              onClick={() => this.handleClose()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </StyledModal>
      </ThemeProvider>
    );
  }
}

EditProfile.defaultProps = {
  client: {},
  isOpen: false,
  handleCloseSettingsModal: () => {},
  me: {},
};

EditProfile.propTypes = {
  client: PropTypes.object,
  isOpen: PropTypes.bool,
  handleCloseSettingsModal: PropTypes.func,
  me: PropTypes.object,
};

export default withApollo(EditProfile);
