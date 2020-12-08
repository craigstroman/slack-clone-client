import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  h1 {
    text-align: center;
  }
  .MuiGrid-container {
    margin: 0 auto;
    text-align: center;
  }
`;
const StyledDialog = styled(Dialog)`
  .MuiDialogTitle-root {
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 1rem;
  }
  .MuiDialogActions-root {
    border-top: 1px solid #dee2e6;
    margin-top: 1rem;
  }
`;

class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Closes the settings modal.
   *
   */
  handleClose = () => {
    const { handleCloseTeamsModal } = this.props;

    handleCloseTeamsModal();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <StyledDialog open={isOpen} maxWidth="md" fullWidth={true} onClose={this.handleClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            <Wrapper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  Teams
                </Grid>
              </Grid>
            </Wrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()}>Close</Button>
          </DialogActions>
        </form>
      </StyledDialog>
    );
  }
}

Teams.defaultProps = {
  isOpen: false,
  handleCloseTeamsModal: () => {},
};

Teams.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseTeamsModal: PropTypes.func,
};

export default Teams;
