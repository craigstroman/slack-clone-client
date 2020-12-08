import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { StyledMenu, StyledTextLink, Wrapper } from '../../shared/styled/components/PopUpMenu/PopUpMenu';
import EditProfile from '../EditProfile/EditProfile';
import Themes from '../../shared/themes';

class PopUpMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      settingsModal: false,
    };

    this.logout = this.logout.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleOpenSettingsModal = this.handleOpenSettingsModal.bind(this);
    this.handleCloseSettingsModal = this.handleCloseSettingsModal.bind(this);
  }

  handleOpenMenu = (e) => {
    const { currentTarget } = e;

    this.setState({
      anchorEl: currentTarget,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleOpenSettingsModal = () => {
    this.setState({ settingsModal: true });
  };

  handleCloseSettingsModal = () => {
    this.setState({ settingsModal: false });
  };

  logout = () => {
    const { history } = this.props;

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');

    history.push('/');
  };

  render() {
    const { anchorEl, settingsModal } = this.state;
    const { me } = this.props;

    return (
      <>
        <ThemeProvider theme={Themes}>
          <Wrapper className="wrapper">
            <Button
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={(e) => this.handleOpenMenu(e)}
            >
              <FontAwesomeIcon icon={faCog} className="settings-icon" />
            </Button>
            <StyledMenu
              id="settings-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleCloseMenu}
            >
              <MenuItem className="settings-menu__item" onClick={this.handleCloseMenu}>
                <StyledTextLink to="/teams">Teams</StyledTextLink>
              </MenuItem>
              <MenuItem className="settings-menu__item" onClick={this.handleCloseMenu}>
                <Button onClick={this.handleOpenSettingsModal}>Edit Profile</Button>
              </MenuItem>
              <MenuItem className="settings-menu__item" onClick={this.handleCloseMenu}>
                <Button onClick={this.logout}>Logout</Button>
              </MenuItem>
            </StyledMenu>
          </Wrapper>
        </ThemeProvider>
        <EditProfile
          isOpen={settingsModal}
          handleCloseSettingsModal={() => this.handleCloseSettingsModal()}
          me={me}
        />
      </>
    );
  }
}

PopUpMenu.defaultProps = {
  history: {},
  me: {},
};

PopUpMenu.propTypes = {
  history: PropTypes.object,
  me: PropTypes.object,
};

export default withRouter(PopUpMenu);
