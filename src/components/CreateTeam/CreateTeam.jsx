import React from 'react';
import PropTypes from 'prop-types';
import { Button, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledDialog, StyledTextField, Wrapper } from '../../shared/styled/components/CreateTeam/CreateTeam';

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
   * Closes the settings modal.
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
      <StyledDialog open={isOpen} maxWidth="md" fullWidth={true} onClose={this.handleClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogTitle id="form-dialog-title">Create Team</DialogTitle>
          <DialogContent>
            <Wrapper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    label="Team Name *"
                    type="text"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => this.handleChange(e)}
                    onBlur={this.validateForm}
                    error={!fieldErrors.name === false}
                    helperText={fieldErrors.name}
                    value={name}
                  />
                </Grid>
              </Grid>
            </Wrapper>
          </DialogContent>
          <DialogActions>
            <Button type="button" variant="contained" color="primary" onClick={this.handleSubmit}>
              Create Team
            </Button>
            <Button onClick={() => this.handleClose()}>Close</Button>
          </DialogActions>
        </form>
      </StyledDialog>
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
