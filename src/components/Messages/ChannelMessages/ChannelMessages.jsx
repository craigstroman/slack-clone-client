import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moment from 'react-moment';
import uniqid from 'uniqid';
import styled, { ThemeProvider } from 'styled-components';
import Themes from '../../../shared/themes';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column-reverse;
  height: 89vh;
  overflow-y: scroll;
  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    li {
      margin-bottom: 10px;
      padding-left: 10px;
    }
  }
`;
const MessageHeader = styled.header`
  display: block;
  width: 100%;
  h3 {
    display: inline-block;
    font-weight: bold;
    margin-right: 20px;
    text-align: left;
  }
  div {
    color: ${(props) => props.theme.colors.scorpion};
    display: inline-block;
    font-size: 0.875em;
  }
`;

const Message = styled.div`
  display: block;
  text-align: left;
  width: 100%;
`;

const ChannelMessages = (props) => {
  const {
    data: { loading, messages },
  } = props;

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
                  <h3>{username}</h3>
                  <div>
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
};

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
  // channelId: null,
  data: {},
};

ChannelMessages.propTypes = {
  // channelId: PropTypes.number,
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
