import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moment from 'react-moment';
import uniqid from 'uniqid';
import { ThemeProvider } from 'styled-components';
import {
  Message,
  MessageHeader,
  Wrapper,
} from '../../../shared/styled/components/Messages/ChannelMessages/ChannelMessages';
import Themes from '../../../shared/themes';
import UserProfile from '../../UserProfile/UserProfile';

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);

    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    const { channelId } = this.props;

    this.unsubscribe = this.subscribe(channelId);
  }

  componentDidUpdate(prevProps) {
    const { channelId } = this.props;

    if (channelId !== prevProps.channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Subscribes a user to a channel.
   *
   * @param      {String}  channelId  The channel identifier
   * @return     {Object}  The messages object.
   */
  subscribe = (channelId) => {
    const { data } = this.props;

    return data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,

          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });
  };

  render() {
    const {
      data: { loading, messages },
    } = this.props;

    if (loading || typeof messages === 'undefined') {
      return null;
    }

    return (
      <ThemeProvider theme={Themes}>
        <Wrapper>
          <ul>
            {messages.map((message, i) => {
              const { text, user } = message;
              const { username } = user;

              const calendarStrings = {
                lastDay: '[Yesterday at] LT',
                sameDay: '[Today at] LT',
                nextDay: '[Tomorrow at] LT',
                lastWeek: 'dddd [at] LT',
                nextWeek: 'dddd [at] LT',
                sameElse: 'L',
              };
              const createdAt = new Date(parseInt(message.createdAt, 10));

              return (
                <li key={`${uniqid()}`}>
                  <MessageHeader>
                    <UserProfile username={username} />
                    <div className="message-date-time">
                      <Moment calendar={calendarStrings}>{createdAt}</Moment>
                    </div>
                  </MessageHeader>
                  <Message>{text}</Message>
                </li>
              );
            })}
          </ul>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

const messagesQuery = gql`
  query messagesQuery($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

ChannelMessages.defaultProps = {
  channelId: null,
  data: {},
};

ChannelMessages.propTypes = {
  channelId: PropTypes.number,
  data: PropTypes.object,
};

export default graphql(messagesQuery, {
  variables: (props) => ({
    channelId: props.channelId,
  }),
  options: {
    fetchPolicy: 'network-only',
  },
})(ChannelMessages);
