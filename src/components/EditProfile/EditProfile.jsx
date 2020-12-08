import React from 'react';
import PropTypes from 'prop-types';
import { Button, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { validatePhoneNumber } from '../../shared/util/utils';
import {
  StyledDialog,
  StyledTextField,
  Wrapper,
} from '../../shared/styled/components/EditProfile/EditProfile';

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
      <StyledDialog open={isOpen} maxWidth="md" fullWidth={true} onClose={this.handleClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <Wrapper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    label="First name"
                    type="text"
                    name="firstName"
                    autoComplete="firstName"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    onBlur={this.validateForm}
                    value={firstName || ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    label="Last name"
                    type="text"
                    name="lastName"
                    autoComplete="lastName"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    onBlur={this.validateForm}
                    value={lastName || ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    label="Display Name"
                    type="text"
                    name="username"
                    autoComplete="username"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    onBlur={this.validateForm}
                    error={!fieldErrors.username === false}
                    helperText={fieldErrors.username}
                    value={username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    onBlur={this.validateForm}
                    error={!fieldErrors.phoneNumber === false}
                    helperText={fieldErrors.phoneNumber}
                    value={phoneNumber || ''}
                  />
                </Grid>
              </Grid>
            </Wrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
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
