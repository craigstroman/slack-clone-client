import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button, MenuItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { StyledTextLink, StyledMenu } from '../../shared/styled/components/PopUpMenu/PopUpMenu';
import Themes from '../../shared/themes';

class PopUpMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.logout = this.logout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = (e) => {
    const { currentTarget } = e;

    this.setState({
      anchorEl: currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  logout = () => {
    const { history } = this.props;

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');

    history.push('/');
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <>
        <ThemeProvider theme={Themes}>
          <Button aria-controls="settings-menu" aria-haspopup="true" onClick={(e) => this.handleOpen(e)}>
            <FontAwesomeIcon icon={faCog} className="settings-icon" />
          </Button>
          <StyledMenu
            id="settings-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <StyledTextLink to="/teams">Teams</StyledTextLink>
            </MenuItem>
            <MenuItem onClick={this.logout}>
              <StyledTextLink to="/">Logout</StyledTextLink>
            </MenuItem>
          </StyledMenu>
        </ThemeProvider>
      </>
    );
  }
}

PopUpMenu.defaultProps = {
  history: {},
};

PopUpMenu.propTypes = {
  history: PropTypes.object,
};

export default withRouter(PopUpMenu);
