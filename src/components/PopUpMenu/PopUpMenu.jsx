import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { StyledMenu, Wrapper } from '../../shared/styled/components/PopUpMenu/PopUpMenu';
import Teams from '../Teams/Teams';
import EditProfile from '../EditProfile/EditProfile';
import CreateTeam from '../CreateTeam/CreateTeam';
import Themes from '../../shared/themes';

class PopUpMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      settingsModal: false,
      teamsModal: false,
      createTeams: false,
    };

    this.logout = this.logout.bind(this);
    this.handleShowCreateTeam = this.handleShowCreateTeam.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleMenu = (e, status) => {
    const { currentTarget } = e;

    if (status === 'open') {
      this.setState({
        anchorEl: currentTarget,
      });
    } else if (status === 'close') {
      this.setState({
        anchorEl: null,
      });
    }
  };

  handleModal = (type, status) => {
    if (type === 'teams') {
      this.setState({ teamsModal: status });
    } else if (type === 'settings') {
      this.setState({ settingsModal: status });
    } else if (type === 'create-team') {
      this.setState({ createTeams: status });
    }
  };

  handleShowCreateTeam = () => {
    const { history } = this.props;

    history.push('/create-team');
  };

  logout = () => {
    const { history } = this.props;

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');

    history.push('/');
  };

  render() {
    const { anchorEl, settingsModal, teamsModal, createTeams } = this.state;
    const { me, refetch } = this.props;

    console.log('this.props: ', this.props);

    return (
      <>
        <ThemeProvider theme={Themes}>
          <Wrapper className="wrapper">
            <Button
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={(e) => this.handleMenu(e, 'open')}
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
              <MenuItem className="settings-menu__item" onClick={(e) => this.handleMenu(e, 'close')}>
                <Button onClick={() => this.handleModal('create-team', true)}>Create a Team</Button>
              </MenuItem>
              <MenuItem className="settings-menu__item" onClick={(e) => this.handleMenu(e, 'close')}>
                <Button onClick={() => this.handleModal('teams', true)}>Teams</Button>
              </MenuItem>
              <MenuItem className="settings-menu__item" onClick={(e) => this.handleMenu(e, 'close')}>
                <Button onClick={() => this.handleModal('settings', true)}>Edit Profile</Button>
              </MenuItem>
              <MenuItem className="settings-menu__item" onClick={(e) => this.handleMenu(e, 'close')}>
                <Button onClick={this.logout}>Logout</Button>
              </MenuItem>
            </StyledMenu>
          </Wrapper>
        </ThemeProvider>
        <EditProfile
          isOpen={settingsModal}
          handleCloseSettingsModal={() => this.handleModal('settings', false)}
          me={me}
        />
        <Teams isOpen={teamsModal} handleCloseTeamsModal={() => this.handleModal('teams', false)} me={me} />
        <CreateTeam
          isOpen={createTeams}
          handleCloseCreateTeamModal={() => this.handleModal('create-team', false)}
          refetch={refetch}
        />
      </>
    );
  }
}

PopUpMenu.defaultProps = {
  history: {},
  me: {},
  refetch: () => {},
};

PopUpMenu.propTypes = {
  history: PropTypes.object,
  me: PropTypes.object,
  refetch: PropTypes.func,
};

export default withRouter(PopUpMenu);
