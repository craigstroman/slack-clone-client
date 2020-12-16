import React from 'react';
import PropTypes from 'prop-types';
import { Button, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { StyledDialog, StyledList, StyledTextLink, Wrapper } from '../../shared/styled/components/Teams';

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
    const { isOpen, me } = this.props;
    const { teams } = me;

    if (!isOpen) {
      return '';
    }

    return (
      <StyledDialog open={isOpen} maxWidth="md" fullWidth={true} onClose={this.handleClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogTitle id="form-dialog-title">Teams</DialogTitle>
          <DialogContent>
            <Wrapper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {teams.length >= 2 && (
                    <StyledList>
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
                    </StyledList>
                  )}
                  {teams.length === 1 && 'You only have one team created.'}
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
  me: {},
};

Teams.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseTeamsModal: PropTypes.func,
  me: PropTypes.object,
};

export default Teams;
