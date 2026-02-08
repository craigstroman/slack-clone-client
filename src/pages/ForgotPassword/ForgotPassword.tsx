import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { IForgotPassword } from '../../shared/Interfaces';
import { useForgotPasswordMutation, useMeQuery } from '../../generated/graphql';
import './ForgotPassword.scss';

export const ForgotPassword: React.FC = () => {
  const [{ data }] = useMeQuery();
  const [complete, setComplete] = useState<boolean>(false);
  const [linkURL, setLinkURL] = useState<string>('');
  const initialValues: IForgotPassword = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email.').required('Email is required.'),
  });

  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword(values);
          setComplete(true);
          if (response && response.data) {
            console.log('response.data: ', response.data);
            setLinkURL(response.data.forgotPassword);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors }) => {
          if (complete) {
            return (
              <div className="content">
                <a href={linkURL}>Change Password</a>
              </div>
            );
          } else {
            return (
              <Form>
                <div className="form-row">
                  <InputField name="email" placeholder="Enter a email" fieldErrors={errors} type="email" />
                </div>
                <div className="form-row">
                  <button type="submit" className="button">
                    Send Email
                  </button>
                </div>
              </Form>
            );
          }
        }}
      </Formik>
    </div>
  );
};
