import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Header, Content } from '../../shared/styled/pages/Register/Register';
import { validateEmail, validatePhoneNumber } from '../../shared/util/utils';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
      fieldErrors: '',
      usernameVerified: false,
      emailVerified: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  /**
   * Updates state when a value is entered in a field.
   *
   * @param      {Object}  e       The event object.
   */
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  /**
   * Checks wether or not a email is alredy registered.
   *
   * @param      {Object}  e      The event object.
   */
  verifyEmail = async (e) => {
    const { target } = e;
    const { value } = target;
    const { client } = this.props;

    if (value.length) {
      try {
        const res = await client.query({
          query: gql`
            query($email: String) {
              verifyEmail(email: $email)
            }
          `,
          variables: {
            email: value,
          },
        });
        const { data } = res;
        const { verifyEmail } = data;

        if (verifyEmail) {
          this.setState({ emailVerified: true });

          this.validateForm();
        } else if (!verifyEmail) {
          this.setState({
            emailVerified: false,
          });

          this.validateForm();
        }
      } catch (err) {
        console.log(`There was an error: ${err}`);
      }
    }
  };

  /**
   * Checks wether or not a username is already registered.
   *
   * @param      {Object}  e     The event object.
   */
  verifyUser = async (e) => {
    const { target } = e;
    const { value } = target;
    const { client } = this.props;

    if (value.length) {
      try {
        const res = await client.query({
          query: gql`
            query($username: String) {
              verifyUser(username: $username)
            }
          `,
          variables: {
            username: value,
          },
        });

        const { data } = res;
        const { verifyUser } = data;

        if (verifyUser) {
          this.setState({ usernameVerified: true });

          this.validateForm();
        } else {
          this.setState({ usernameVerified: false });

          this.validateForm();
        }
      } catch (err) {
        console.log(`There was an error: ${err}`);
      }
    }
  };

  /**
   * Validates the form.
   *
   * @return     {Boolean}  Indicates if the form is valid or invalid.
   */
  validateForm = () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      username,
      password,
      passwordConfirmation,
      emailVerified,
      usernameVerified,
    } = this.state;
    const errors = {};

    if (!firstName.length) {
      errors.firstName = 'First name is required.';
    }

    if (!lastName.length) {
      errors.lastName = 'Last name is required.';
    }

    if (!phoneNumber.length) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid.';
    }

    if (!email.length) {
      errors.email = 'Email is required.';
    } else if (email.length) {
      if (!validateEmail(email)) {
        errors.email = 'Email invalid or or already taken.';
      } else if (emailVerified) {
        errors.email = 'Email invalid or or already taken.';
      }
    }

    if (!username.length) {
      errors.username = 'Username is required.';
    } else if (username.length < 3) {
      errors.username = 'The username needs to be between 3 and 25 characters long.';
    } else if (usernameVerified) {
      errors.username = `Username ${username} is not available.`;
    }

    if (!password.length) {
      errors.password = 'Password is required.';
    } else if (password.length) {
      if (password.length < 5) {
        errors.password = 'Password needs to be greater then 5 characters long.';
      } else if (password.length && password.length >= 5) {
        if (password !== passwordConfirmation) {
          errors.passwordConfirmation = 'Password and Password Confirmation must match.';
        }
      }
    }

    if (!passwordConfirmation.length) {
      errors.passwordConfirmation = 'Password confirmation is required.';
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
   * Submits the registration.
   *
   * @param      {Object}  e       The event object.
   */
  handleSubmit = async (e) => {
    const { firstName, lastName, phoneNumber, username, email, password } = this.state;

    if (this.validateForm()) {
      const { client } = this.props;

      const response = await client.mutate({
        mutation: gql`
          mutation(
            $firstName: String!
            $lastName: String!
            $phoneNumber: String!
            $username: String!
            $email: String!
            $password: String!
          ) {
            register(
              firstName: $firstName
              lastName: $lastName
              phoneNumber: $phoneNumber
              username: $username
              email: $email
              password: $password
            ) {
              ok
              errors {
                path
                message
              }
            }
          }
        `,
        variables: { firstName, lastName, phoneNumber, username, email, password },
      });

      const { ok, errors } = response.data.register;

      if (ok) {
        const { history } = this.props;

        history.push('/');
      } else if (errors) {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });

        this.setState(err);
      }
    }
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      passwordConfirmation,
      fieldErrors,
      usernameVerified,
      emailVerified,
    } = this.state;

    return (
      <Container>
        <Header>
          <Row>
            <Col md={12}>
              <h1>Slack Clone - Register</h1>
              <hr />
            </Col>
          </Row>
        </Header>
        <Content>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={firstName}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={!fieldErrors.firstName === false}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.firstName}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={lastName}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={!fieldErrors.lastName === false}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.lastName}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number *"
                  value={phoneNumber}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={!fieldErrors.phoneNumber === false}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.phoneNumber}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={email}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={!fieldErrors.email === false || emailVerified === true}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username *"
                  value={username}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={!fieldErrors.username === false || usernameVerified === true}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.username}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={password}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={!fieldErrors.password === false}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.password}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password Confirmation *"
                  value={passwordConfirmation}
                  required
                  onChange={(e) => this.handleChange(e)}
                  onBlur={this.validateForm}
                  isInvalid={fieldErrors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.passwordConfirmation}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Content>
      </Container>
    );
  }
}

Register.defaultProps = {
  client: {},
  history: {},
};

Register.propTypes = {
  client: PropTypes.object,
  history: PropTypes.object,
};

export default withApollo(Register);
