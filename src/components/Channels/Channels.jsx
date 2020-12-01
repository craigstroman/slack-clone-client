import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ChannelsList, Heading, Wrapper } from '../../shared/styled/components/Channels/Channels';
import AddChannel from '../AddChannel/AddChannel';
import Themes from '../../shared/themes';

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addChannelModal: false,
    };

    this.handleOpenAddChannel = this.handleOpenAddChannel.bind(this);
    this.handleSelectChannel = this.handleSelectChannel.bind(this);
  }

  handleSelectChannel = (e) => {
    const { selectItem, teamUUID, history } = this.props;
    const { currentTarget } = e;
    const uuid = currentTarget.getAttribute('uuid');

    history.push(`/dashboard/view/team/${teamUUID}/channel/${uuid}`);

    selectItem(e);
  };

  handleOpenAddChannel = () => {
    this.setState({ addChannelModal: true });
  };

  handleCloseAddChannel = () => {
    this.setState({ addChannelModal: false });
  };

  render() {
    const { addChannelModal } = this.state;
    const { isOwner, channels, activeEl, teamId } = this.props;

    return (
      <ThemeProvider theme={Themes}>
        <>
          <Wrapper>
            <Heading>
              <h3>Channels</h3>
              {isOwner && (
                <IconButton onClick={() => this.handleOpenAddChannel()}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </IconButton>
              )}
            </Heading>
            <ChannelsList>
              {channels.map((el) => (
                <li
                  className={
                    activeEl === `${el.uuid}` ? 'channels-list__item selected' : 'channels-list__item'
                  }
                  id={el.uuid}
                  key={el.uuid}
                >
                  <Button
                    className="channel-item"
                    id={el.id}
                    uuid={el.uuid}
                    name={el.name}
                    teamid={teamId}
                    onClick={(e) => this.handleSelectChannel(e)}
                  >
                    #&nbsp;
                    {el.name}
                  </Button>
                </li>
              ))}
            </ChannelsList>
          </Wrapper>
        </>
        <>
          <AddChannel
            isOpen={addChannelModal}
            teamId={teamId}
            handleCloseAddChannel={() => this.handleCloseAddChannel()}
          />
        </>
      </ThemeProvider>
    );
  }
}

Channels.defaultProps = {
  isOwner: false,
  channels: [],
  activeEl: '',
  teamId: null,
  teamUUID: null,
  selectItem: () => {},
  history: {},
};

Channels.propTypes = {
  isOwner: PropTypes.bool,
  channels: PropTypes.array,
  activeEl: PropTypes.string,
  teamId: PropTypes.number,
  teamUUID: PropTypes.string,
  selectItem: PropTypes.func,
  history: PropTypes.object,
};

export default Channels;
