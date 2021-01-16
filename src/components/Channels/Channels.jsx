import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Button } from '@material-ui/core';
import { ChannelsList, Wrapper } from '../../shared/styled/components/Channels/Channels';
import Themes from '../../shared/themes';

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectChannel = this.handleSelectChannel.bind(this);
  }

  handleSelectChannel = (e) => {
    const { selectItem, teamUUID, history } = this.props;
    const { currentTarget } = e;
    const uuid = currentTarget.getAttribute('uuid');

    history.push(`/dashboard/view/team/${teamUUID}/channel/${uuid}`);

    selectItem(e);
  };

  render() {
    const { channels, activeEl, teamId } = this.props;

    return (
      <ThemeProvider theme={Themes}>
        <>
          <Wrapper>
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
      </ThemeProvider>
    );
  }
}

Channels.defaultProps = {
  channels: [],
  activeEl: '',
  teamId: null,
  teamUUID: null,
  selectItem: () => {},
  history: {},
};

Channels.propTypes = {
  channels: PropTypes.array,
  activeEl: PropTypes.string,
  teamId: PropTypes.number,
  teamUUID: PropTypes.string,
  selectItem: PropTypes.func,
  history: PropTypes.object,
};

export default Channels;
