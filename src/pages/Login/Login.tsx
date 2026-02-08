import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../../generated/graphql';
import { ILoginValues } from '../../shared/Interfaces';
import { InputField } from '../../components/InputField/InputField';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';

import './Login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<string>('password');
  const [, executeLoginResult] = useLoginMutation();

  const initialValues: ILoginValues = {
    usernameOrEmail: '',
    password: '',
  };

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
  });

  const handleToggleData = (data: string) => {
    setFieldType(data);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn]);

  return (
    <div className="login-container">
      <header>
        <h1>Slack Clone Login</h1>
        <hr />
      </header>
      {errorMessage && errorMessage.length && <div className="form-error">{errorMessage}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await executeLoginResult({
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
          });

          if (response.data?.login.errors) {
            setErrorMessage(response.data?.login.errors[0].message);
          } else if (response.data?.login.user?.id) {
            setLoggedIn(true);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, submitForm }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField
                  name="usernameOrEmail"
                  placeholder="Enter a username or email"
                  fieldErrors={errors}
                />
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={fieldType}
                  />
                  <TogglePassword errors={errors} onSendValue={handleToggleData} />
                </div>
              </div>
              <div className="form-row">
                <button type="submit" className="button" onClick={submitForm}>
                  Login
                </button>
              </div>
              <div className="form-row">
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
              </div>
              <div className="form-row">
                Not a registered user?
                <a href="/register" className="register-link">
                  Sign Up
                </a>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
