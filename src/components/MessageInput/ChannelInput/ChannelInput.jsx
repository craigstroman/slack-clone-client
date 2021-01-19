import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { TextField } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import gql from 'graphql-tag';
import Themes from '../../../shared/themes';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

class ChannelInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isSubmiting: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Updates the state on input change.
   *
   * @param      {Object}  e       The event object.
   */
  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'message') {
      this.setState({
        message: value,
      });
    }
  };

  /**
   * Submits the form.
   *
   */
  handleSubmit = async () => {
    const { message } = this.state;
    const { mutate, channelId } = this.props;

    if (!message) {
      this.setState({ isSubmiting: false });
      return;
    }

    await mutate({
      variables: { channelId, text: message },
    });

    this.setState({ message: '' });
  };

  render() {
    const { channels, classes, match } = this.props;
    const { params } = match;
    const { channelId } = params;
    const { message, isSubmiting } = this.state;
    const channel = channels.filter((el) => el.uuid === channelId);
    const { name } = channel[0];

    return (
      <ThemeProvider theme={Themes}>
        <Wrapper>
          <Form.Control
            type="text"
            name="message"
            autoComplete="off"
            placeholder={`Message #${name}`}
            value={message}
            onChange={(e) => this.handleChange(e)}
            onKeyUp={(e) => {
              if (e.keyCode === 13 && !isSubmiting) {
                this.handleSubmit();
              }
            }}
          />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

ChannelInput.defaultProps = {
  channelId: 0,
  channels: [],
  classes: {},
  match: {},
  mutate: () => {},
};

ChannelInput.propTypes = {
  channelId: PropTypes.number,
  channels: PropTypes.array,
  classes: PropTypes.object,
  match: PropTypes.object,
  mutate: PropTypes.func,
};

export default graphql(createMessageMutation)(ChannelInput);
