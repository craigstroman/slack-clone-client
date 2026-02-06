import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputFieldProps } from '../../shared/Interfaces';
import './InputField.scss';

export const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  fieldErrors,
  type,
  textArea,
  value,
  showLabels,
  onChange,
}) => {
  const inputFieldName: string = name;

  if (textArea && onChange) {
    return (
      <div className="input-container">
        {showLabels && <label htmlFor={name}>{placeholder}</label>}
        <Field
          name={name}
          placeholder={placeholder}
          id={name}
          className={fieldErrors[inputFieldName] ? 'textarea error' : 'textarea'}
          as="textarea"
          value={value}
          onChange={onChange}
        />
        <div className="error">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  }

  if (textArea) {
    return (
      <div className="input-container">
        {showLabels && <label htmlFor={name}>{placeholder}</label>}
        <Field
          name={name}
          placeholder={placeholder}
          id={name}
          className={fieldErrors[inputFieldName] ? 'textarea error' : 'textarea'}
          as="textarea"
          value={value}
        />
        <div className="error">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  }

  if (onChange) {
    return (
      <div className="input-container">
        {showLabels && <label htmlFor={name}>{placeholder}</label>}
        <Field
          type={type?.length ? type : 'text'}
          name={name}
          placeholder={placeholder}
          id={name}
          className={fieldErrors[inputFieldName] ? 'input error' : 'input'}
          value={value}
          onChange={onChange}
        />
        <div className="error">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  }

  return (
    <div className="input-container">
      {showLabels && <label htmlFor={name}>{placeholder}</label>}
      <Field
        type={type?.length ? type : 'text'}
        name={name}
        placeholder={placeholder}
        id={name}
        className={fieldErrors[inputFieldName] ? 'input error' : 'input'}
        value={value}
      />
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};
