import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Wrapper from '../../shared/styled/components/PopUpMenu/PopUpMenu';
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
    const { isOwner, me, refetch } = this.props;
    const { firstName, lastName } = me;
    const userInitials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

    return (
      <>
        <ThemeProvider theme={Themes}>
          <Wrapper className="wrapper">
            <Dropdown>
              <Dropdown.Toggle variant="light">
                <div className="user-icon">{userInitials}</div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button onClick={() => this.handleModal('create-team', true)} variant="link">
                    Create a Team
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button onClick={() => this.handleModal('teams', true)} variant="link">
                    Teams
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button onClick={() => this.handleModal('settings', true)} variant="link">
                    Edit Profile
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button onClick={this.logout} variant="link">
                    Logout
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
  isOwner: false,
};

PopUpMenu.propTypes = {
  history: PropTypes.object,
  me: PropTypes.object,
  refetch: PropTypes.func,
  isOwner: PropTypes.bool,
};

export default withRouter(PopUpMenu);
