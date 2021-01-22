import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';
import gql from 'graphql-tag';
import Themes from '../../../shared/themes';
import PopUpMenu from '../../../components/PopUpMenu/PopUpMenu';
import Wrapper from '../../../shared/styled/pages/Teams/CreateTeam/CreateTeam';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      fieldErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  /**
   * Validates the form.
   *
   * @return     {boolean}  The result of the form validation.
   */
  validateForm = () => {
    const { name } = this.state;
    const errors = {};

    if (!name.length) {
      errors.name = 'Team name is required.';
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

  /**
   * Updates the form field.
   *
   * @param      {Object}  e       The event object.
   */
  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ name: value });
  };

  /**
   * Submits the team name.
   */
  handleSubmit = async () => {
    const { name } = this.state;
    let response = null;

    if (this.validateForm()) {
      const { mutate, history } = this.props;

      try {
        response = await mutate({ variables: { name } });
      } catch (err) {
        history.push('/login');
      }

      const { ok, errors, team, channelUUID } = response.data.createTeam;

      if (ok) {
        history.push(`/dashboard/view/team/${team.uuid}/channel/${channelUUID}`);
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });

        this.errors = err;
      }
    }
  };

  render() {
    const { history } = this.props;
    const { name, fieldErrors } = this.state;

    return (
      <ThemeProvider theme={Themes}>
        <Wrapper>
          <header>
            <Row>
              <Col md={12} className="header-text">
                <h1>Slack Clone - Create A Team</h1>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="pop-up-menu">
                <PopUpMenu history={history} />
              </Col>
            </Row>
          </header>
          <main>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Row>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => this.handleChange(e)}
                    isInvalid={fieldErrors.name}
                  />
                  <Form.Control.Feedback>{fieldErrors.name}</Form.Control.Feedback>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Button type="button" variant="primary" onClick={this.handleSubmit}>
                    Create Team
                  </Button>
                </Col>
              </Row>
            </Form>
          </main>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
        uuid
      }
      errors {
        path
        message
      }
      channelUUID
    }
  }
`;

CreateTeam.defaultProps = {
  history: {},
  mutate: () => {},
};

CreateTeam.propTypes = {
  history: PropTypes.object,
  mutate: PropTypes.func,
};

export default graphql(createTeamMutation)(CreateTeam);
