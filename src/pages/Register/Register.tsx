import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputFIeld/InputField';
import { IRegisterFormValues } from '../../shared/Interfaces';
import { useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../shared/utils/toErrorMap';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';
import './Register.scss';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [, register] = useRegisterMutation();
  const [passwordFieldType, setPasswordFieldType] = useState<string>('password');
  const [passwordConfirmationFieldType, setPasswordConfirmationFieldType] = useState<string>('password');
  const initialValues: IRegisterFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required.'),
    last_name: Yup.string().required('Last name is required.'),
    email: Yup.string().email('Enter a valid email.').required('Email is required.'),
    username: Yup.string().required('Username is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters long.')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, 'Password must special characters.'),
    password_confirmation: Yup.string()
      .required('Password confirmation is required.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const formatPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D+/g, '').substring(0, 10);
    const areaCode = digits.substring(0, 3);
    const prefix = digits.substring(3, 6);
    const suffix = digits.substring(6, 10);

    if (digits.length > 6) {
      e.target.value = `(${areaCode}) ${prefix} - ${suffix}`;
    } else if (digits.length > 3) {
      e.target.value = `(${areaCode}) ${prefix}`;
    } else if (digits.length > 0) {
      e.target.value = `(${areaCode}`;
    }
  };

  const handleToggleData = (fieldName: string) => {
    if (fieldName === 'password') {
      if (passwordFieldType === 'password') {
        setPasswordFieldType('text');
      } else {
        setPasswordFieldType('password');
      }
    } else if (fieldName === 'password_confirmation') {
      if (passwordConfirmationFieldType === 'password') {
        setPasswordConfirmationFieldType('text');
      } else {
        setPasswordConfirmationFieldType('password');
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register a new account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            options: {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              username: values.username,
              password: values.password,
            },
          });

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else if (response.data?.register.user) {
            navigate('/dashboard');
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField name="first_name" placeholder="Enter a first name" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <InputField name="last_name" placeholder="Enter a last name" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <InputField
                  name="email"
                  placeholder="Enter a first email address"
                  fieldErrors={errors}
                  type="email"
                />
              </div>

              <div className="form-row">
                <InputField
                  name="phone_number"
                  placeholder="Enter a phone number"
                  fieldErrors={errors}
                  type="tel"
                  onChange={(e) => formatPhoneNumber(e)}
                />
              </div>

              <div className="form-row">
                <InputField name="username" placeholder="Enter a username" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={passwordFieldType}
                  />
                  <TogglePassword errors={errors} onSendValue={() => handleToggleData('password')} />
                </div>
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password_confirmation"
                    placeholder="Enter password confirmation"
                    fieldErrors={errors}
                    type={passwordConfirmationFieldType}
                  />
                  <TogglePassword
                    errors={errors}
                    onSendValue={() => handleToggleData('password_confirmation')}
                  />
                </div>
              </div>

              <div className="form-row">
                <button type="submit" className="button">
                  Register
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
