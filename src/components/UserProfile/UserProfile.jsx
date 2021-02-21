import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Button, Overlay } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import userQuery from '../../shared/queries/getUserByName';
import Themes from '../../shared/themes';
import StyledPopOver from '../../shared/styled/components/UserProfile/UserProfile';
import UserStatus from '../UserStatus/UserStatus';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      target: '',
      userInfo: {},
    };
    this.togglePopover = this.togglePopover.bind(this);
    this.lookUpUser = this.lookUpUser.bind(this);
    this.handleCallNumber = this.handleCallNumber.bind(this);
  }

  componentDidMount = () => {
    this.lookUpUser();
  };

  lookUpUser = async () => {
    const { client, username } = this.props;

    const res = await client.query({
      query: userQuery,
      variables: { username },
    });

    const { data } = res;
    const { getUserByName } = data;

    this.setState({ userInfo: getUserByName });
  };

  togglePopover = (e) => {
    const { show } = this.state;
    const { target } = e;

    this.setState({ show: !show, target });
  };

  handleCallNumber = (num) => {
    window.open(`tel:${num}`, '_self');
  };

  render() {
    const { show, target, userInfo } = this.state;
    const { username } = this.props;
    const { firstName, lastName, email, phoneNumber } = userInfo;

    return (
      <ThemeProvider theme={Themes}>
        <Button type="button" variant="link" onClick={this.togglePopover}>
          <h3>{username}</h3>
        </Button>
        <Overlay
          rootClose={show}
          rootCloseEvent="click"
          onHide={this.togglePopover}
          show={show}
          target={target}
          placement="right"
        >
          <StyledPopOver id="popover-contained" title="User Profile">
            <header>
              <FontAwesomeIcon icon={faUserAlt} size="10x" />
            </header>
            <main>
              <div className="user-name">
                <h3>
                  {firstName} {lastName}
                </h3>
                <UserStatus status="online" size="small" />
              </div>
              <div className="user-email">
                <h5>
                  <a href={`mailto:${email}`}>{email}</a>
                </h5>
              </div>
            </main>
            <footer>
              <Button type="button" variant="outline-dark" onClick={() => this.handleCallNumber(phoneNumber)}>
                Call
              </Button>
            </footer>
          </StyledPopOver>
        </Overlay>
      </ThemeProvider>
    );
  }
}

UserProfile.defaultProps = {
  client: {},
  username: '',
};

UserProfile.propTypes = {
  client: PropTypes.object,
  username: PropTypes.string,
};

export default withApollo(UserProfile);
