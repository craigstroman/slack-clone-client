import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Button, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import gql from 'graphql-tag';
import meQuery from '../../shared/queries/team';

const StyledModal = styled(Modal)`
  .modal-dialog {
    .modal-content {
      width: 600px;
      .modal-header,
      .modal-title {
        width: 100%;
      }
    }
  }
`;

class AddChannel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: '',
      fieldErrors: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (value.length) {
        this.setState({
          channelName: value,
        });
      } else {
        this.setState({
          channelName: '',
        });
      }
    }
  };

  validateForm = () => {
    const { channelName } = this.state;
    const errors = {};

    if (!channelName.length) {
      errors.channel = 'Channel name is required.';
    }

    if (Object.keys(errors).length >= 1) {
      this.setState({
        fieldErrors: errors,
      });

      return false;
    }

    this.setState({
      fieldErrors: errors,
    });

    return true;
  };

  handleSubmit = async () => {
    const { channelName } = this.state;
    const { mutate, teamId } = this.props;

    if (this.validateForm()) {
      await mutate({
        variables: { teamId, name: channelName },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              uuid: -1,
              name: channelName,
            },
          },
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;

          if (!ok) {
            return;
          }

          const data = store.readQuery({ query: meQuery });
          const teamIdx = data.me.teams.findIndex((el) => el.id === teamId);

          data.me.teams[teamIdx].channels.push(channel);

          store.writeQuery({ query: meQuery, data });
        },
      });

      this.handleClose();
    }
  };

  handleClose = () => {
    const { handleCloseAddChannel } = this.props;

    this.setState({ channelName: '', fieldErrors: '' });

    handleCloseAddChannel();
  };

  render() {
    const { isOpen } = this.props;
    const { channelName, fieldErrors } = this.state;

    return (
      <>
        <StyledModal show={isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Enter a channel name.</div>
            <Form.Control
              type="text"
              name="name"
              placeholder="# e.g. Leads"
              onChange={(e) => this.handleChange(e)}
              value={channelName}
              isInvalid={fieldErrors.channel}
              required
            />
            <Form.Control.Feedback type="invalid">{fieldErrors.channel}</Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="light" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={!fieldErrors.channel && channelName.length ? 'success' : 'secondary'}
              onClick={this.handleSubmit}
            >
              Create Channel
            </Button>
          </Modal.Footer>
        </StyledModal>
      </>
    );
  }
}

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        uuid
        name
      }
    }
  }
`;

AddChannel.defaultProps = {
  isOpen: false,
  teamId: null,
  handleCloseAddChannel: () => {},
  mutate: () => {},
};

AddChannel.propTypes = {
  isOpen: PropTypes.bool,
  teamId: PropTypes.number,
  handleCloseAddChannel: PropTypes.func,
  mutate: PropTypes.func,
};

export default graphql(createChannelMutation)(AddChannel);
